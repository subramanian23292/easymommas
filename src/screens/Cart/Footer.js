import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './style';
import { productscart } from '../../store/cart/cartSlice';
import { fetchDeliverySuccess } from '../../store/checkout/checkoutSlice';

function Footer() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cartproducts = useSelector(productscart);
    const subtotal = cartproducts?.reduce((sum, item) => sum + (item.sp * Number(item.qty)), 0);
    const finalsubtotal = parseFloat(subtotal.toFixed(2));

    const handleNavigate = () => {
        dispatch(fetchDeliverySuccess([]));
        navigation.navigate('CheckoutAddress');
    };

    return (
        <View style={[styles.footercontainer, {bottom: insets.bottom}]}>
            <View style={styles.totalcontainer}>
                <Text style={styles.totalheading}>Sub Total</Text>
                <Text style={styles.totalvalue}>{`₹${finalsubtotal}`}</Text>
            </View>
            <View style={styles.buttoncontainer}>
                <Pressable style={styles.proceedbtn} onPress={handleNavigate}>
                    <Text style={styles.proceedlabel}>Checkout</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Footer;
