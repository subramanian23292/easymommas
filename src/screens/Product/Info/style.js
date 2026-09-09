import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    infocontainer: {
        marginTop: 20,
        marginBottom: 10,
    },
    prodlabel: {
        fontSize: 16,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    pricecontainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 10,
    },
    sp: {
        fontSize: 18,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.semibold,
    },
    mrp: {
        fontSize: 16,
        color: Theme.colors.pricemrp,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        marginLeft: 10,
        fontFamily: Theme.fontstyle.regular,
    },
    reviewtext: {
        fontSize: 14,
        marginLeft: 6,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    reviewcontainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    starcontainer: {
        flexDirection: 'row',
    },
    vatlabel: {
        color: '#848484',
        marginLeft: 4,
    },
    sizeguidebtnouter: {
        marginTop: 14,
        flexDirection: 'row',
    },
    sizeguidebtn: {
        paddingVertical: 4,
    },
    sizeguidebtntxt: {
        textDecorationLine: 'underline',
        color: '#007bff',
        fontFamily: Theme.fontstyle.regular,
    },
});
