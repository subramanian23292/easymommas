/* eslint-disable react-native/no-inline-styles */
import { Text, Pressable, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from '@d11/react-native-fast-image';
import { styles } from './style';
import { AppIcon } from '../../img/AppIcon';
import Theme from '../Theme';
import { signinAlertFn } from '../../store/component/componentSlice';
import { addtoCart } from '../../store/cart/cartSlice';
import PlaceholderImage from './PlaceholderImage';

function ProductCard({ data }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const cardWidth = (width / 2) - 15;
    const imgwidth = (width / 2);
    const cusId = useSelector((state)=> state.auth.cusId);

    function navigateproduct() {
        navigation.push('Product', { id: data.prod_id, title: data.prod_name });
    }

    const isOutOfStock = data.stock === 0;
    const hasMRP = data.mrp !== 0;

    const cartAdd = () => {
        if (cusId === null) {
            dispatch(signinAlertFn(true));
        } else {
            const payload = {
                action: 'addtocart',
                cus_id: cusId,
                prod_id: data.prod_id,
                prod_type: data.prod_type,
                combo_id: data.combo_id,
                prod_name: data.prod_name,
                img: data.img,
                sp: data.sp,
                combo_name: data.combo_name,
            };
            dispatch(addtoCart(payload));
        }
    };

    return (
        <Pressable underlayColor="transparent" onPress={navigateproduct} style={[styles.prodcontainer, {width: cardWidth}]}>
            <View>
                <View style={styles.imgcontainer}>
                    <FastImage source={{ uri: data.img }} resizeMode="cover" style={[styles.prodimg, {height: imgwidth}]} />
                    <PlaceholderImage width={width / 10} height={width / 10} />
                </View>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.prodlabel}>{data.prod_name}</Text>
            </View>
            <View style={styles.infocontainer}>
                <View style={styles.pricecontainer}>
                    <Text style={styles.sp}>{`€${data.sp}`}</Text>
                    {hasMRP && <Text style={styles.mrp}>{`€${data.mrp}`}</Text>}
                </View>
                <Pressable style={[styles.cartbtn, { backgroundColor: isOutOfStock ? '#a07183' : Theme.colors.secondary }]} disabled={isOutOfStock} onPress={cartAdd}>
                    <AppIcon.Cart width={16} height={16} />
                </Pressable>
            </View>
        </Pressable>
    );
}

export default ProductCard;
