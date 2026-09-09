import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    deliveryouter: {
        marginVertical: 10,
    },
    deliveryheading: {
        color: Theme.colors.secondary,
        fontFamily: Theme.fontstyle.semibold,
        fontSize: 14,
        marginBottom: 10,
    },
    deliveryinfo: {
        color: Theme.colors.paragraph,
        fontSize: 14,
        marginBottom: 10,
        fontFamily: Theme.fontstyle.regular,
    },
    shippinginfo: {
        maxWidth: 280,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
    },
    infoheading: {
        color: Theme.colors.secondary,
        fontFamily: Theme.fontstyle.semibold,
        fontSize: 14,
    },
    deliverytitle: {
        flexDirection: 'row',
        gap: 6,
    },
});
