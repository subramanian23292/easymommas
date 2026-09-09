import { StyleSheet } from 'react-native';
import Theme from '../Theme';

export const styles = StyleSheet.create({
    stepperOuter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: '#dddddd',
        marginBottom: 20,
    },
    stepperInner: {
        alignItems: 'center',
        position: 'relative',
    },
    stepRound: {
        width: 24,
        height: 24,
        borderRadius: 12,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepLine: {
        top: 12,
        position: 'absolute',
        height: 2,
        zIndex: 1,
    },
    stepcount: {
        color: '#fff',
    },
    stepmethod: {
        fontFamily: Theme.fontstyle.semibold,
    },
});
