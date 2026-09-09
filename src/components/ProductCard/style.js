import { StyleSheet } from 'react-native';
import Theme from '../Theme';

export const styles = StyleSheet.create({
    prodcontainer: {
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
        justifyContent: 'space-between',
    },
    prodlabel: {
        marginTop: 10,
        marginBottom: 6,
        fontSize: 14,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    pricecontainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    sp: {
        fontSize: 14,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.semibold,
    },
    mrp: {
        fontSize: 12,
        color: Theme.colors.pricemrp,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        marginLeft: 4,
        fontFamily: Theme.fontstyle.regular,
    },
    cartbtn: {
        borderRadius: 100,
        height: 38,
        width: 38,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infocontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imgcontainer: {
        position: 'relative',
    },
    wishbtn: {
        height: 36,
        width: 36,
        backgroundColor: '#ffffff',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 6,
        top: 6,
        boxShadow: '1 1 4 0 #7e7e7e',
    },
    prodimg: {
        width: '100%',
        borderRadius: 6,
    },
});
