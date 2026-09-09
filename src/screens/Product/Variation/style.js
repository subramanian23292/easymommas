import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    optionouter: {
        marginTop: 10,
        marginBottom: 10,
    },
    optiontitle: {
        color: Theme.colors.paragraph,
        fontSize: 16,
        fontFamily: Theme.fontstyle.semibold,
    },
    optionvalouter: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginVertical: 6,
    },
    opvalimg: {
        height: 48,
        width: 48,
        borderRadius: 2,
    },
    opimgbutton: {
        borderWidth: 2,
        height: 60,
        width: 60,
        borderRadius: 6,
        padding: 4,
        overflow: 'hidden',
        position: 'relative',
    },
    checked: {
        borderColor: '#000',
    },
    unchecked: {
        borderColor: '#ddd',
    },
    optionbutton: {
        height: 34,
        minWidth: 54,
        borderWidth: 2,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    optionvaltext: {
        color: '#000',
        fontSize: 14,
        fontFamily: Theme.fontstyle.regular,
    },
    opcolorbtn: {
        height: 50,
        width: 50,
        borderWidth: 2,
        borderRadius: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    opcolorview: {
        height: 40,
        width: 40,
        borderRadius: '100%',
    },
});
