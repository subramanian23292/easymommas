import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    buttoncontainer: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        height: 72,
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
    },
    wishbtn: {
        height: 50,
        width: 50,
        backgroundColor: '#ffffff',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '1 1 4 0 #7e7e7e',
    },
    cartcontainer: {
        width: '100%',
    },
    cartbtn: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: Theme.colors.secondary,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    cartbtnlabel: {
        fontSize: 16,
        color: '#ffffff',
        fontFamily: Theme.fontstyle.semibold,
        marginLeft: 20,
    },
    outofstockouter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stocktext: {
        fontSize: 16,
        fontFamily: Theme.fontstyle.semibold,
        color: Theme.colors.paragraph,
    },
});
