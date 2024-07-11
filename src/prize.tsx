import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';

// 导入JSON文件
const messages = require('./public/massage.json');

const { width, height } = Dimensions.get('window');
const centerX = width / 2;
const centerY = height / 2;
const MAX_DISTANCE = Math.sqrt(centerX * centerX + centerY * centerY);

const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface PrizeProps {
  onGoBack: () => void;
}

const Prize: React.FC<PrizeProps> = ({ onGoBack }) => {
  const [message, setMessage] = useState('');
  const scale = useSharedValue(1);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.messages.length);
    setMessage(messages.messages[randomIndex]);
  }, []);

  // const longPress = Gesture.LongPress()
  //   .onBegin(() => {
  //     scale.value = withRepeat(withSpring(1.2, { damping: 1.7 ,stiffness:20}), -1, true);
  //   })
  //   .onFinalize(() => {
  //     scale.value = withSpring(1, { damping: 1.7 });
  //   });

  const dragGesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withRepeat(withSpring(1.2, { damping: 1.7 ,stiffness:20}), -1, true);
      startX.value = offsetX.value;
      startY.value = offsetY.value;
    })
    .onUpdate((event) => {
      const newScale = 1 - event.translationY / (centerY * 2); // 缩放比例计算
      // scale.value = withRepeat(withSpring(1.2, { damping: 1.7 ,stiffness:20}), -1, true);
      scale.value = withSpring(newScale, { damping: 1.4 });
      offsetX.value = startX.value + event.translationX / newScale;
      offsetY.value = startY.value + event.translationY / newScale;
      const distance = Math.sqrt(Math.pow(offsetX.value - centerX, 2) + Math.pow(offsetY.value - centerY, 2));
      opacity.value = Math.min(1, distance / MAX_DISTANCE);
    })
    .onEnd(() => {
      offsetX.value = withSpring(0);
      offsetY.value = withSpring(0);
      opacity.value = withSpring(1);
      scale.value = withSpring(1);
    });

  const combinedGesture = Gesture.Simultaneous(
    // longPress, 
    dragGesture
  );

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
          <Svg height="200" width="300">
            <AnimatedRect
              x="0"
              y="0"
              width="300"
              height="200"
              stroke="black"
              strokeWidth="2"
              fill="lightgrey"
            />
            <SvgText
              x="150"
              y="100"
              fontSize="16"
              fontWeight="bold"
              fill="black"
              textAnchor="middle"
            >
              {message}
            </SvgText>
          </Svg>
        </Animated.View>
      </GestureDetector>
      <Button title="Go Back" onPress={onGoBack} />
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

export default Prize;
