import { useState, useCallback, useEffect, useMemo } from 'react';
import { View, Pressable, Text, ScrollView, useWindowDimensions, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from '@d11/react-native-fast-image';
import AppHoc from '../../components/AppHoc';
import BottomTab from '../../components/BottomTab';
import { styles } from './style';
import { catFetch, catCancel, categorylist } from '../../store/category/categorySlice';
import Loader from '../../components/Loader';
import PlaceholderImage from '../../components/ProductCard/PlaceholderImage';

function Category() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const catlist = useSelector(categorylist);
    const catLoading = useSelector((state) => state.category.catLoading);
    const [activetab, setActivetab] = useState(0);
    const imgsize = { width: width / 4 - 30, height: width / 4 - 30 };

    useFocusEffect(
        useCallback(() => {
            if (catlist.length === 0) {
                dispatch(catFetch());
            }
            return () => {
                dispatch(catCancel());
            };
        }, [catlist, dispatch])
    );

    useEffect(() => {
        if (catlist.length !== 0) {
            const firstIndex = catlist.findIndex(item => item.sub_cat && item.sub_cat.length > 0);
            setActivetab(catlist[firstIndex]?.cat_id);
        }
    }, [catlist]);

    const renderSubItem = (item) => (
        <Pressable
            onPress={() => handlenavigate(item.cat_name, item.cat_id)}
            key={item.cat_id}
            style={styles.subcatbtn}
        >
            <View style={styles.imgcontainer}>
                <FastImage source={{ uri: item.cat_img }} resizeMode="cover" style={[styles.catimg, imgsize]} />
                <PlaceholderImage width={width / 12} height={width / 12} />
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.subcatxt}>{item.cat_name}</Text>
        </Pressable>
    );

    const subcategories = useCallback((subcat) => {
        return (
            <View style={styles.subcatwrapper}>
                {subcat.map(item => renderSubItem(item))}
            </View>
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tabcontent = useMemo(() => {
        const data = catlist.find(item => item.cat_id === activetab);
        return (
            <View style={styles.subcatwrapper}>
            {data?.sub_cat.map((item) => (
                item?.sub_cat?.length > 0 ? (
                    <View key={item.cat_id} style={styles.leveltwowrapper}>
                        <Text style={styles.subcatmaintxt}>{item.cat_name}</Text>
                        {subcategories(item?.sub_cat)}
                    </View>
                ) : (
                    renderSubItem(item)
                )
            ))}
            </View>
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activetab, catlist]);

    function handlenavigate(catname, catid) {
        navigation.push('ProductList', { title: catname, id: catid });
    }

    function handlePress(subcat, catid, catname) {
        if (subcat.length > 0) {
            setActivetab(catid);
        } else {
            handlenavigate(catname, catid);
        }
    }

    return (
        <>
        {catLoading ?
            <Loader />
        : (
            <View style={styles.categorycontainer}>
                <FlatList
                    data={catlist}
                    keyExtractor={(item) => item.cat_id.toString()}
                    renderItem={({ item }) => {
                        const isActive = item.cat_id === activetab;
                        return (
                            <Pressable
                                onPress={() => handlePress(item?.sub_cat, item.cat_id, item.cat_name)}
                                // eslint-disable-next-line react-native/no-inline-styles
                                style={[styles.maincatbtn, isActive && { backgroundColor: '#fff' }]}
                            >
                                {isActive && <View style={styles.activeline} />}
                                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.maincatbtntxt}>{item.cat_name}</Text>
                            </Pressable>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    style={styles.maincategory}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.subcategory}
                    contentContainerStyle={styles.subcatcont}
                    bounces={false}
                >
                    {tabcontent}
                </ScrollView>
            </View>
        )}
        <BottomTab page="Category" />
        </>
    );
}

export default AppHoc(Category);
