import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    bestsellercontainer: {
        marginVertical: 20,
    },
    bestsellertitle: {
        fontSize: 18,
        fontFamily: Theme.fontstyle.semibold,
        color: Theme.colors.paragraph,
    },
    divider: {
        height: 2,
        backgroundColor: Theme.colors.secondary,
        width: 120,
        marginVertical: 10,
    },
    productgrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        rowGap: 10,
        columnGap: 5,
    },
});
