import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';

const COLORS = ['#fa7f7c', '#fa7f7c'];
const AnimatedPath = Animated.createAnimatedComponent(Path);

const Heart = ({ onThresholdReached }) => {
  const colorIndex = useSharedValue(0);
  const scale = useSharedValue(1);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const clickCount = useSharedValue(0);

  const handlePress = () => {
    clickCount.value += 1;
    if (clickCount.value >= 5) {
      runOnJS(onThresholdReached)();
    }
  };

  const longPress = Gesture.LongPress()
    .onBegin(() => {
      scale.value = withRepeat(withSpring(1.5, { damping: 1.7 }),-1,
        true);
      runOnJS(handlePress)();
    })
    .onFinalize(() => {
      scale.value = withSpring(1, { damping: 1.7 });
    });

  const dragGesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = offsetX.value;
      startY.value = offsetY.value;
    })
    .onUpdate((event) => {
      scale.value = withRepeat(withSpring(1, { damping: 1.4 }),-1,
        true);
      offsetX.value = startX.value + event.translationX;
      offsetY.value = startY.value + event.translationY;
    })
    .onEnd(() => {
      offsetX.value = withSpring(0);
      offsetY.value = withSpring(0);
    });

  const combinedGesture = Gesture.Simultaneous(longPress, dragGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: offsetX.value },
      { translateY: offsetY.value },
    ],
  }));

  const animatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(
      colorIndex.value,
      COLORS.map((_, i) => i),
      COLORS
    ),
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={combinedGesture}>
        <Animated.View style={animatedStyle}>
          <Svg width="100" height="100" viewBox="0 0 24 24">
            <AnimatedPath
              animatedProps={animatedProps}
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </Svg>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Heart;
