import { memo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { styles } from '../style';

const DeliveryAddress = () => {
    const deladdr = useSelector((state) => state.checkout.deliveryAddress);
    const navigation = useNavigation();

    const selctdelAddr = () => {
        navigation.navigate('DeliveryAddress');
    };

    return (
        <View style={styles.addressinfo}>
            <Text style={[styles.addressinfoname, styles.addrtitle]}>Delivery Address</Text>
            <Text style={styles.addressinfoname}>{deladdr.fname} {deladdr.lname}{','} {deladdr.contactno}</Text>
            <Text style={styles.addressinfovalue}>{deladdr.addrone}{','} {deladdr.addrtwo && deladdr.addrtwo}</Text>
            <Text style={styles.addressinfovalue}>{deladdr.city} {'-'} {deladdr.postcode}{','} {deladdr.state}{','} {deladdr.country}</Text>
            <Pressable style={styles.changebtn} onPress={selctdelAddr}>
                <Text style={styles.changetext}>Change</Text>
            </Pressable>
        </View>
    );
};

export default memo(DeliveryAddress);
