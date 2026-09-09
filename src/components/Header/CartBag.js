import { memo } from 'react';
import { Text, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AppIcon } from '../../img/AppIcon';
import { styles } from './style';
import { productscart } from '../../store/cart/cartSlice';

function CartBag() {
    const navigation = useNavigation();
    const cartproduct = useSelector(productscart);
    const homeLoading = useSelector((state) => state.home.homeLoading);

    function handlecart() {
        navigation.navigate('Cart');
    }

    return (
        !homeLoading && (
            <Pressable style={styles.cartbtn} onPress={handlecart}>
                <AppIcon.Bag width={20} height={20} />
                {cartproduct.length > 0 &&
                <View style={styles.countcontainer}>
                    <Text style={styles.cartcount}>{cartproduct.length}</Text>
                </View>}
            </Pressable>
        )
    );
}

export default memo(CartBag);
