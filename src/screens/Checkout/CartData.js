import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSelector } from 'react-redux';
import { productscart } from '../../store/cart/cartSlice';
import CartTotal from './CartTotal';
import Product from './Product';
import { styles } from './style';

const CartData = () => {
    const cartproducts = useSelector(productscart);

    function renderproduct({ item }) {
        return <Product data={item} />;
    }

    function rowseparator() {
        return <View style={styles.rowseparator} />;
    }

    return (
        cartproducts.length > 0 && (
            <FlashList
                contentContainerStyle={styles.scrollContainer}
                data={cartproducts}
                renderItem={renderproduct}
                keyExtractor={(item) => item.cart_id.toString()}
                showsVerticalScrollIndicator={false}
                bounces={false}
                ItemSeparatorComponent={rowseparator}
                ListFooterComponent={CartTotal}
                keyboardShouldPersistTaps="always"
            />
        )
    );
};

export default CartData;
