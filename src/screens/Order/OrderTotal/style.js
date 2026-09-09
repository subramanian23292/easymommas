import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    totalinner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    totalheading: {
        color: Theme.colors.paragraph,
        fontSize: 16,
        fontFamily: Theme.fontstyle.regular,
    },
    totalvalue: {
        color: Theme.colors.paragraph,
        fontSize: 16,
        fontFamily: Theme.fontstyle.semibold,
    },
    totalcontainer: {
        marginTop: 10,
    },
});
