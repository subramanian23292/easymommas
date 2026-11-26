import { memo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import { useSelector, useDispatch } from 'react-redux';
import { AppIcon } from '../../../img/AppIcon';
import { styles } from './style';
import { deleteCart } from '../../../store/cart/cartSlice';

function Product({ data, openqtymodal }) {
    const dispatch = useDispatch();
    const cusId = useSelector(state => state.auth.cusId);
    const navigation = useNavigation();
    const prodtotal = data.sp * data.qty;
    const finalprodtotal = parseFloat(prodtotal.toFixed(2));

    function navigateproduct() {
        navigation.push('Product', { id: data.prod_id, title: data.prod_name });
    }

    const openmodal = () => {
        openqtymodal({ cart_id: data.cart_id, qty: data.qty });
    };

    const handleDelete = () => {
        const payload = {
            action: 'delete',
            cus_id: cusId,
            cart_id: data.cart_id,
        };
        dispatch(deleteCart(payload));
    };

    return (
        <View style={styles.prodcontainer}>
            <View style={styles.imgcontainer}>
                <FastImage source={{ uri: data.img }} resizeMode="contain" style={styles.fastimg} />
            </View>
            <View style={styles.detailcontainer}>
                <View style={styles.infocontainer}>
                    <View style={styles.namecontainer}>
                        <Pressable style={styles.prodbtn} onPress={navigateproduct}>
                            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.prodlabel}>{data.prod_name}</Text>
                        </Pressable>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.prodoptions}>{data.combo_name}</Text>
                    </View>
                    <View style={styles.removeconatiner}>
                        <Pressable style={styles.removebutton} onPress={handleDelete}>
                            <AppIcon.Close width={12} height={12} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.pricecontainer}>
                    <View style={styles.priceouter}>
                        <Text style={styles.prodprice}>{`₹${finalprodtotal}`}</Text>
                    </View>
                    <View style={styles.qtycontainer}>
                        <Pressable style={styles.qtybtn} onPress={openmodal}>
                            <Text style={styles.qtylabel}>Qty: {data.qty}</Text>
                            <View style={styles.svgouter}>
                                <AppIcon.DownArrow width={20} height={20} />
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default memo(Product);
