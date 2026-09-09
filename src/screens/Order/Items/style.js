import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    itemcontainer: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        marginTop: 20,
        paddingBottom: 10,
    },
    productcontainer: {
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        marginBottom: 14,
        boxShadow: '0 0 5 1 #dddddd',
        padding: 6,
    },
    imgcontainer: {
        flexBasis: '30%',
    },
    prodimg: {
        height: 80,
        width: 80,
    },
    infocontainer: {
        flexBasis: '70%',
    },
    qtyprice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    sectiontitle: {
        fontSize: 16,
        fontFamily: Theme.fontstyle.semibold,
        color: Theme.colors.paragraph,
        marginBottom: 10,
    },
    prodname: {
        fontSize: 16,
        fontFamily: Theme.fontstyle.regular,
        color: Theme.colors.paragraph,
    },
    opname:{
        fontSize: 14,
        fontFamily: Theme.fontstyle.regular,
        color: 'rgba(0,0,0, 0.6)',
    },
    qtypricelabel: {
        fontSize: 14,
        fontFamily: Theme.fontstyle.regular,
        color: Theme.colors.paragraph,
    },
    revcontainer: {
        marginTop: 10,
    },
    writetext: {
        fontSize: 14,
        color: '#007bff',
        textDecorationLine: 'underline',
    },
    starcontainer: {
        flexDirection: 'row',
        gap: 2,
    },
});
