import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    textcontainer: {
        padding: 10,
    },
    selectedpricetext: {
        fontSize: 16,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    rangeouter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginVertical: 10,
    },
    labelText: {
        fontSize: 16,
        minWidth: 46,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    separator: {
        fontSize: 16,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    sliderContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    sliderBack: {
        height: 4,
        backgroundColor: '#dcdcdc',
        borderRadius: 20,
    },
    sliderFront: {
        height: 4,
        backgroundColor: Theme.colors.secondary,
        borderRadius: 20,
        position: 'absolute',
    },
    thumb: {
        left: -10,
        width: 20,
        height: 20,
        position: 'absolute',
        backgroundColor: '#fff',
        borderColor: Theme.colors.secondary,
        borderWidth: 2,
        borderRadius: 10,
    },
});
