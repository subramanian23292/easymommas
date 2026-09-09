import { useState } from 'react';
import { Modal, useWindowDimensions, Text, View, Pressable, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './style';
import { AppIcon } from '../../img/AppIcon';
import { updateCart } from '../../store/cart/cartSlice';

const QuantityModal = ({ ref }) => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const cusId = useSelector(state => state.auth.cusId);
    const modalheight = (150 + insets.bottom);
    const [modalVisible, setModalVisible] = useState(false);
    const [count, setCount] = useState(0);
    const [cartdata, setCartdata] = useState({});

    ref.current = {
        openmodal,
    };

    function openmodal(data) {
        setModalVisible(true);
        setCount(data.qty);
        setCartdata(data);
    }

    function hidemodal() {
        setModalVisible(false);
    }

    const increment = () => setCount(prev => prev + 1);
    const decrement = () => {
        setCount(prev => (prev > 1 ? prev - 1 : prev));
    };

    const handleUpdate = () => {
        if (count !== cartdata.qty) {
            const payload = {
                action: 'update',
                cus_id: cusId,
                qty: count,
                cart_id: cartdata.cart_id,
            };
            dispatch(updateCart(payload));
        }
        hidemodal();
    };

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={hidemodal}
            >
                <TouchableWithoutFeedback onPress={hidemodal}>
                    <View style={styles.modalbackdrop} />
                </TouchableWithoutFeedback>
                <View pointerEvents="box-none" style={[styles.modalouter, { paddingTop: insets.top }]}>
                    <View style={[styles.modalcontent, { height: modalheight, width }]}>
                        <View style={styles.titlecontainer}>
                            <Text style={styles.heading}>Quantity</Text>
                            <Pressable style={styles.closebtn} onPress={hidemodal}>
                                <AppIcon.CloseDark width={12} height={12} />
                            </Pressable>
                        </View>
                        <View style={styles.qtyouter}>
                            <View style={styles.qtycontainer}>
                                <Pressable style={styles.qtybutton} onPress={decrement}>
                                    <AppIcon.Minus width={12} height={12} />
                                </Pressable>
                                <View style={styles.qtycountcontainer}>
                                    <Text style={styles.qtytext}>{count}</Text>
                                </View>
                                <Pressable style={styles.qtybutton} onPress={increment}>
                                    <AppIcon.Plus width={12} height={12} />
                                </Pressable>
                            </View>
                            <View style={styles.btnouter}>
                                <Pressable style={styles.loginbtn} onPress={handleUpdate}>
                                    <Text style={styles.btnlabel}>Update</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default QuantityModal;
