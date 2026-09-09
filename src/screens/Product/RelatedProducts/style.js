import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    relatedcontainer: {
        marginTop: 14,
        marginBottom: 10,
    },
    relatedtitle: {
        fontSize: 18,
        fontFamily: Theme.fontstyle.semibold,
        color: Theme.colors.paragraph,
    },
    divider: {
        height: 2,
        backgroundColor: Theme.colors.secondary,
        width: 150,
        marginVertical: 6,
    },
    prodcontainer: {
        gap: 10,
        marginTop: 10,
    },
});
