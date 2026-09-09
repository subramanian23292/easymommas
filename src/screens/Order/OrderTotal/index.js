import { View, Text } from 'react-native';
import { styles } from './style';

function OrderTotal({ amount }) {
    return (
        <View style={styles.totalcontainer}>
            <View style={styles.totalinner}>
                <Text style={styles.totalheading}>Subtotal</Text>
                <Text style={styles.totalvalue}>{'€'}{amount.subtotal}</Text>
            </View>
            {amount.coupon_code !== '' && (
            <View style={styles.totalinner}>
                <Text style={styles.totalheading}>Discount {`(${amount.coupon_code})`}</Text>
                <Text style={styles.totalvalue}>{'(-)'} {'€'}{amount.discount}</Text>
            </View>)}
            <View style={styles.totalinner}>
                <Text style={styles.totalheading}>Shipping {`(${amount.delivery} Delivery)`}</Text>
                <Text style={styles.totalvalue}>{'€'}{amount.shipping_amt}</Text>
            </View>
            <View style={styles.totalinner}>
                <Text style={styles.totalheading}>Total {'(VAT incl.)'}</Text>
                <Text style={styles.totalvalue}>{'€'}{amount.total}</Text>
            </View>
        </View>
    );
}

export default OrderTotal;
