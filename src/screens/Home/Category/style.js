import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    scrollcontainer: {
        marginBottom: 10,
        marginTop: 16,
    },
    catbtn: {
        alignItems: 'center',
        marginHorizontal: 4,
    },
    imgcontainer: {
        position: 'relative',
    },
    catimg: {
        borderRadius: '100%',
    },
    catlabel: {
        fontSize: 12,
        color: Theme.colors.paragraph,
        textAlign: 'center',
        marginTop: 10,
        fontFamily: Theme.fontstyle.semibold,
    },
});
