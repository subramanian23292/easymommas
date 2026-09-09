import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { productscart } from '../../store/cart/cartSlice';
import { chosenDelivery, setCartTotal } from '../../store/checkout/checkoutSlice';
import { styles } from './style';
import Coupon from './Payment/Coupon';

const CartTotal = () => {
    const dispatch = useDispatch();
    const cartproducts = useSelector(productscart);
    const selectedDelivery = useSelector(state => state.checkout.selectedDelivery);
    const shippingCharge = useSelector(chosenDelivery(selectedDelivery));
    const { couponcode, discountamount } = useSelector(state => state.checkout);
    const subtotal = cartproducts?.reduce((sum, item) => sum + (item.sp * Number(item.qty)), 0);
    const finalsubtotal = parseFloat(subtotal.toFixed(2));
    const total = (subtotal - discountamount) + shippingCharge.amount;
    const finaltotal = parseFloat(total.toFixed(2));

    useEffect(() => {
        dispatch(setCartTotal({ total: finaltotal, subtotal: finalsubtotal, shipping: shippingCharge.amount }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, total]);

    return (
        <View style={styles.totalContainer}>
            <Coupon />
            <View style={styles.totalItem}>
                <Text style={styles.totaltext}>Subtotal</Text>
                <Text style={styles.totaltext}>{`€${finalsubtotal}`}</Text>
            </View>
            {couponcode !== '' &&
            <View style={styles.totalItem}>
                <Text style={styles.totaltext}>Discount {`(${couponcode})`}</Text>
                <Text style={styles.totaltext}>{`- €${discountamount}`}</Text>
            </View>}
            <View style={styles.totalItem}>
                <Text style={styles.totaltext}>Shipping</Text>
                <Text style={styles.totaltext}>{`€${shippingCharge.amount}`}</Text>
            </View>
            <View style={styles.totalItem}>
                <Text style={styles.totaltext}>Total</Text>
                <Text style={styles.totaltext}>{`€${finaltotal}`}</Text>
            </View>
        </View>
    );
};

export default CartTotal;
