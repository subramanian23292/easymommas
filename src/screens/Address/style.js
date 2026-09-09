import { StyleSheet } from 'react-native';
import Theme from '../../components/Theme';

export const styles = StyleSheet.create({
    scrollcontainer: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 10,
    },
    formcontainer: {
        width: '100%',
    },
    fieldcontainer: {
        marginBottom: 12,
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
        fontFamily: Theme.fontstyle.regular,
        color: Theme.colors.paragraph,
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
    errortext: {
        color: '#ff0000',
        fontSize: 14,
        fontFamily: Theme.fontstyle.regular,
        marginTop: 2,
    },
    savebutton: {
        height: 50,
        backgroundColor: Theme.colors.secondary,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    savebuttonlabel: {
        textAlign: 'center',
        fontFamily: Theme.fontstyle.semibold,
        fontSize: 16,
        color: '#ffffff',
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
    passcontainer: {
        position: 'relative',
    },
});
