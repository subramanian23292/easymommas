import { useCallback, useState, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import Config from "react-native-config";
import AppHoc from '../../../components/AppHoc';
import CheckoutStepper from '../../../components/CheckoutStepper';
import { styles } from '../style';
import CartData from '../CartData';
import { cancelCoupon, couponCheck } from '../../../store/checkout/checkoutSlice';
import CouponLoader from '../../../components/Loader/CouponLoader';
import { createorderApi, capturepaymentApi } from '../../../components/api';
import Loader from '../../../components/Loader';
import FailModal from './FailModal';

const Payment = () => {
    const failmodalRef = useRef();
    const [payloading, setPayloading] = useState(false);
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const cusId = useSelector(state => state.auth.cusId);
    const discountamount = useSelector(state => state.checkout.discountamount);
    const couponcode = useSelector(state => state.checkout.couponcode);
    const cartTotal = useSelector(state => state.checkout.cartTotal);
    const deliveryAddress = useSelector(state => state.checkout.deliveryAddress);
    const billingAddress = useSelector(state => state.checkout.billingAddress);
    const deliverymethod = useSelector(state => state.checkout.selectedDelivery);

    useFocusEffect(
        useCallback(() => {
            if (couponcode !== '') {
                dispatch(couponCheck({ action: 'applycoupon', cus_id: cusId, couponcode }));
            }
            return () => {
                dispatch(cancelCoupon());
            };
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [cusId, dispatch])
    );

    useFocusEffect(
        useCallback(() => {
            if (route.params?.paymentStatus) {
                failmodalRef.current.openmodal();
            }
        }, [route.params?.paymentStatus])
    );

    async function handlePayment() {
        setPayloading(true);
        const payload = {
            amount: cartTotal.total.toFixed(2),
            subtotal: cartTotal.subtotal.toFixed(2),
            shippingAmount: cartTotal.shipping.toFixed(2),
            cus_id: cusId,
            bill: billingAddress,
            del: deliveryAddress,
            discountCode: couponcode,
            discountAmount: discountamount,
            delivery_method: deliverymethod,
        };
        try {
            const response = await createorderApi(payload);
            if (response.status === 200) {
                initPayment(response.data);
            }            
        } catch(e) {
            setPayloading(false);
        }
    }

    async function initPayment(orderData) {
        var options = {
            //key: Config.RAZORPAY_KEY_ID,
            key: 'rzp_test_U3guBig0JKpbFn',
            name: 'Easymommas',
            description: 'Order',
            order_id: orderData.razorpay_order_id,
            amount: cartTotal.total.toFixed(2) * 100,            
            prefill: {
                name: `${deliveryAddress.fname} ${deliveryAddress.lname}`,
                email: orderData.email,
                contact: `+91${deliveryAddress.contactno}`,
            },
            theme: {color: '#86415f'}
        };        
        RazorpayCheckout.open(options).then((data) => {
            handlePaymentSuccess(data, orderData.order_id);
        }).catch((error) => {
            setPayloading(false);
            failmodalRef.current.openmodal();
        });
    }

    async function handlePaymentSuccess(paymentData, order_id) {
        try {
            const payload = { ...paymentData, order_id, cus_id: cusId };
            const response = await capturepaymentApi(payload);
            if (response.status === 200 && response.data?.status) {
                setPayloading(false);
                navigation.navigate('Success', { id: response.data?.order_no });
            }            
        } catch(e) {
            setPayloading(false);
        }
    }

    return (
        <>
        <CartData />
        <View style={[styles.footercontainer, {bottom: insets.bottom}]}>
            <Pressable style={styles.paypalbtn} onPress={handlePayment}>
                <Text style={styles.paypalbtntext}>Pay now with</Text>
                <Text style={[styles.paypalbtntext, styles.razorpaybtntext]}>Razorpay</Text>
            </Pressable>
        </View>
        <CouponLoader />
        <FailModal ref={failmodalRef} />
        {payloading && <Loader bgcolor="rgba(255, 255, 255, 0.5)"/>}
        </>
    );
};

export default AppHoc(CheckoutStepper(Payment));
