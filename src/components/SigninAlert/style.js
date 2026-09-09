import { StyleSheet } from 'react-native';
import Theme from '../Theme';

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
        position: 'absolute',
        bottom: 0,
    },
    modalcontent: {
        backgroundColor: '#fff',
        padding: 20,
    },
    loginbtn: {
        height: 50,
        backgroundColor: Theme.colors.secondary,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    btnlabel: {
        textAlign: 'center',
        fontFamily: Theme.fontstyle.semibold,
        fontSize: 16,
        color: '#ffffff',
    },
    registerbtn: {
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.secondary,
    },
    regbtnlabel: {
        textAlign: 'center',
        fontFamily: Theme.fontstyle.semibold,
        fontSize: 16,
        color: Theme.colors.secondary,
    },
    heading: {
        fontFamily: Theme.fontstyle.semibold,
        fontSize: 18,
        color: Theme.colors.paragraph,
    },
    message: {
        fontSize: 14,
        fontFamily: Theme.fontstyle.regular,
        color: Theme.colors.paragraph,
        marginVertical: 20,
    },
    closebtn: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titlecontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
