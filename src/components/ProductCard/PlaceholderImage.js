import { View, StyleSheet } from 'react-native';
import { AppIcon } from '../../img/AppIcon';

const PlaceholderImage = ({ width, height }) => {
    return (
        <View style={styles.bgimg}>
            <AppIcon.ImageBg width={width} height={height} />
        </View>
    );
};

const styles = StyleSheet.create({
    bgimg: {
        position: 'absolute',
        zIndex: -1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PlaceholderImage;
