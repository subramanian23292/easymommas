import { memo } from 'react';
import { Pressable, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { AppIcon } from '../../../img/AppIcon';
import { defaultAddress, deleteAddress } from '../../../store/address/addressSlice';

function AddressCard({ data }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const cusId = useSelector(state => state.auth.cusId);

    const setDefault = () => {
        if (!data?.defaddr) {
            dispatch(defaultAddress({ action: 'setdefaddress', addr_id: data?.id, cus_id: cusId }));
        }
    };

    const delAddress = () => {
        dispatch(deleteAddress({ action: 'deleteaddress', addr_id: data?.id, cus_id: cusId }));
    };

    const navigateAddress = () => {
        navigation.push('Address', { id: data?.id });
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
                <Pressable style={styles.defaultbtn} onPress={setDefault}>
                    <View style={[styles.radiouter, data?.defaddr ? styles.radiouteractive : styles.radiouterinactive]}>
                        {data?.defaddr && <View style={styles.radioinner} />}
                    </View>
                    {data?.defaddr ?
                        <Text style={styles.defaultbtnlabel}>Default</Text>
                    :
                        <Text style={styles.setdefbtnlabel}>Set as default</Text>
                    }
                </Pressable>
                <View style={styles.actionouter}>
                    <Pressable style={styles.editbutton} onPress={navigateAddress}>
                        <AppIcon.Edit width={12} height={12} />
                    </Pressable>
                    {!data?.defaddr &&
                    <Pressable style={[styles.editbutton, styles.deletebutton]} onPress={delAddress}>
                        <AppIcon.CloseDark width={12} height={12} />
                    </Pressable>}
                </View>
            </View>
        </View>
    );
}

export default memo(AddressCard);
