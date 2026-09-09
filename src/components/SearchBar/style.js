import { StyleSheet } from 'react-native';
import Theme from '../Theme';

export const styles = StyleSheet.create({
    searchcontainer: {
        height: 56,
        paddingHorizontal: 10,
        paddingTop: 6,
        backgroundColor: Theme.colors.primary,
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    searchbar: {
        backgroundColor: '#fff',
        width: '100%',
        height: 40,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    },
    searchtext: {
        fontSize: 14,
        paddingLeft: 10,
        color: '#949494',
        fontFamily: Theme.fontstyle.regular,
    },
});
