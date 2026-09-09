import { StyleSheet } from 'react-native';
import Theme from '../../components/Theme';

export const styles = StyleSheet.create({
    pagecontainer: {
        flex: 1,
    },
    header: {
        height: 56,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    searchinp: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#dddddd',
        marginEnd: 20,
        paddingHorizontal: 20,
        fontFamily: Theme.fontstyle.regular,
        fontSize: 14,
        color: Theme.colors.paragraph,
    },
    backbtn: {
        width: 56,
        alignItems: 'center',
    },
    listcontainer: {
        padding: 10,
    },
    itemseparator: {
        height: 1,
        backgroundColor: '#dddddd',
    },
    prodcard: {
        flexDirection: 'row', 
        marginVertical: 10,
        alignItems: 'center'
    },
    prodimg: {
        height: 50,
        width: 50
    },
    prodlabel: {
        wordBreak: 'break-word',
        flex: 1,
        marginStart: 10
    }
});
