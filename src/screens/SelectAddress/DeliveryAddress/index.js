import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import { listaddress } from '../../../store/address/addressSlice';
import { styles } from '../style';
import AddressCard from '../AdressCard';

const DeliveryAddress = () => {
    const addresslist = useSelector(listaddress);

    const renderAddress = ({ item }) => <AddressCard data={item} />;
    const renderSeparator = () => <View style={styles.itemseparator} />;

    return (
        <View style={styles.pagecontainer}>
            {Array.isArray(addresslist) && addresslist.length > 0 && (
                <FlashList
                    contentContainerStyle={styles.listcontainer}
                    data={addresslist ?? []}
                    renderItem={renderAddress}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    ItemSeparatorComponent={renderSeparator}
                />
            )}
        </View>
    );
};

export default DeliveryAddress;
