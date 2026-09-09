import { StyleSheet } from 'react-native';
import Theme from '../Theme';

export const styles = StyleSheet.create({
    bottomcontainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#ffffff',
        height: 56,
        flexDirection: 'row',
        zIndex: 1,
        overflow: 'hidden',
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
        justifyContent: 'space-evenly',
    },
    bottombtn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btntext: {
        fontSize: 12,
        marginTop: 4,
    },
    btnlabel: {
        color: '#949494',
        fontFamily: Theme.fontstyle.regular,
    },
    btnlabelactive: {
        color: Theme.colors.primary,
        fontFamily: Theme.fontstyle.semibold,
    },
});
