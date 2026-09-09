import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { View, ScrollView, Text, Pressable, useWindowDimensions } from 'react-native';
import { useFocusEffect, useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import ApplyButton from './ApplyButton';
import AppHoc from '../../components/AppHoc';
import { AppIcon } from '../../img/AppIcon';
import { styles } from './style';
import RangeSlider from './RangeSlider';
import { filterlist, filFetch, filCancel, filSuccess, clearfilter } from '../../store/filter/filterSlice';
import { listEmpty } from '../../store/productlist/productlistSlice';
import Loader from '../../components/Loader';

function omit(obj, keysToRemove) {
    const result = { ...obj };
    keysToRemove.forEach(key => delete result[key]);
    return result;
}

function deepEqual(obj1, obj2) {
    if (obj1 === obj2) { return true; }

    if (typeof obj1 !== 'object' || obj1 === null ||
        typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) { return false; }

    for (const key of keys1) {
        if (!obj2.hasOwnProperty(key)) { return false; }
        if (!deepEqual(obj1[key], obj2[key])) { return false; }
    }

    return true;
}

function filterReducer(state, action) {
    switch (action.type) {
        case 'SET_ALL':
            return {
                ...state,
                filtertab: action.payload.filtertab,
                activetab: action.payload.activetab,
                minValue: action.payload.minValue,
                maxValue: action.payload.maxValue,
            };
        case 'SET_FILTERTAB':
            const { tabId, valueId } = action.payload;
            const updatedFiltertab = state.filtertab.map(tab => {
                if (tab.id !== tabId) { return tab; }
                const updatedValues = tab.filter_values.map(val =>
                    val.id === valueId ? { ...val, checked: !val.checked } : val
                );
                return { ...tab, filter_values: updatedValues };
            });
            return { ...state, filtertab: updatedFiltertab };
        case 'SET_ACTIVETAB':
            return { ...state, activetab: action.payload };
        case 'SET_MINMAX':
            return { ...state, minValue: action.payload.min, maxValue: action.payload.max };
        default:
            return state;
    }
}

function Filter() {
    const navigation = useNavigation();
    const route = useRoute();
    const catId = route.params.id;
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const filterLoading = useSelector((state) => state.filter.filLoading);
    const filterdata = useSelector(filterlist(catId));
    const [filterState, filterDispatch] = useReducer(filterReducer, {
        filtertab: [],
        activetab: '',
        minValue: 0,
        maxValue: 0,
    });
    const { filtertab, activetab, minValue, maxValue } = filterState;
    const swidth = (width / 2) + 20;

    useFocusEffect(
        useCallback(() => {
            if (!filterdata?.filtertab) {
                dispatch(filFetch({ category_id: catId }));
            }
            return () => {
                dispatch(filCancel());
            };
        }, [filterdata, dispatch, catId])
    );

    useEffect(() => {
        if (filterdata?.filtertab) {
            const nextState = {};
            if (Array.isArray(filterdata?.filtertab) && filterdata?.filtertab?.length > 0) {
                nextState.filtertab = filterdata?.filtertab;
                nextState.activetab = filterdata.filtertab[0]?.id ?? '';
            } else {
                nextState.filtertab = [];
                nextState.activetab = 'pricerange';
            }
            nextState.minValue = filterdata?.pricerange?.defaultmin || 0;
            nextState.maxValue = filterdata?.pricerange?.defaultmax || 0;
            filterDispatch({ type: 'SET_ALL', payload: nextState });
        }
    }, [filterdata]);

    const toggleFilterValue = (tabId, valueId) => {
        filterDispatch({ type: 'SET_FILTERTAB', payload: { tabId, valueId } });
    };

    const activeFilterData = useMemo(() => {
        return filtertab.find(item => item.id === activetab);
    }, [filtertab, activetab]);

    const handleValueChange = useCallback((range) => {
        filterDispatch({ type: 'SET_MINMAX', payload: { min: range.min, max: range.max } });
    }, []);

    const tabcontent = () => {
        if (activetab === 'pricerange') {
            const pr = filterdata?.pricerange || {};
            return (
                <RangeSlider
                    sliderWidth={swidth}
                    min={pr.minprice || 0}
                    max={pr.maxprice || 0}
                    defaultmin={pr.defaultmin || 0}
                    defaultmax={pr.defaultmax || 0}
                    step={1}
                    onValueChange={handleValueChange}
                />
            );
        }

        return (
            <View style={styles.filtervaluecontainer}>
                {activeFilterData?.filter_values.map(item => (
                <Pressable key={item.id} style={styles.checkbtn} onPress={() => toggleFilterValue(activeFilterData.id, item.id)}>
                    <View style={[styles.checkicon, item.checked ? styles.checktrue : styles.checkfalse]}>
                        {item.checked && <AppIcon.Check width={14} height={14} />}
                    </View>
                    <Text style={styles.checkbtnlabel}>{item.fil_val_name}</Text>
                </Pressable>
                ))}
            </View>
        );
    };

    const applyfilters = useCallback(() => {
        const pr = filterdata?.pricerange || {};
        const pricerange = {
            minprice: pr.minprice,
            maxprice: pr.maxprice,
            defaultmin: minValue,
            defaultmax: maxValue,
        };
        const payload = {
            cat_id: catId,
            filtertab,
            pricerange,
        };
        const filterWithoutSort = omit(filterdata, ['sort']);
        if (!deepEqual(filterWithoutSort, payload)) {
            dispatch(filSuccess(payload));
            dispatch(listEmpty({ cat_id: catId }));
        }
        navigation.goBack();
    }, [catId, dispatch, filterdata, filtertab, maxValue, minValue, navigation]);

    const clearfilters = useCallback(() => {
        if (filterdata?.filtertab) {
            const updatedFilters = filtertab.map(filter => ({
                ...filter,
                filter_values: filter.filter_values.map(value => ({
                    ...value,
                    checked: false,
                })),
            }));
            const pr = filterdata?.pricerange || {};
            const pricerange = {
                minprice: pr.minprice,
                maxprice: pr.maxprice,
                defaultmin: pr.minprice,
                defaultmax: pr.maxprice,
            };
            const payload = {
                cat_id: catId,
                filtertab: updatedFilters,
                pricerange,
            };
            dispatch(clearfilter(payload));
            dispatch(listEmpty({ cat_id: catId }));
            navigation.goBack();
        }
    }, [catId, dispatch, filterdata, filtertab, navigation]);

    const updateActiveTab = (tab) => {
        filterDispatch({ type: 'SET_ACTIVETAB', payload: tab });
    };

    return (
        <>
        <Header clearfilters={clearfilters} />
        {filterLoading && !filterdata?.filtertab ?
            <Loader />
        : (
            <>
            <View style={styles.filtercontainer}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.filtercategory} bounces={false}>
                    {filtertab.map((item) => (
                        <Pressable key={item.id} style={[styles.filtercatbtn, item.id === activetab && styles.activebg]} onPress={() => updateActiveTab(item.id)}>
                            {item.id === activetab && <View  style={styles.activeline} />}
                            <Text style={styles.filtercatbtnlabel}>{item.filter_name}</Text>
                        </Pressable>
                    ))}
                    <Pressable style={[styles.filtercatbtn, activetab === 'pricerange' && styles.activebg]} onPress={()=> updateActiveTab('pricerange')}>
                        {activetab === 'pricerange' && <View style={styles.activeline} />}
                        <Text style={styles.filtercatbtnlabel}>Price</Text>
                    </Pressable>
                </ScrollView>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.filtervalues} bounces={false}>
                    {tabcontent()}
                </ScrollView>
            </View>
            <ApplyButton applyfilters={applyfilters} />
            </>
        )}
        </>
    );
}

export default AppHoc(Filter);
