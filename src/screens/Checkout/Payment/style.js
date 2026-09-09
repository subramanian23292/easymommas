import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    modalbackdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.5,
        backgroundColor: '#000',
    },
    modalouter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalcontent: {
        backgroundColor: '#fff',
        padding: 10,
        height: 140,
        width: 300,
        borderRadius: 4,
    },
    modalheading: {
        fontSize: 18,
        color: Theme.colors.text,
        fontFamily: Theme.fontstyle.semibold,
        marginBottom: 10,
    },
    closebtncontainer: {
        alignItems: 'flex-end',
    },
    alertxt: {
        fontSize: 16,
        color: Theme.colors.text,
        fontFamily: Theme.fontstyle.regular,
        marginBottom: 20,
    },
    closebtn: {
        backgroundColor: Theme.colors.secondary,
        height: 40,
        width: 100,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closebtntext: {
        color: '#fff',
        fontSize: 16,
        fontFamily: Theme.fontstyle.regular,
    },
});
