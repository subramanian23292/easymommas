import { StyleSheet } from 'react-native';
import Theme from '../Theme';

export const styles = StyleSheet.create({
    headerRightcontainer: {
        flexDirection: 'row',
    },
    searchbtn: {
        height: 44,
        width: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    cartbtn: {
        height: 44,
        width: 44,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 10,
    },
    countcontainer: {
        position: 'absolute',
        height: 20,
        width: 20,
        backgroundColor: Theme.colors.secondary,
        top: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    cartcount: {
        color: '#ffffff',
        fontSize: 12,
        fontFamily: Theme.fontstyle.regular,
    },
    backbtn: {
        height: 44,
        width: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 10,
    },
});
