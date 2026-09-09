import { StyleSheet } from 'react-native';
import Theme from '../../components/Theme';

export const styles = StyleSheet.create({
    pagecontainer: {
        padding: 10,
    },
    infocontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addresscontainer: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        paddingVertical: 20,
    },
    addressheading: {
        fontSize: 16,
        fontFamily: Theme.fontstyle.semibold,
        color: Theme.colors.paragraph,
        marginBottom: 10,
    },
    infoheading: {
        fontSize: 16,
        fontFamily: Theme.fontstyle.regular,
        color: Theme.colors.paragraph,
        marginBottom: 10,
    },
    addressvalue: {
        fontSize: 16,
        fontFamily: Theme.fontstyle.regular,
        color: Theme.colors.paragraph,
    },
});
