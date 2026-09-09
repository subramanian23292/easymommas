import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    scrollcontainer: {
        padding: 10,
        marginTop: 56,
        paddingBottom: Platform.OS === 'ios' ? 46 : 102,
    },
});
