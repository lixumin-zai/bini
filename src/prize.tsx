import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  runOnJS
} from 'react-native-reanimated';
import Svg, { Rect, Text as SvgText, Circle, Path } from 'react-native-svg';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';

// 导入JSON文件
const messages = require('./public/massage.json');

const { width, height } = Dimensions.get('window');
const centerX = width / 2;
const centerY = height / 2;
const MAX_DISTANCE = Math.sqrt(centerX * centerX + centerY * centerY);
const yTHRESHOLD = height * 0.1; // 屏幕下方的1/10
const xTHRESHOLD = width * 0.3; // width * (1-0.3)

const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface PrizeProps {
  onGoBack: () => void;
  onhandlePan: (image_id: number) => void;
}

const Prize: React.FC<PrizeProps> = ({ onGoBack, onhandlePan }) => {
  const [message, setMessage] = useState('');
  const scale = useSharedValue(1);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const postRequest = async () => {
    try {
      await fetch("https://open.feishu.cn/open-apis/bot/v2/hook/09323ac4-7ce1-4056-81f6-bc5196c58167", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "msg_type": "text",
          "content": {
            "text": `<at user_id=''>所有人</at>: ${message}`,
          }
        }),
      });
    } catch (error) {
      console.error('Error posting request:', error);
    }
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.messages.length);
    setMessage(messages.messages[randomIndex]);
  }, []);

  const dragGesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withRepeat(withSpring(1.2, { damping: 2, stiffness:20}), -1, true);
      startX.value = offsetX.value;
      startY.value = offsetY.value;
    })
    .onUpdate((event) => {
      runOnJS(onhandlePan)(1);
      const newScale = 1 - event.translationY / (centerY * 2); // 缩放比例计算
      // scale.value = withRepeat(withSpring(1.2, { damping: 1.7 ,stiffness:20}), -1, true);
      scale.value = withSpring(newScale, { damping: 1.4, stiffness:20});
      offsetX.value = startX.value + event.translationX / newScale;
      offsetY.value = startY.value + event.translationY / newScale;
      const distance = Math.sqrt(Math.pow(offsetX.value - centerX, 2) + Math.pow(offsetY.value - centerY, 2));
      opacity.value = Math.min(1, distance / MAX_DISTANCE);
    })
    .onEnd(() => {
      const centerXCurrent = offsetX.value + width / 2;
      const centerYCurrent = offsetY.value + height / 2;
      if (centerYCurrent > height - yTHRESHOLD) {
        runOnJS(onhandlePan)(2);
        runOnJS(postRequest)();
      }else{
        runOnJS(onhandlePan)(0);
      }
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
