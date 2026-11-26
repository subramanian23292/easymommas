import { memo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { AppIcon } from '../../../img/AppIcon';
import { styles } from './style';

const Delivery = () => {
    return (
        <View style={styles.deliveryouter}>
            <View style={styles.deliverytitle}>
                <AppIcon.Truck width={18} height={18} />
                <Text style={styles.deliveryheading}>Devlivery Options</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.shippinginfo}>
                    <Text style={styles.deliveryinfo}><Text style={styles.infoheading}>Standard</Text> Fastest delivery in 4 business days. Ships usually in 2 business days</Text>
                </View>
                <View style={styles.shippinginfo}>
                    <Text style={styles.deliveryinfo}><Text style={styles.infoheading}>Express</Text> {'₹'}1050. Fastest delivery in 3 business days</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default memo(Delivery);
