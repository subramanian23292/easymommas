import { useRef, useCallback } from 'react';
import { View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AppHoc from '../../components/AppHoc';
import { styles } from './style';
import Product from './Product';
import Footer from './Footer';
import { productscart } from '../../store/cart/cartSlice';
import QuantityModal from '../../components/QuantityModal';
import { cancelCart } from '../../store/cart/cartSlice';
import CartLoader from '../../components/Loader/CartLoader';

function Cart() {
    const dispatch = useDispatch();
    const cartproducts = useSelector(productscart);
    const qtymodalRef =  useRef();

    useFocusEffect(
        useCallback(() => {
            return () => {
                dispatch(cancelCart());
            };
        }, [dispatch])
    );

    const openqtymodal = useCallback((data) => {
        if (qtymodalRef.current) {
            qtymodalRef.current.openmodal(data);
        }
    }, []);

    function renderproduct({ item }) {
        return <Product data={item} openqtymodal={openqtymodal} />;
    }

    function rowseparator() {
        return <View style={styles.itemseparator} />;
    }

    return (
        cartproducts.length > 0 ? (
            <>
            <View style={styles.pagecontainer}>
                <FlashList
                    contentContainerStyle={styles.listcontainer}
                    data={cartproducts}
                    renderItem={renderproduct}
                    keyExtractor={(item) => item.cart_id.toString()}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    ItemSeparatorComponent={rowseparator}
                />
            </View>
            <Footer />
            <QuantityModal ref={qtymodalRef} />
            <CartLoader />
            </>
        ) : (
            <View style={styles.emptyouter}>
                <Text style={styles.nodatafoundtext}>Your cart is empty</Text>
            </View>
        )
    );
}

export default AppHoc(Cart);
