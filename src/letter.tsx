import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Button, Dimensions, ScrollView, ImageBackground } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withRepeat,
    interpolateColor,
    runOnJS,
    Easing,
    withTiming
  } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface LetterProps {
    onshowLatter: (isshow: number) => void;
    letter: any;
}

// const letter = require('./public/letter.json');

const Letter: React.FC<LetterProps> = ({onshowLatter, letter}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTextComplete, setIsTextComplete] = useState(false);
    const fullText = letter.letter;
    const borderColor = useSharedValue(0);
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(fullText.substring(0, currentIndex + 1));
            currentIndex++;
            if (currentIndex === fullText.length) {
                setTimeout(() => {
                    clearInterval(intervalId);
                    setIsTextComplete(true); // 文本显示完成后设置状态
                }, 500); // 50毫秒延迟，以确保文本更新后滚动
            }
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100); // 每个字符出现的间隔时间，可以根据需要调整

        return () => clearInterval(intervalId);
    }, []);
    useEffect(() => {
        borderColor.value = withRepeat(
          withTiming(1, {
            duration: 500,
            easing: Easing.linear,
          }),
          -1,
          true
        );
      }, []);
    const goback = () => {
        // 0 轮询 其他固定
        onshowLatter(0);
      };
    const noprocess = () => {
    };

    const borderColorStyle = useAnimatedStyle(() => ({
        borderColor: interpolateColor(borderColor.value, [0, 0.5, 1], ['red', 'orange', 'yellow']),
    }));

    return (
            <Animated.View style={[styles.container, borderColorStyle]}>
                <ImageBackground source={require('./public/background.jpeg')} style={[styles.Background]} imageStyle={styles.backgroundImage}>

                <ScrollView style={styles.textContainer} ref={scrollViewRef}>
                    <Text style={styles.text}>{displayedText}</Text>
                </ScrollView>
                
                <View style={styles.buttonContainer}>
                    {!isTextComplete && <Button title="" onPress={noprocess} />}
                    {isTextComplete && (<Button title="Go Back" onPress={goback} />)}
                </View>
                </ImageBackground>
                
            </Animated.View>
        
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        resizeMode: 'contain',
        opacity: 0.3, // 调整图片的透明度
    },
    Background: {
        position: 'relative',
        height: "100%", // 占据屏幕的90%高度
        width: "100%",
        // backgroundColor: '#FFFFFC', // 背景填充白色
        // // alignItems: 'center',
        // // justifyContent: 'center',
        // borderWidth: 2,
        // borderRadius: 10,
        // padding: 10,
    },
    container: {
        // flex: 1,
        position: 'relative',
        height: height * 0.8, // 占据屏幕的90%高度
        width: width * 0.85,
        backgroundColor: '#FFFFFC', // 背景填充白色
        // alignItems: 'center',
        // justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 10, // 添加水平内边距
        // paddingVertical: 10, // 添加垂直内边距
        // justifyContent: 'center',
    },
    text: {
        fontSize: 18, // 可以根据需要调整文字大小
        textAlign: 'left', // 左对齐
        lineHeight: 28, // 调整行高以增加可读性
        fontWeight: 'bold', // 加粗字体
    },
    buttonContainer: {
        paddingBottom: 5, // 确保按钮有一定的底部间距
    },
});

export default Letter;
