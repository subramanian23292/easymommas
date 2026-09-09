import { StyleSheet } from 'react-native';
import Theme from '../../components/Theme';

export const styles = StyleSheet.create({
    categorycontainer: {
        flexDirection: 'row',
        backgroundColor: '#f6f6f6',
        flex: 1,
        paddingBottom: 56,
    },
    maincategory: {
        flexBasis: '25%',
    },
    maincatbtn: {
        padding: 10,
        minHeight: 60,
        justifyContent: 'center',
        position: 'relative',
    },
    maincatbtntxt: {
        color: Theme.colors.paragraph,
        fontSize: 12,
        marginTop: 6,
        fontFamily: Theme.fontstyle.semibold,
    },
    subcategory: {
        flexBasis: '75%',
        backgroundColor: '#fff',
    },
    subcatcont: {
        padding: 10,
    },
    subcatwrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 20,
        columnGap: 5,
    },
    subcatbtn: {
        width: '32%',
        alignItems: 'center',
    },
    subcatmaintxt: {
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: Theme.fontstyle.semibold,
        fontSize: 14,
    },
    imgcontainer: {
        position: 'relative',
    },
    catimg: {
        borderRadius: '100%',
    },
    subcatxt: {
        color: Theme.colors.paragraph,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 6,
        fontFamily: Theme.fontstyle.semibold,
    },
    activeline: {
        position: 'absolute',
        left: 0,
        height: 30,
        width: 2,
        backgroundColor: Theme.colors.secondary,
    },
    leveltwowrapper: {
        width: '100%',
    },
});
