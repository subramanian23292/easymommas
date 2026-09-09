import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AppIcon } from '../../../img/AppIcon';
import { styles } from '../style';
import { setBillingaddr } from '../../../store/checkout/checkoutSlice';

const BillingAddress = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const deladdr = useSelector((state) => state.checkout.deliveryAddress);
    const billingaddr = useSelector((state) => state.checkout.billingAddress);
    const [billaddr, setBilladdr] = useState(true);

    const handleBilling = () => {
        setBilladdr(!billaddr);
        dispatch(setBillingaddr(deladdr));
    };

    const navigateBilling = () => {
        navigation.navigate('BillingAddress');
    };

    return (
        <View style={styles.addressinfo}>
            <Pressable style={styles.checkbtn} onPress={handleBilling}>
                <View style={[styles.checkicon, billaddr ? styles.checktrue : styles.checkfalse]}>
                    {billaddr && <AppIcon.Check width={14} height={14} /> }
                </View>
                <Text style={styles.checkbtnlabel}>Billing address same as Delivery address</Text>
            </Pressable>
            {!billaddr &&
            <>
            <Text style={[styles.addressinfoname, styles.addrtitle]}>Billing Address</Text>
            <Text style={styles.addressinfoname}>{billingaddr.fname} {billingaddr.lname}{','} {billingaddr.contactno}</Text>
            <Text style={styles.addressinfovalue}>{billingaddr.addrone}{','} {billingaddr.addrtwo && billingaddr.addrtwo}</Text>
            <Text style={styles.addressinfovalue}>{billingaddr.city} {'-'} {billingaddr.postcode}{','} {billingaddr.state}{','} {billingaddr.country}</Text>
            <Pressable style={styles.changebtn} onPress={navigateBilling}>
                <Text style={styles.changetext}>Change</Text>
            </Pressable>
            </>}
        </View>
    );
};

export default BillingAddress;
