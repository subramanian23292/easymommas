import { StyleSheet } from 'react-native';
import Theme from '../../components/Theme';

export const styles = StyleSheet.create({
    fieldcontainer: {
        marginBottom: 20,
    },
    titlecontainer: {
        position: 'relative',
        marginBottom: 30,
    },
    pagetitle: {
        color: Theme.colors.paragraph,
        fontSize: 22,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        paddingBottom: 10,
        fontFamily: Theme.fontstyle.regular,
    },
    divider: {
        height: 2,
        backgroundColor: Theme.colors.secondary,
        width: 80,
        position: 'absolute',
        bottom: 0,
    },
    passcontainer: {
        position: 'relative',
    },
    fieldlabel: {
        fontSize: 16,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
        marginBottom: 6,
    },
    inputfield: {
        borderWidth: 1,
        borderRadius: 100,
        height: 50,
        paddingHorizontal: 20,
        fontSize: 16,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    passwordfield: {
        paddingRight: 50,
    },
    valid: {
        borderColor: '#dddddd',
    },
    invalid: {
        borderColor: '#ff0000',
    },
    loginbtn: {
        height: 50,
        backgroundColor: Theme.colors.secondary,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnlabel: {
        textAlign: 'center',
        fontFamily: Theme.fontstyle.semibold,
        fontSize: 16,
        color: '#ffffff',
    },
    errortext: {
        color: '#ff0000',
        fontSize: 14,
        marginTop: 2,
        fontFamily: Theme.fontstyle.regular,
    },
    footer: {
        marginTop: 10,
        alignItems: 'flex-end',
    },
    lostbtnlabel: {
        color: Theme.colors.paragraph,
        fontSize: 16,
        fontFamily: Theme.fontstyle.regular,
    },
    orcontainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 40,
        marginVertical: 20,
    },
    orlabelcontainer: {
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: '100%',
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: 1,
    },
    orlabel: {
        fontSize: 14,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    ordivider: {
        height: 1,
        backgroundColor: '#dddddd',
        width: '100%',
    },
    googlebtn: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#dddddd',
    },
    googlebtnlabel: {
        fontSize: 16,
        marginLeft: 10,
        fontFamily: Theme.fontstyle.regular,
    },
    backbtn: {
        height: 44,
        width: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 10,
    },
    passwordiconbtn: {
        position: 'absolute',
        zIndex: 1,
        right: 0,
        height: 50,
        width: 50,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerouter: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    dontaccount: {
        fontSize: 16,
        fontFamily: Theme.fontstyle.regular,
        color: Theme.colors.paragraph,
    },
    signupbtn: {
        marginLeft: 6,
    },
    signuptext: {
        fontSize: 16,
        fontFamily: Theme.fontstyle.semibold,
        color: Theme.colors.paragraph,
    },
    errortxt: {
        color: '#ff0000',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
});
