import { useCallback, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AppHoc from '../../../components/AppHoc';
import CheckoutStepper from '../../../components/CheckoutStepper';
import { styles } from '../style';
import { fetchDeliveryMethod, cancelDelivery, listdelivery, setDefDelivery } from '../../../store/checkout/checkoutSlice';
import Loader from '../../../components/Loader';

const DeliveryMethod = () => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const cusId = useSelector(state => state.auth.cusId);
    const deliveryLoading = useSelector(state => state.checkout.deliveryLoading);
    const selectedDelivery = useSelector(state => state.checkout.selectedDelivery);
    const deliveryMethod = useSelector(listdelivery);
    const [seldelivery, setSeldelivery] = useState(selectedDelivery || 'standard');

    useFocusEffect(
        useCallback(() => {
            if (deliveryMethod.length === 0) {
                dispatch(fetchDeliveryMethod({ cus_id: cusId }));
            }
            return () => {
                dispatch(cancelDelivery());
            };
        }, [cusId, deliveryMethod.length, dispatch])
    );

    const navigatepayment = () => {
        dispatch(setDefDelivery(seldelivery));
        navigation.navigate('Payment');
    };

    return (
        <>
        {deliveryLoading ?
            <Loader />
        :
        deliveryMethod.length > 0 && (
            <>
            <ScrollView style={styles.scrollContainer}>
                {deliveryMethod.map(item => (
                    <Pressable key={item.id} onPress={() => setSeldelivery(item.id)} style={[styles.deliverybtn, item.id === seldelivery ? styles.activedelbtn : styles.inactivedelbtn]}>
                        <View style={styles.deliverinner}>
                            <View style={[styles.radiouter, item.id === seldelivery ? styles.radiouteractive : styles.radiouterinactive]}>
                                {item.id === seldelivery && <View style={styles.radioinner} />}
                            </View>
                            <Text style={styles.deltext}>{item.method}</Text>
                        </View>
                        <Text style={styles.deltext}>{`€${item.amount}`}</Text>
                    </Pressable>
                ))}
            </ScrollView>
            <View style={[styles.footercontainer, {bottom: insets.bottom}]}>
                <Pressable style={styles.proceedbtn} onPress={navigatepayment}>
                    <Text style={styles.proceedlabel}>Continue</Text>
                </Pressable>
            </View>
            </>
        )}
        </>
    );
};

export default AppHoc(CheckoutStepper(DeliveryMethod));
