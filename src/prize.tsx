import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Dimensions, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
  runOnJS,
  interpolateColor,
  withSequence
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
  prizeInfo: any;
}

const Prize: React.FC<PrizeProps> = ({ onGoBack, onhandlePan, prizeInfo }) => {
  const [message, setMessage] = useState('');
  const [useInfo, setUseInfo] = useState(0); // 记录使用情况
  const borderColor = useSharedValue(0);
  const scale = useSharedValue(1);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const centerXCurrent = useSharedValue(0);
  const centerYCurrent = useSharedValue(0);
  const tipScale = useSharedValue(1);
  const tipRotate = useSharedValue(0);
  

  const logValue = (value: any) => {
    console.log('startX.value:', value);
  };

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

  const fetchUseInfo = async () => {
    try {
      const response = await fetch("http://1.203.96.170:20010/message");
      // const response = await fetch("http://192.168.1.206:20010/message");
      const data = await response.json();
      setUseInfo(data.messages);
      
    } catch (error) {
      console.error('Error fetching useInfo:', error);
    }
  };
  useEffect(() => {
    const messages = prizeInfo;
    const randomIndex = Math.floor(Math.random() * messages.messages.length);
    setMessage(messages.messages[randomIndex]);
    // setMessage(useInfo[randomIndex]);
    scale.value = withRepeat(withSpring(1.2, { damping: 2, stiffness:20}), -1, true);
    borderColor.value = withRepeat(
      withTiming(1, {
        duration: 500,
        easing: Easing.linear,
      }),
      -1,
      true
    );
  }, []);


  const dragGesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withRepeat(withSpring(1.2, { damping: 2, stiffness:20}), -1, true);
      startX.value = offsetX.value;
      startY.value = offsetY.value;
    })
    .onUpdate((event) => {
      runOnJS(onhandlePan)(1);
      const newScale = 1 - (event.translationY / height); // 缩放比例计算
      centerXCurrent.value = event.translationX + centerX;
      centerYCurrent.value = event.translationY + centerY;
      offsetX.value = event.translationX ;
      offsetY.value = event.translationY ;
      const distance = Math.sqrt(Math.pow(offsetX.value - centerX, 2) + Math.pow(offsetY.value - centerY, 2));
      opacity.value = Math.min(1, distance / MAX_DISTANCE);
    })
    .onEnd(()=> {
      if (centerYCurrent.value > height - yTHRESHOLD && centerXCurrent.value > xTHRESHOLD && centerXCurrent.value < width - xTHRESHOLD) {
        runOnJS(onhandlePan)(2);
        if(useInfo === 0){
          runOnJS(setUseInfo)(1);
          runOnJS(postRequest)();
        }else{
          tipScale.value = withSequence(
            withTiming(1.4, { duration: 200 }),
            withRepeat(withTiming(1.4, { duration: 100 }), 6, true),
            withTiming(1, { duration: 200 })
          );
          tipRotate.value = withSequence(
            withTiming(-8, { duration: 50 }),
            withRepeat(
              withTiming(8, { duration: 100 }),
              6,
              true
            ),
            withTiming(0, { duration: 200 })
          );
          runOnJS(logValue)("每天一次机会");
        }
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

  const tipAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: tipScale.value },
      { rotate: `${tipRotate.value}deg` },
    ]
  }));

  const borderColorStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(borderColor.value, [0, 0.5, 1], ['red', 'orange', 'yellow']),
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={combinedGesture}>
      <Animated.View style={[styles.border, borderColorStyle]}>
      {/* <Text style={{fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',}} >恭喜抽中</Text> */}
        <Animated.View style={[animatedStyle]}>
          <Svg height={height* 0.08} width={width * 0.6}>
            <SvgText
              x={width * 0.3}
              y={height* 0.04}
              fontSize="20"
              fontWeight="bold"
              fill="black"
              textAnchor="middle"
            >
              {message}
            </SvgText>
          </Svg>
        </Animated.View>
        <Animated.View style={[tipAnimatedStyle]}>
        <Text style={{color: 'gray',
    fontSize: 10,
    textAlign: 'center',
    bottom: 2,}}>每天只能抽一次哦</Text>
    </Animated.View>
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
  border: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: 'white',
  },
});

export default Prize;

