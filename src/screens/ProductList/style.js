import { StyleSheet } from 'react-native';
import Theme from '../../components/Theme';

export const styles = StyleSheet.create({
    pagecontainer: {
        flex: 1,
    },
    listcontainer: {
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 66,
    },
    itemseparator: {
        height: 10,
    },
    loaderContainer: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    loadertext: {
        fontSize: 16,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    nodatafound: {
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nodatafoundtext: {
        fontSize: 20,
        fontFamily: Theme.fontstyle.semibold,
    },
});
