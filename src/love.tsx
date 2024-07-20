import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
  withSpring,
  withRepeat,
  runOnJS
} from 'react-native-reanimated';
import Svg, {Rect, Text as SvgText } from 'react-native-svg';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';

// 导入JSON文件
const messages = require('./public/massage.json');

const { width, height } = Dimensions.get('window');

const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface LoveProps {
  onhandlePan: (image_id: number) => void;
  onshowLatter: (isshow: number) => void;
}

const Love: React.FC<LoveProps> = ({ onhandlePan, onshowLatter}) => {
    const [message, setMessage] = useState('');
    const [showLetter, setShowLetter] = useState(0);
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);
    const [componentWidth, setComponentWidth] = useState(0);
    const [componentHeight, setComponentHeight] = useState(0);
    const viewRef = useRef(null);
    const measureView = () => {
      viewRef.current.measure((fx, fy, width, height, px, py) => {
        setX(px);
        setY(py);
        setComponentWidth(width);
        setComponentHeight(height);
        
      });
    };
    
    const centerX = (width+X)%width + componentWidth/2; // 默认大小50 50 X， Y为绝对路径 所以中心点为+25
    const centerY = (height+Y)%height + componentHeight/2;
    const MAX_DISTANCE = (height-centerY);
    const yTHRESHOLD = height * 0.15; // 屏幕下方的1/10
    const xTHRESHOLD = width * 0.25; // width * (1-0.3)

    const scale = useSharedValue(1);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);
    const clickCount = useSharedValue(0);
    const [count, setCount] = useState(0);
    const opacity = useSharedValue(1);
    const rotation = useSharedValue(0);
    const centerXCurrent = useSharedValue(0);
    const centerYCurrent = useSharedValue(0);

    const borderColor = useSharedValue(0);

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

  const logValue = (value: any) => {
    console.log('startX.value:', value);
  };

  useEffect(() => {
    // const randomIndex = Math.floor(Math.random() * messages.messages.length);
    // setMessage(messages.messages[randomIndex]);
  }, []);

  const dragGesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withRepeat(withSpring(1.2, { damping: 2, stiffness:20}), -1, true);
      startX.value = centerX;
      startY.value = centerY;
    })
    .onUpdate((event) => {
      runOnJS(onhandlePan)(1);
      const newScale = 1 + (event.translationY / height)+0.4;
      centerXCurrent.value = event.translationX + centerX;
      centerYCurrent.value = event.translationY + centerY;
      offsetX.value = event.translationX / newScale;
      offsetY.value = event.translationY / newScale;

      scale.value = newScale;
      const distance = Math.sqrt(
        Math.pow(offsetX.value - centerX, 2) + Math.pow(offsetY.value - centerY, 2)
      );
      opacity.value = Math.min(1, distance-100 / height)
    })
    .onEnd(() => {
      if (centerYCurrent.value > height - yTHRESHOLD && centerXCurrent.value > xTHRESHOLD && centerXCurrent.value < width - xTHRESHOLD) {
        offsetX.value = withSpring(0);
        offsetY.value = withSpring(0);
        runOnJS(onshowLatter)(1);
        // runOnJS(postRequest)();
        runOnJS(onhandlePan)(0);
        runOnJS(setShowLetter)(1-showLetter);
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

  const writeAnimated = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: offsetX.value },
      { translateY: offsetY.value },
    ],
    opacity: opacity.value,
    borderColor: interpolateColor(borderColor.value, [0, 0.5, 1], ['red', 'orange', 'yellow']),
  }));

  return (
    <GestureHandlerRootView  style={[
      styles.container,{ top: height * 0.022, right: width * 0.48 }
    ]}>
      <GestureDetector gesture={combinedGesture}>
      <View style={styles.border} ref={viewRef} onLayout={measureView}>
      
        <Animated.View style={animatedStyle}>
        <Svg height={30} width={30}>
            <SvgText
              x={15}
              y={15}
              fontSize="16"
              fontWeight="bold"
              fill="black"
              textAnchor="middle"
            >
              {showLetter === 0 ? '💌' : '💋'}
            </SvgText>
          </Svg>
        </Animated.View>
      </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  border: {
    borderWidth: 0,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    zIndex: 4,
  }
});

export default Love;