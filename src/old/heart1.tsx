import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const COLORS = ['#fa7f7c', '#fa7f7c'];

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function Heart() {
  const colorIndex = useSharedValue(0);
  const scale = useSharedValue(1);

  const longPress = Gesture.LongPress()
    .onBegin(() => {
      scale.value = withSpring(1.5, { damping: 1.7 })
    })
    .onStart(() => {
      scale.value = withSpring(1.5, { damping: 1.7 })
    })
    .onFinalize(() => {
      scale.value = withSpring(1, { damping: 1.7 })
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(
      colorIndex.value,
      COLORS.map((_, i) => i),
      COLORS
    ),
  }));

  return (
    <GestureDetector gesture={Gesture.Simultaneous(longPress)}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Svg width="100" height="100" viewBox="0 0 24 24">
          <AnimatedPath
            animatedProps={animatedProps}
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </Svg>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
