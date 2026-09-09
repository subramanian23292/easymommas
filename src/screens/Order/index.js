import { useCallback } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Items from './Items';
import OrderTotal from './OrderTotal';
import Status from './Status';
import { styles } from './style';
import AppHoc from '../../components/AppHoc';
import { selectOrderById, orderFetch, orderCancel } from '../../store/order/orderSlice';
import Loader from '../../components/Loader';
import AddressCard from './AddressCard';

function Order() {
    const route = useRoute();
    const orderId = route.params.id;
    const dispatch = useDispatch();
    const cusId = useSelector((state)=> state.auth.cusId);
    const orderdata = useSelector(selectOrderById(orderId));
    const ordLoading = useSelector(state => state.order.ordLoading);

    useFocusEffect(
        useCallback(() => {
            if (!orderdata) {
                dispatch(orderFetch({ cus_id: cusId, order_id: orderId }));
            }
            return () => {
                dispatch(orderCancel());
            };
        }, [dispatch, orderdata, orderId, cusId])
    );

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.pagecontainer}
        >
            {orderdata && (
            <>
            <View style={styles.infocontainer}>
                <Text style={styles.infoheading}><Text style={styles.addressheading}>Order:</Text> {'#'}{orderdata.order_no}</Text>
                <Text style={styles.infoheading}><Text style={styles.addressheading}>Date:</Text> {orderdata.date_added}</Text>
            </View>
            <Status orderstate={orderdata.orderstatus} />
            <AddressCard title="Delivery" address={orderdata.deladdrs} />
            <AddressCard title="Billing" address={orderdata.billaddrs} />
            <Items prod={orderdata.products} ordstatus={orderdata.current_status} orderId={orderId} />
            <OrderTotal amount={orderdata.ordertotal} />
            </>)}
            {ordLoading && <Loader bgcolor="#fff" />}
        </ScrollView>
    );
}

export default AppHoc(Order);
