// 这是一个类组件
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
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

interface TitleProps {
}

const Title: React.FC<TitleProps> = () => {
    const [text, setText] = useState('有彩蛋哦');
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);
    const changeText = () => {
        setText((prevText) => (prevText === '有彩蛋哦' ? '爱心可以跳动' : '有彩蛋哦'));
    };

    useEffect(() => {
        // const changeText = () => {
        //     if (text === '有彩蛋哦') {
        //         setText('爱心可以跳动');
        //     } else {
        //         setText('有彩蛋哦');
        //     }
        // };
        scale.value = withRepeat(
            withTiming(0.9, { duration: 2000 }),
            -1,
            true,
        );
        opacity.value = withRepeat(
            withTiming(0, { duration: 2000 }),
            -1,
            true,
            );
    }, []);
  
    const animatedStyle = useAnimatedStyle(() => {
        if (opacity.value === 0) {
            runOnJS(changeText)();
        }
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        };
    });

    return (
        <Animated.View style={animatedStyle}>
            <Text style={{top: 100, fontSize: 20, fontWeight: 'bold'}}>{text}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Title;
