import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    paymentcontainer: {
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
        width: 44,
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
});
