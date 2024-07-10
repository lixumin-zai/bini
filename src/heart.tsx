import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  runOnJS,
} from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const centerX = width / 2;
const centerY = height / 2;
const MAX_DISTANCE = Math.sqrt(centerX * centerX + centerY * centerY);

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface HeartProps {
  onThresholdReached: () => void;
}

const Heart: React.FC<HeartProps> = ({ onThresholdReached }) => {
  const scale = useSharedValue(1);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const clickCount = useSharedValue(0);
  const [count, setCount] = useState(0);
  const opacity = useSharedValue(1);

  const handlePress = () => {
    clickCount.value += 1;
    setCount(clickCount.value);
    if (clickCount.value >= 5) {
      runOnJS(onThresholdReached)();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      runOnJS(() => {
        clickCount.value = Math.max(clickCount.value - 1, 0);
        setCount(clickCount.value);
      })();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const longPress = Gesture.LongPress()
    .onBegin(() => {
      scale.value = withRepeat(withSpring(1.5, { damping: 1.7 }), -1, true);
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
      scale.value = withRepeat(withSpring(1, { damping: 1.4 }), -1, true);
      offsetX.value = startX.value + event.translationX;
      offsetY.value = startY.value + event.translationY;
      const distance = Math.sqrt(Math.pow(offsetX.value - centerX, 2) + Math.pow(offsetY.value - centerY, 2));
      opacity.value = Math.min(1, distance / MAX_DISTANCE);
    })
    .onEnd(() => {
      offsetX.value = withSpring(0);
      offsetY.value = withSpring(0);
      opacity.value = withSpring(1);
    });

  const combinedGesture = Gesture.Simultaneous(longPress, dragGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: offsetX.value },
      { translateY: offsetY.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={combinedGesture}>
        <Animated.View style={animatedStyle}>
          <Svg width="100" height="100" viewBox="0 0 24 24">
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="50%" stopColor="#fa6a6a" stopOpacity="1" />
                <Stop offset="100%" stopColor="#ff0000" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <AnimatedPath
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="url(#grad)"
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
