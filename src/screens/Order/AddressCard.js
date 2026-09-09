import { View, Text } from 'react-native';
import { styles } from './style';

const AddressCard = ({ title, address }) => {
    return (
        <View style={styles.addresscontainer}>
            <Text style={styles.addressheading}>{title} Address</Text>
            <Text style={styles.addressvalue}>{address.fname} {address.lname}</Text>
            <Text style={styles.addressvalue}>{address.address1}</Text>
            <Text style={styles.addressvalue}>{address.address2}</Text>
            <Text style={styles.addressvalue}>{address.city} {'-'} {address.postcode}</Text>
            <Text style={styles.addressvalue}>{address.state}{', '}{address.country}</Text>
            <Text style={styles.addressvalue}>{address.phone}</Text>
        </View>
    );
};

export default AddressCard;
