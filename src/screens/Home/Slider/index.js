import { useEffect, memo } from 'react';
import { View, useWindowDimensions, Pressable } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    useAnimatedRef,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import { styles } from './style';
import { DotSize, DotSpacing } from '../../../components/Constant';
import PlaceholderImage from '../../../components/ProductCard/PlaceholderImage';

function Slider({ data = [] }) {
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const imageWidth = width - 20;
    const flatListRef = useAnimatedRef();
    const currentIndex = useSharedValue(0);
    const translationX = useSharedValue(0);

    useEffect(() => {
        const interval = setInterval(() => {
        let nextIndex = currentIndex.value === data.length - 1 ? 0 : currentIndex.value + 1;
        currentIndex.value = nextIndex;

        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex, data.length, flatListRef]);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            translationX.value = event.contentOffset.x;
        },
    });

    const animatedStyles = useAnimatedStyle(() => {
        const indicatorX = interpolate(
            translationX.value / imageWidth,
            [0, 1],
            [0, DotSize + DotSpacing]
        );
        return {
            transform: [{ translateX: indicatorX }],
        };
    });

    const activedot = {
        left: (width - 20) / 2 - (DotSize * data.length),
    };

    const redirectTo = (screen, id) => {
        if (screen !== '') {
            const page = (screen === 'Category') ? 'ProductList' : 'Product';
            navigation.push(page, { title: '', id: id });
        }
    };

    const renderItem = ({ item }) => (
        <Pressable style={styles.imgcontainer} onPress={() => redirectTo(item.page, item.id)}>
            <FastImage
                source={{ uri: item.img }}
                style={{ height: width / 2 - 20, width: imageWidth }}
                resizeMode="cover"
            />
            <PlaceholderImage width={width / 10} height={width / 10} />
        </Pressable>
    );

    return (
        <View style={styles.slidecontainer}>
            <Animated.FlatList
                ref={flatListRef}
                horizontal
                pagingEnabled
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                bounces={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            />
            <View style={styles.pagination}>
                {data.map((_, index) => (
                    <View key={index} style={styles.dotround} />
                ))}
                <Animated.View style={[styles.dotindicator, activedot, animatedStyles]} />
            </View>
        </View>
    );
}

export default memo(Slider);
