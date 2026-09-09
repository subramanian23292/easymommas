import { memo } from 'react';
import { Pressable, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { AppIcon } from '../../../img/AppIcon';
import { setDeliveryaddr } from '../../../store/checkout/checkoutSlice';

function AddressCard({ data }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const currentDelAddr = useSelector(state => state.checkout.deliveryAddress);

    const setDelAddr = () => {
       dispatch(setDeliveryaddr(data));
       navigation.goBack();
    };

    const navigateAddress = () => {
        navigation.push('Address', { id: data?.id, updatedeladdr: currentDelAddr?.id === data?.id });
    };

    return (
        <View style={styles.cardcontainer}>
            <View style={styles.addressinfo}>
                <Text style={[styles.addressinfoname, styles.addrbold]}>{data.fname} {data.lname}</Text>
                <Text style={styles.addressinfovalue}>{data.addrone}</Text>
                {data.addrtwo && <Text style={styles.addressinfovalue}>{data.addrtwo}</Text>}
                <Text style={styles.addressinfovalue}>{data.city} {'-'} {data.postcode}</Text>
                <Text style={styles.addressinfovalue}>{data.state}{','} {data.country}</Text>
                <Text style={styles.addressinfovalue}>{data.contactno}</Text>
            </View>
            <View style={styles.optioncontainer}>
                <Pressable style={styles.defaultbtn} onPress={setDelAddr}>
                    <View style={[styles.radiouter, currentDelAddr?.id === data?.id ? styles.radiouteractive : styles.radiouterinactive]}>
                        {currentDelAddr?.id === data?.id && <View style={styles.radioinner} />}
                    </View>
                    {currentDelAddr?.id === data?.id &&
                        <Text style={styles.defaultbtnlabel}>Deliver Here</Text>
                    }
                </Pressable>
                <View style={styles.actionouter}>
                    <Pressable style={styles.editbutton} onPress={navigateAddress}>
                        <AppIcon.Edit width={12} height={12} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default memo(AddressCard);
