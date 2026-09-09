import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    prodcontainer: {
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
        flexDirection: 'row',
    },
    imgcontainer: {
        flexBasis: '30%',
        overflow: 'hidden',
    },
    fastimg: {
        height: 100,
        borderRadius: 4,
    },
    prodbtn: {
        marginBottom: 10,
    },
    prodoptions: {
        color: 'rgba(0,0,0,.6)',
        fontSize: 12,
        fontFamily: Theme.fontstyle.regular,
    },
    detailcontainer: {
        flexBasis: '70%',
        paddingLeft: 20,
        alignItems: 'baseline',
        justifyContent: 'space-between',
    },
    infocontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    namecontainer: {
        flexBasis: '80%',
    },
    prodlabel: {
        fontSize: 14,
        fontFamily: Theme.fontstyle.regular,
    },
    removeconatiner: {
        flexBasis: '20%',
        alignItems: 'flex-end',
    },
    removebutton: {
        height: 22,
        width: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pricecontainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    prodprice: {
        color: Theme.colors.paragraph,
        fontSize: 16,
        fontFamily: Theme.fontstyle.semibold,
    },
    priceouter: {
        flexBasis: '50%',
    },
    qtycontainer: {
        flexBasis: '50%',
        alignItems: 'flex-end',
    },
    qtybtn: {
        borderWidth: 1,
        borderColor: '#dddddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
        paddingVertical: 8,
        borderRadius: 4,
        width: 80,
    },
    svgouter: {
        height: 16,
    },
    qtylabel: {
        fontFamily: Theme.fontstyle.semibold,
        color: Theme.colors.paragraph,
        fontSize: 12,
    },
});
