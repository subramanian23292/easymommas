import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    statuscontainer: {
        marginTop: 10,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
    },
    statusrow:{
        flexDirection:'row',
        marginBottom: 10,
    },
    indicatorcontainer: {
        position:'relative',
        height: 14,
    },
    indicatorline:{
        width: 2,
        backgroundColor: '#568203',
        position: 'absolute',
        bottom: 0,
        left: 4,
        zIndex: 1,
    },
    dotround: {
        height: 10,
        width: 10,
        borderRadius: 100,
        backgroundColor: '#568203',
        top: 6,
    },
    infocontainer:{
        paddingLeft: 10,
    },
    statuslabel:{
        color: Theme.colors.paragraph,
        fontSize: 16,
        fontFamily: Theme.fontstyle.semibold,
    },
    statusinfo: {
        color: '#696969',
        marginTop: 4,
        fontSize: 14,
        fontFamily: Theme.fontstyle.regular,
    },
});
