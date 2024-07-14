// 这是一个类组件
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withRepeat,
    Easing,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface GiftProps {
    onThresholdReached: () => void;
    onhandlePan: (image_id: number) => void;
    X: number;
    Y: number;
    svgPath: React.ReactNode;
    imageIndex: number;
}
const logValue = (value: any) => {
  console.log('startX.value:', value);
};

const Gift: React.FC<GiftProps> = ({ onThresholdReached, onhandlePan, X, Y, svgPath, imageIndex }) => {
    const centerX = (width+X)%width + 25; // 默认大小50 50 X， Y为绝对路径 所以中心点为+25
    const centerY = (height+Y)%height + 25;
    const MAX_DISTANCE = (height-centerY);
    const yTHRESHOLD = height * 0.2; // 屏幕下方的1/10
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
  
    const handlePress = () => {
      clickCount.value += 1;
      setCount(clickCount.value);
      if (clickCount.value >= 5) {
        runOnJS(onThresholdReached)();
      }
    };

    const handleTimeOut = () => {
      setTimeout(() => {
        runOnJS(onhandlePan)(imageIndex);
        setTimeout(() => {
          runOnJS(onhandlePan)(0);
        }, 3000);
      }, 0)
    }

    useEffect(() => {
      const interval = setInterval(() => {
        runOnJS(() => {
          clickCount.value = Math.max(clickCount.value - 1, 0);
          setCount(clickCount.value);
        })();
      }, 1000);
      rotation.value = 15;
      runOnJS(shakeAnimation)();
      return () => clearInterval(interval);
    }, []);
  
    const shakeAnimation = () => {
      rotation.value = withRepeat(
        withTiming(-15, { duration: 500 }),
        -1,
        true
      );
    };
  
    const dragGesture = Gesture.Pan()
      .onBegin(() => {
        rotation.value = 20;
        runOnJS(shakeAnimation)();
        startX.value = centerX;
        startY.value = centerY;
        
      })
      .onTouchesMove((event) => {
        rotation.value = 20;
        runOnJS(shakeAnimation)();
      })
      .onUpdate((event) => {
        runOnJS(onhandlePan)(1);
        const newScale = 1 - (event.translationY / height);
        centerXCurrent.value = event.translationX + centerX;
        centerYCurrent.value = event.translationY + centerY;
        offsetX.value = event.translationX / newScale;
        offsetY.value = event.translationY / newScale;

        scale.value = newScale;
        const distance = Math.sqrt(
          Math.pow(offsetX.value - centerX, 2) + Math.pow(offsetY.value - centerY, 2)
        );
        opacity.value = Math.min(1, distance-100 / height);
      })
      .onEnd(() => {
        if (centerYCurrent.value > height - yTHRESHOLD && centerXCurrent.value > xTHRESHOLD && centerXCurrent.value < width - xTHRESHOLD) {
          runOnJS(handleTimeOut)();
        }else{
          runOnJS(onhandlePan)(0);
        }
        rotation.value = withSpring(0);
        runOnJS(onhandlePan)(0);
        offsetX.value = withSpring(0);
        offsetY.value = withSpring(0);
        opacity.value = withSpring(1);
        scale.value = withSpring(1);
        rotation.value = 15;
        runOnJS(shakeAnimation)();
      });
  
    const combinedGesture = Gesture.Simultaneous(dragGesture);
  
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: scale.value },
        { translateX: offsetX.value },
        { translateY: offsetY.value },
        { rotate: `${rotation.value}deg` },
      ],
      opacity: opacity.value,
    }));

    return (
        <GestureHandlerRootView style={[styles.container,]}>
            <GestureDetector gesture={combinedGesture}>
                <Animated.View style={animatedStyle}>
                  {svgPath}
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

export default Gift;
