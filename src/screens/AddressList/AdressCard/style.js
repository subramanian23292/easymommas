import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    cardcontainer: {
        borderRadius: 10,
        padding: 10,
        boxShadow: '0 0 5 1 #dddddd',
    },
    addressinfo: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    addressinfoname: {
        fontSize: 16,
        fontFamily: Theme.fontstyle.regular,
        color: Theme.colors.paragraph,
    },
    addrbold: {
        fontFamily: Theme.fontstyle.semibold,
    },
    addressinfovalue: {
        fontSize: 16,
        fontFamily: Theme.fontstyle.regular,
        color: Theme.colors.paragraph,
    },
    optioncontainer: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    defaultbtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    defaultbtnlabel: {
        fontSize: 16,
        fontFamily: Theme.fontstyle.regular,
        color: Theme.colors.secondary,
        marginLeft: 6,
    },
    setdefbtnlabel: {
        fontSize: 16,
        fontFamily: Theme.fontstyle.regular,
        color: Theme.colors.paragraph,
        marginLeft: 6,
    },
    editbutton: {
        backgroundColor: '#efecec',
        height: 26,
        width: 26,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    deletebutton: {
        marginLeft: 10,
    },
    radiouter: {
        height: 20,
        width: 20,
        borderRadius: 100,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radiouteractive: {
        borderColor: Theme.colors.secondary,
    },
    radiouterinactive: {
        borderColor: '#dddddd',
    },
    radioinner: {
        height: 10,
        width: 10,
        borderRadius: 100,
        backgroundColor: Theme.colors.secondary,
    },
    actionouter: {
        flexDirection: 'row',
    },
});
