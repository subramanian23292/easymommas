import { StyleSheet } from 'react-native';
import Theme from '../../components/Theme';

export const styles = StyleSheet.create({
    pagecontainer: {
        flex: 1,
    },
    listcontainer: {
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 82,
    },
    itemseparator: {
        height: 10,
    },
    footercontainer: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        height: 72,
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
    },
    totalcontainer: {
        flexBasis: '40%',
    },
    buttoncontainer: {
        flexBasis: '60%',
    },
    proceedbtn: {
        height: 50,
        backgroundColor: Theme.colors.secondary,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalheading: {
        fontSize: 14,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    totalvalue: {
        fontSize: 18,
        color: Theme.colors.paragraph,
        marginTop: 6,
        fontFamily: Theme.fontstyle.semibold,
    },
    proceedlabel: {
        fontSize: 16,
        color: '#ffffff',
        fontFamily: Theme.fontstyle.semibold,
    },
    emptyouter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nodatafoundtext: {
        fontSize: 20,
        fontFamily: Theme.fontstyle.semibold,
    },
});
