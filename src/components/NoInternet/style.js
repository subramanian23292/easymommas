import { StyleSheet } from 'react-native';
import Theme from '../Theme';

export const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 22,
        color: Theme.colors.paragraph,
        marginVertical: 10,
        fontFamily: Theme.fontstyle.semibold,
    },
    para: {
        fontSize: 18,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
});
