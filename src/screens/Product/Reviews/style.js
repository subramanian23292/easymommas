import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    reviewContainer: {
        marginTop: 14,
        marginBottom: 10,
    },
    reviewtitle: {
        fontSize: 18,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.semibold,
    },
    divider: {
        height: 2,
        backgroundColor: Theme.colors.secondary,
        width: 80,
        marginVertical: 6,
    },
    reviewContouter: {
        marginVertical: 20,
    },
    reviewcontainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    starcontainer: {
        flexDirection: 'row',
    },
    reviewtext: {
        fontSize: 14,
        marginLeft: 6,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    reviewouter: {
        marginTop: 10,
    },
    singlereviewouter: {
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        paddingBottom: 10,
        marginVertical: 10,
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
    usertextreview : {
        marginTop: 8,
        fontSize: 14,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
    seeallreviewstext: {
        color: Theme.colors.secondary,
        fontSize: 16,
        textDecorationLine: 'underline',
        fontFamily: Theme.fontstyle.semibold,
    },
    noreviewtext: {
        fontSize: 16,
        color: Theme.colors.paragraph,
        fontFamily: Theme.fontstyle.regular,
    },
});
