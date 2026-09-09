import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    cardcontainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dddddd',
        padding: 10,
        height: 80,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderheading: {
        color: '#696969',
        fontSize: 16,
        fontFamily: Theme.fontstyle.regular,
    },
    ordervalue: {
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.semibold,
    },
});
