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
        height: 16,
    },
    footercontainer: {
        backgroundColor: '#fff',
        position: 'absolute',
        height: 72,
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
    },
    addbutton: {
        width: '100%',
        height: 50,
        backgroundColor: Theme.colors.secondary,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addbuttonlabel: {
        fontSize: 16,
        color: '#ffffff',
        fontFamily: Theme.fontstyle.semibold,
    },
    nodatafound: {
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nodatafoundtext: {
        fontSize: 20,
        fontFamily: Theme.fontstyle.regular,
    },
});
