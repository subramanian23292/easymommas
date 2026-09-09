import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    appcontainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    keyboardcontainer: {
        flex: 1,
    },
    scrollcontainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backcontainer: {
        position: 'absolute',
        zIndex: 1,
        top: 10,
    },
});
