import { memo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { AppIcon } from '../../../img/AppIcon';
import { styles } from './style';
import Loader from '../../../components/Loader';

function CartButton({ stock, cartAdd }) {
    const insets = useSafeAreaInsets();
    const cartLoading = useSelector((state) => state.cart.cartLoading);

    return (
        <>
        <View style={[styles.buttoncontainer, {bottom: insets.bottom}]}>
            <View style={styles.cartcontainer}>
                {stock > 0 ?
                <Pressable style={styles.cartbtn} onPress={cartAdd}>
                    <AppIcon.Cart width={20} height={20} />
                    <Text style={styles.cartbtnlabel}>Add to cart</Text>
                </Pressable>
                :
                <View style={styles.outofstockouter}>
                    <Text style={styles.stocktext}>{stock === undefined ? 'Not Available' : 'Out of Stock'}</Text>
                </View>
                }
            </View>
        </View>
        {cartLoading && <Loader bgcolor={'rgba(255, 255, 255, 0.5)'} />}
        </>
    );
}

export default memo(CartButton);
