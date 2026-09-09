import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

function OrderCard({data}) {
    const navigation = useNavigation();

    function handleorder() {
        navigation.push('Order', {id: data.order_id});
    }

    return (
        <Pressable style={styles.cardcontainer} onPress={handleorder}>
            <View style={styles.header}>
                <Text style={styles.orderheading}>Order <Text style={styles.ordervalue}>{'#'}{data.order_no}</Text></Text>
                <Text style={styles.orderheading}>Date <Text style={styles.ordervalue}>{data.date_added}</Text></Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.orderheading}>Satus <Text style={styles.ordervalue}>{data.order_status}</Text></Text>
                <Text style={styles.orderheading}>Total <Text style={styles.ordervalue}>{`€${data.total}`}</Text></Text>
            </View>
        </Pressable>
    );
}

export default OrderCard;
