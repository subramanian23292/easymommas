import { StyleSheet } from 'react-native';
import Theme from '../../components/Theme';

export const styles = StyleSheet.create({
    successcontainer: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottiecont: {
        height: 200,
        width: 200,
        alignItems:'center',
        justifyContent:'center',
    },
    lottieview: {
        height: 350,
        width: 350,
    },
    thanktxt: {
        fontSize: 20,
        fontFamily: Theme.fontstyle.semibold,
        marginBottom: 12,
    },
    ordertxt: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: Theme.fontstyle.regular,
    },
    backbtn: {
        marginTop: 20,
        height: 50,
        backgroundColor: Theme.colors.secondary,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    },
    backbtnText: {
        textAlign: 'center',
        fontFamily: Theme.fontstyle.semibold,
        fontSize: 16,
        color: '#ffffff',
    },
});
