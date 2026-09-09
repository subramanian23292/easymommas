import { StyleSheet } from 'react-native';
import Theme from '../../components/Theme';

export const styles = StyleSheet.create({
    scrollouter: {
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        alignItems: 'center',
    },
    imagebutton: {
        borderRadius: 4,
        borderWidth: 2,
        overflow: 'hidden',
        marginHorizontal: 4,
        position: 'relative',
    },
    largeimgcontainer: {
        position: 'relative',
    },
    imageviewer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    closebutton: {
        zIndex: 1,
        left: 10,
        top: 10,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        height: 44,
        width:44,
        backgroundColor: Theme.colors.primary,
    },
});
