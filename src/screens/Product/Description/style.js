import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    containerdesc: {
        marginBottom: 10,
    },
    desctitle: {
        fontSize: 18,
        fontFamily: Theme.fontstyle.semibold,
        color: Theme.colors.paragraph,
    },
    divider: {
        height: 2,
        backgroundColor: Theme.colors.secondary,
        width: 100,
        marginVertical: 6,
    },
});
