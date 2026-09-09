import { StyleSheet } from 'react-native';
import Theme from '../../components/Theme';

export const styles = StyleSheet.create({
    pagecontainer: {
        flex: 1,
    },
    listcontainer: {
        padding: 10,
        paddingBottom: 20,
    },
    itemseparator: {
        height: 1,
        backgroundColor: '#dddddd',
        marginVertical: 10,
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
    reviewcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    reviewtext: {
        fontSize: 14,
        marginLeft: 6,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    userrating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    userimg: {
        backgroundColor: '#dddddd',
        borderRadius: 100,
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },
    username: {
        fontSize: 14,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    starcontainer: {
        flexDirection: 'row',
    },
    usertextreview : {
        marginTop: 8,
        fontSize: 14,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
});
