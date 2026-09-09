import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    profilecontainer: {
        alignItems: 'center',
    },
    imgcontainer: {
        height: 100,
        width: 100,
        backgroundColor: '#dddddd',
        borderRadius: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    namecontainer: {
        alignItems: 'center',
    },
    namelabel: {
        fontSize: 18,
        fontFamily: Theme.fontstyle.semibold,
        color: Theme.colors.paragraph,
        marginTop: 10,
    },
    btnscontainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'flex-start',
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
    },
    infobtn: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
    },
    infobtnlabel: {
        fontSize: 16,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    logoutbtn: {
        marginTop: 20,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: Theme.colors.secondary,
        alignItems: 'center',
        borderRadius: 100,
    },
    logoutlabel: {
        fontSize: 16,
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: Theme.fontstyle.semibold,
    },
});
