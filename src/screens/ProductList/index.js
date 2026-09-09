/* eslint-disable react-native/no-inline-styles */
import { useCallback, useMemo } from 'react';
import { View, Text, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import ProductCard from '../../components/ProductCard';
import AppHoc from '../../components/AppHoc';
import { styles } from './style';
import FilterSort from './FilterSort';
import Loader from '../../components/Loader';
import { selectProductsById, listFetch, listCancel, listLoadmore } from '../../store/productlist/productlistSlice';
import { filterlist } from '../../store/filter/filterSlice';
import { cancelCart } from '../../store/cart/cartSlice';
import Theme from '../../components/Theme';
import CartLoader from '../../components/Loader/CartLoader';

function ProductList() {
    const route = useRoute();
    const catId = route.params.id;
    const { width } = useWindowDimensions();
    const dispatch = useDispatch();
    const listLoading = useSelector((state) => state.productlist.listLoading);
    const prodata = useSelector(selectProductsById(catId));
    const filterdata = useSelector(filterlist(catId));
    const cardsize = (width / 2) + 120;

    useFocusEffect(
        useCallback(() => {
            if (prodata === undefined) {
                const payload = {
                    category_id: catId,
                    page: 1,
                    sort: filterdata?.sort ?? '',
                    filters: filterdata?.filtertab ?? [],
                    min: filterdata?.pricerange?.defaultmin ?? '',
                    max: filterdata?.pricerange?.defaultmax ?? '',
                };
                dispatch(listFetch(payload));
            }
            return () => {
                dispatch(listCancel());
                dispatch(cancelCart());
            };
        }, [prodata, dispatch, catId, filterdata])
    );

    const renderproduct = useCallback(({item, index}) => {
        const isLeftItem = (index % 2) === 0;

        return (
            <View style={{ marginLeft: isLeftItem ? 0 : 5 }}>
                <ProductCard data={item} />
            </View>
        );
    }, []);

    const loadmore = useCallback(() => {
        if (prodata?.loadmore) {
            const payload = {
                category_id: catId,
                page: prodata.page,
                sort: filterdata?.sort ?? '',
                filters: filterdata?.filtertab ?? [],
                min: filterdata?.pricerange?.defaultmin ?? '',
                max: filterdata?.pricerange?.defaultmax ?? '',
            };
            dispatch(listLoadmore(payload));
        }
    }, [dispatch, prodata, catId, filterdata]);

    const rowseparator = () => <View style={styles.itemseparator} />;

    const renderfooter = useMemo(() => {
        return prodata?.loadmore ? (
            <View style={styles.loaderContainer}>
                <Text style={styles.loadertext}>Hang on, loading more...</Text>
                <ActivityIndicator size="large" color={Theme.colors.secondary} />
            </View>
        ) : null;
    }, [prodata?.loadmore]);

    return (
        <>
        <View style={styles.pagecontainer}>
            {listLoading ?
                <Loader bgcolor="#fff" />
            :
            Array.isArray(prodata?.productlist) && prodata.productlist.length > 0 && (
                <FlashList
                    contentContainerStyle={styles.listcontainer}
                    data={prodata?.productlist ?? []}
                    renderItem={renderproduct}
                    keyExtractor={(item) => item.prod_id.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    ItemSeparatorComponent={rowseparator}
                    ListFooterComponent={renderfooter}
                    onEndReached={loadmore}
                    onEndReachedThreshold={0.5}
                />
            )}
            {!listLoading && (prodata?.productlist === undefined || prodata.productlist.length === 0) && (
                <View style={styles.nodatafound}>
                    <Text style={styles.nodatafoundtext}>No Products found</Text>
                </View>
            )}
        </View>
        {((Array.isArray(prodata?.productlist) && prodata.productlist.length > 0) || filterdata) && (
            <FilterSort catId={catId} />
        )}
        <CartLoader />
        </>
    );
}

export default AppHoc(ProductList);
