import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    logincontainer: {
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
    loginbtn: {
        height: 50,
        backgroundColor: Theme.colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        width: '100%',
        marginTop: 10,
    },
    regtext: {
        textAlign: 'center',
        fontFamily: Theme.fontstyle.semibold,
        fontSize: 16,
        color: '#ffffff',
    },
});
