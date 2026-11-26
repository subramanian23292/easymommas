import { memo } from 'react';
import { Text, View, TextInput } from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { styles } from './style';

const RangeSlider = ({ sliderWidth, min, max, defaultmin, defaultmax, step, onValueChange }) => {
  const range = max - min;
  const clampPosition = (value) => {
    const ratio = (value - min) / range;
    return Math.min(Math.max(ratio * sliderWidth, 0), sliderWidth);
  };
  const position = useSharedValue(clampPosition(defaultmin));
  const position2 = useSharedValue(clampPosition(defaultmax));
  const zIndex = useSharedValue(0);
  const zIndex2 = useSharedValue(0);
  const context = useSharedValue(0);
  const context2 = useSharedValue(0);

  const stepWidth = sliderWidth / ((max - min) / step);

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value = position.value;
      zIndex.value = 1;
      zIndex2.value = 0;
    })
    .onUpdate(e => {
      let newPos = context.value + e.translationX;
      const minLimit = 0;
      const maxLimit = position2.value - stepWidth;

      if (newPos < minLimit) { newPos = minLimit; }
      if (newPos > maxLimit) { newPos = maxLimit; }

      position.value = Math.round(newPos / stepWidth) * stepWidth;
    })
    .onEnd(() => {
      runOnJS(onValueChange)({
        min: min + Math.floor(position.value / stepWidth) * step,
        max: min + Math.floor(position2.value / stepWidth) * step,
      });
    });

  const pan2 = Gesture.Pan()
    .onBegin(() => {
      context2.value = position2.value;
      zIndex2.value = 1;
      zIndex.value = 0;
    })
    .onUpdate(e => {
      let newPos = context2.value + e.translationX;
      const maxLimit = sliderWidth;
      const minLimit = position.value + stepWidth;

      if (newPos > maxLimit) { newPos = maxLimit; }
      if (newPos < minLimit) { newPos = minLimit; }

      position2.value = Math.round(newPos / stepWidth) * stepWidth;
    })
    .onEnd(() => {
      runOnJS(onValueChange)({
        min: min + Math.floor(position.value / stepWidth) * step,
        max: min + Math.floor(position2.value / stepWidth) * step,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    zIndex: zIndex.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: position2.value }],
    zIndex: zIndex2.value,
  }));

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    width: position2.value - position.value,
  }));

  Animated.addWhitelistedNativeProps({ text: true });
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const minLabelText = useAnimatedProps(() => {
    return {
      text: `₹${min + Math.floor(position.value / stepWidth) * step}`,
    };
  });

  const maxLabelText = useAnimatedProps(() => {
    return {
      text: `₹${min + Math.floor(position2.value / stepWidth) * step}`,
    };
  });

  return (
    <>
      <View style={styles.textcontainer}>
        <Text style={styles.selectedpricetext}>Selected price range</Text>
        <View style={styles.rangeouter}>
          <AnimatedTextInput
            style={styles.labelText}
            animatedProps={minLabelText}
            editable={false}
            defaultValue={`₹${min + Math.floor(position.value / stepWidth) * step}`}
          />
          <Text style={styles.separator}>-</Text>
          <AnimatedTextInput
            style={styles.labelText}
            animatedProps={maxLabelText}
            editable={false}
            defaultValue={`₹${min + Math.floor(position2.value / stepWidth) * step}`}
          />
        </View>
      </View>

      <View style={[styles.sliderContainer]}>
        <View style={[styles.sliderBack, { width: sliderWidth }]} />
        <Animated.View style={[sliderStyle, styles.sliderFront]} />
        <GestureDetector gesture={pan}>
          <Animated.View style={[animatedStyle, styles.thumb]} />
        </GestureDetector>
        <GestureDetector gesture={pan2}>
          <Animated.View style={[animatedStyle2, styles.thumb]} />
        </GestureDetector>
      </View>
    </>
  );
};

export default memo(RangeSlider);
