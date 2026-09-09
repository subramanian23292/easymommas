import { useCallback, useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import { useFocusEffect } from '@react-navigation/native';
import AppHoc from '../../components/AppHoc';
import { styles } from './style';
import OrderCard from './OrderCard';
import Loader from '../../components/Loader';
import { listorder, listFetch, listCancel, listLoadmore } from '../../store/orderlist/orderlistSlice';
import Theme from '../../components/Theme';

function OrderList() {
    const dispatch = useDispatch();
    const listLoading = useSelector((state) => state.orderlist.listLoading);
    const listMore = useSelector((state) => state.orderlist.loadmore);
    const revpage = useSelector((state) => state.orderlist.page);
    const orderlist = useSelector(listorder);
    const cusId = useSelector(state => state.auth.cusId);

    useFocusEffect(
        useCallback(() => {
            if (orderlist.length === 0) {
                dispatch(listFetch({ cus_id: cusId, page: 1 }));
            }
            return () => {
                dispatch(listCancel());
            };
        }, [orderlist.length, cusId, dispatch])
    );

    const renderorder = useCallback(({ item }) => {
        return <OrderCard data={item} />;
    }, []);

    const loadmore = useCallback(() => {
        if (listMore) {
            dispatch(listLoadmore({ cus_id: cusId, page: revpage }));
        }
    }, [dispatch, cusId, listMore, revpage]);

    const rowseparator = () => <View style={styles.itemseparator} />;

    const renderfooter = useMemo(() => {
        return listMore ? (
            <View style={styles.loaderContainer}>
                <Text style={styles.loadertext}>Hang on, loading more...</Text>
                <ActivityIndicator size="large" color={Theme.colors.secondary} />
            </View>
        ) : null;
    }, [listMore]);

    return (
        <View style={styles.pagecontainer}>
            {listLoading ?
                <Loader bgcolor="#fff" />
            :
            Array.isArray(orderlist) && orderlist.length > 0 && (
                <FlashList
                    contentContainerStyle={styles.listcontainer}
                    data={orderlist ?? []}
                    renderItem={renderorder}
                    keyExtractor={(item) => item.order_id.toString()}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    ItemSeparatorComponent={rowseparator}
                    ListFooterComponent={renderfooter}
                    onEndReached={loadmore}
                    onEndReachedThreshold={0.5}
                />
            )}
            {!listLoading && (orderlist === undefined || orderlist.length === 0) && (
                <View style={styles.nodatafound}>
                    <Text style={styles.nodatafoundtext}>No Orders found</Text>
                </View>
            )}
        </View>
    );
}

export default AppHoc(OrderList);
