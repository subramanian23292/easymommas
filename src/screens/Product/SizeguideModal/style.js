import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    modalouter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalcontent: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    titlecontainer: {
        height: 50,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        paddingHorizontal: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalheading: {
        fontSize: 14,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.semibold,
    },
    closebtn: {
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
