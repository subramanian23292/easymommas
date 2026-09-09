import { memo } from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import FastImage from '@d11/react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { DotSize, DotSpacing } from '../../../components/Constant';
import PlaceholderImage from '../../../components/ProductCard/PlaceholderImage';

function ImageSlider({ images }) {
    const { width, height } = useWindowDimensions();
    const translationX = useSharedValue(0);
    const navigation = useNavigation();

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            translationX.value = event.contentOffset.x;
        },
    });

    const animatedStyles = useAnimatedStyle(() => {
        const indicatorX = interpolate(
            translationX.value / (width - 20),
            [0, 1],
            [0, DotSize + DotSpacing]
        );
        return {
            transform: [{ translateX: indicatorX }],
        };
    });

    const activedot = {
        left: (width - 20) / 2 - DotSize * images.length,
    };

    const imagegallery = () => {
        navigation.navigate('ProductImage', { images });
    };

    const renderItem = ({ item }) => (
        <Pressable onPress={imagegallery} style={styles.imgcontainer}>
            <FastImage
                source={{ uri: item.imgpath }}
                style={{ height: height / 3, width: width - 20 }}
                resizeMode="contain"
            />
            <PlaceholderImage width={width / 8} height={width / 8} />
        </Pressable>
    );

    return (
        <>
        <View style={styles.slidecontainer}>
            <Animated.FlatList
                data={images}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            />
        </View>
        <View style={styles.pagination}>
            {images.map((item) => (
                <View key={item.id} style={styles.dotround} />
            ))}
            <Animated.View style={[styles.dotindicator, activedot, animatedStyles]} />
        </View>
        </>
    );
}

export default memo(ImageSlider);
