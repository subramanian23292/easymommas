import { StyleSheet } from 'react-native';
import Theme from '../../components/Theme';

export const styles = StyleSheet.create({
    headercontainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        width: '100%',
        top: 0,
        position: 'absolute',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        zIndex: 2,
    },
    headertitle: {
        color: Theme.colors.paragraph,
        fontSize: 18,
        fontFamily: Theme.fontstyle.semibold,
    },
    clearbtn: {
        marginEnd: 10,
    },
    clearbtnlabel: {
        color: Theme.colors.paragraph,
        fontSize: 14,
        fontFamily: Theme.fontstyle.regular,
    },
    filtercontainer: {
        flexDirection: 'row',
        paddingTop: 56,
        backgroundColor: '#f6f6f6',
        flex: 1,
    },
    filtercategory: {
        flexBasis: '35%',
    },
    filtercatbtn: {
        height: 50,
        padding: 10,
        justifyContent: 'center',
    },
    filtercatbtnlabel: {
        fontSize: 14,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    filtervalues: {
        flexBasis: '65%',
        backgroundColor: '#fff',
    },
    filtervaluecontainer: {
        padding: 10,
    },
    checkbtn: {
        flexDirection: 'row',
        marginBottom: 18,
    },
    checkicon: {
        height: 20,
        width: 20,
        borderWidth: 2,
        borderColor: '#dddddd',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checktrue: {
        borderWidth: 0,
        backgroundColor: Theme.colors.secondary,
    },
    checkfalse: {
        borderWidth: 1,
        borderColor: '#d0d0d0',
        backgroundColor: 'transparent',
    },
    checkbtnlabel: {
        fontSize: 14,
        color: Theme.colors.paragraph,
        marginLeft: 10,
        fontFamily: Theme.fontstyle.regular,
    },
    backbtn: {
        height: 44,
        width: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 10,
    },
    applycontainer: {
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
        height: 72,
        position: 'absolute',
        backgroundColor:'#ffffff',
        width: '100%',
        padding: 10,
    },
    applybtn: {
        height: 50,
        backgroundColor: Theme.colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    applybtnlabel: {
        textAlign: 'center',
        fontSize: 16,
        color: '#ffffff',
        fontFamily: Theme.fontstyle.semibold,
    },
    activeline: {
        position: 'absolute',
        left: 0,
        height: 30,
        width: 2,
        backgroundColor: Theme.colors.secondary,
    },
    activebg: {
        backgroundColor: '#fff',
    },
});
