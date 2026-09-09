import { useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AppHoc from '../../../components/AppHoc';
import CheckoutStepper from '../../../components/CheckoutStepper';
import { styles } from '../style';
import { listaddress, fetchAddress, cancelAddress, defaultaddress } from '../../../store/address/addressSlice';
import { setOrderaddr } from '../../../store/checkout/checkoutSlice';
import Loader from '../../../components/Loader';
import DeliveryAddress from './DeliveryAddress';
import BillingAddress from './BillingAddress';

const CheckoutAddress = () => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const fetchLoading = useSelector((state) => state.address.fetchLoading);
    const addresslist = useSelector(listaddress);
    const defAddress = useSelector(defaultaddress);
    const cusId = useSelector(state => state.auth.cusId);
    const deladdr = useSelector((state) => state.checkout.deliveryAddress);

    useFocusEffect(
        useCallback(() => {
            if (addresslist.length === 0) {
                dispatch(fetchAddress({ action: 'listaddress', cus_id: cusId }));
            }
            return () => {
                dispatch(cancelAddress());
            };
        }, [addresslist.length, cusId, dispatch])
    );

    useEffect(() => {
        if (addresslist.length !== 0 && Object.keys(deladdr).length === 0) {
            dispatch(setOrderaddr(defAddress));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addresslist.length, deladdr]);

    function addaddress() {
        navigation.navigate('Address', { page: 'Checkout' });
    }

    return (
        <>
        {fetchLoading ?
            <Loader />
        :
        Object.keys(deladdr).length > 0 ? (
            <>
            <ScrollView style={styles.scrollContainer}>
                <DeliveryAddress />
                <BillingAddress />
            </ScrollView>
            <View style={[styles.footercontainer, {bottom: insets.bottom}]}>
                <Pressable style={styles.proceedbtn} onPress={() => navigation.navigate('DeliveryMethod') }>
                    <Text style={styles.proceedlabel}>Continue</Text>
                </Pressable>
            </View>
            </>
        ) : (
            <View style={styles.addressbtnouter}>
                <Pressable style={styles.proceedbtn} onPress={addaddress}>
                    <Text style={styles.proceedlabel}>Add Address</Text>
                </Pressable>
            </View>
        )}
        </>
    );
};

export default AppHoc(CheckoutStepper(CheckoutAddress));
