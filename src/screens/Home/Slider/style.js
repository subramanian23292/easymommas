import { StyleSheet } from 'react-native';
import { DotSize, DotSpacing } from '../../../components/Constant';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
    slidecontainer: {
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
    },
    imgcontainer: {
        position: 'relative',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
    dotround: {
        height: DotSize,
        width: DotSize,
        borderRadius: 100,
        backgroundColor: '#bcbcbc',
        marginRight: DotSpacing,
    },
    dotindicator: {
        height: DotSize, 
        width: DotSize,
        borderRadius: 100,
        backgroundColor: Theme.colors.secondary,
        position: 'absolute',
        justifyContent: 'center',        
    },
});
