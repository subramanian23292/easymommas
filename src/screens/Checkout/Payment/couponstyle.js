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
        marginBottom: 10,
    },
    modalheading: {
        fontSize: 16,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.semibold,
    },
    closebtn: {
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemcontainer: {
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 10,
        padding: 10,
    },
    itemseparator: {
        height: 10,
    },
    couponame: {
        fontFamily: Theme.fontstyle.semibold,
        color: Theme.colors.paragraph,
        fontSize: 16,
        marginBottom: 10,
    },
    coupondiscount: {
        fontFamily: Theme.fontstyle.regular,
        color: Theme.colors.paragraph,
        fontSize: 14,
        marginBottom: 10,
    },
    couponbtn: {
        backgroundColor: '#efecec',        
        borderRadius: 2,
        alignSelf: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 4,
        borderStyle: 'dotted',
        borderWidth: 1,
        borderColor: '#000',
    },
    couponcode: {
        fontFamily: Theme.fontstyle.semibold,
        color: Theme.colors.paragraph,
        fontSize: 14,
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
    couponlistcontainer: {
        flex: 1,
    },
});
