import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import CinnamorollSvg from "./cinnamoroll_svg";

interface CinnamorollProps {
    showFixedImage: number;
  }

const { width: screenWidth } = Dimensions.get('window');

const images = [
  { source: require('./public/1.png') },
  { source: require('./public/2.png') },
  { source: require('./public/3.png') },
];

const polling_images = [
    { source: require('./public/1.png') },
    { source: require('./public/2.png') },
  ];

const Cinnamoroll: React.FC<CinnamorollProps> = ({ showFixedImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useSharedValue(1);
  

  useEffect(() => {
    const interval = setInterval(() => {
        if (!showFixedImage) {
            fadeAnim.value = withTiming(
                0,
                {
                duration: 1000,
                easing: Easing.linear,
                },
                (isFinished) => {
                if (isFinished) {
                    runOnJS(updateIndex)();
                    fadeAnim.value = withTiming(1, {
                    duration: 1000,
                    easing: Easing.linear,
                    });
                }
                }
            );
            }}, 3000);

    return () => clearInterval(interval);
  }, []);

  const updateIndex = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % polling_images.length);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

  return (
    <View style={styles.container} >
        {showFixedImage === 0 && 
        <Animated.View style={[styles.imageContainer, animatedStyle]}>
            {polling_images[currentIndex] && (
            <Image source={polling_images[currentIndex].source} style={styles.image} />
            )}
        </Animated.View>}
        {showFixedImage === 1 && 
            <View style={styles.imageContainer}>
            <CinnamorollSvg />
            </View>
        }
        {showFixedImage >= 2 && 
            <Animated.View style={[styles.imageContainer, animatedStyle]}>
                {images[showFixedImage] && (
                <Image source={images[showFixedImage].source} style={styles.image} />
                )}
            </Animated.View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
    width: screenWidth,
    height: 200,
    bottom: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  image: {
    width: screenWidth,
    height: 200,
  },
  cinnamorollSvg: {
    width: 250,
    height: 250,
    zIndex: 1,
  },
});

export default Cinnamoroll;
