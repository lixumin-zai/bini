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
}
const Gift: React.FC<GiftProps> = ({ onThresholdReached, onhandlePan }) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const MAX_DISTANCE = Math.sqrt(centerX * centerX + centerY * centerY);
    const yTHRESHOLD = height * 0.1; // 屏幕下方的1/10
    const xTHRESHOLD = width * 0.3; // width * (1-0.3)

    const scale = useSharedValue(1);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);
    const clickCount = useSharedValue(0);
    const [count, setCount] = useState(0);
    const opacity = useSharedValue(1);
    const rotation = useSharedValue(0);
  
    const handlePress = () => {
      clickCount.value += 1;
      setCount(clickCount.value);
      if (clickCount.value >= 5) {
        runOnJS(onThresholdReached)();
      }
    };

    const handleTimeOut = () => {
      setTimeout(() => {
        runOnJS(onhandlePan)(2);
        setTimeout(() => {
          runOnJS(onhandlePan)(0);
        }, 2000);
      }, 0)
    }

    useEffect(() => {
      const interval = setInterval(() => {
        runOnJS(() => {
          clickCount.value = Math.max(clickCount.value - 1, 0);
          setCount(clickCount.value);
        })();
      }, 1000);
  
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
        startX.value = offsetX.value;
        startY.value = offsetY.value;
      })
      .onTouchesMove((event) => {
        rotation.value = 20;
        runOnJS(shakeAnimation)();
      })
      .onUpdate((event) => {
        runOnJS(onhandlePan)(1);
        const newScale = 1 - event.translationY / (centerY * 2);
        scale.value = newScale;
        offsetX.value = startX.value + event.translationX / newScale;
        offsetY.value = startY.value + event.translationY / newScale;
        const distance = Math.sqrt(
          Math.pow(offsetX.value - centerX, 2) + Math.pow(offsetY.value - centerY, 2)
        );
        opacity.value = Math.min(1, distance / MAX_DISTANCE);
      })
      .onEnd(() => {
        const centerXCurrent = offsetX.value + width / 2;
        const centerYCurrent = offsetY.value + height / 2;
        if (centerYCurrent > height - yTHRESHOLD && centerXCurrent > xTHRESHOLD && centerXCurrent < width - xTHRESHOLD) {
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
                    <Svg
                        height="50px"
                        width="50px"
                        viewBox="0 0 75.669 75.669"
                    >
                        <Path
                            d="M15.089 56.691l-3.845-3.363c.241-.29 24.089-29.568 24.089-51.568h5c0 10-4.269 22.591-12.687 36.697-6.193 10.382-12.299 17.926-12.557 18.234z"
                            fill="#985123"
                        />
                        <Path
                            d="M60.578 56.691c-.258-.309-6.363-7.853-12.558-18.234C39.602 24.351 35.334 11.76 35.334 1.76h5c0 22 23.848 51.279 24.089 51.568l-3.845 3.363z"
                            fill="#985123"
                        />
                        <Path
                            d="M37.945 1.781S31.144 25.062 7.93 21.53c0-.001 6.553-22.743 30.015-19.749z"
                            fill="#56b300"
                        />
                        <Path
                            d="M68.125 45.145c-8.333-.794-9.186 6.745-9.186 6.745l.312.526-.091-.562s-3.653-6.812-11.312-3.434-5.12 16.524 3.361 22.645c7.127 5.145 15.626 3.771 20.771-3.356 6.121-8.48 4.479-21.769-3.855-22.564zM7.543 45.145c8.333-.794 9.186 6.745 9.186 6.745l-.311.526.091-.562s3.653-6.812 11.312-3.434 5.12 16.524-3.361 22.645c-7.127 5.145-15.626 3.771-20.771-3.356-6.123-8.48-4.48-21.769 3.854-22.564z"
                            fill="#ff4a44"
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

export default Gift;
