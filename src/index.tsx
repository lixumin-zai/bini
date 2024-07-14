import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import Heart from './heart';
import Prize from './prize';
import Cinnamoroll from './cinnamoroll';
import Gift from './gift';
import Edictor from './edictScreen';
import { mao, erji, yingtao, yinfu } from './giftObject';

const MyComponent = () => {
  // 控制主要页面
  const [showPage, setShowPage] = useState(1);
  // 主组件与图片展示组件交互
  const [showFixedImage, setShowFixedImage] = useState(0);

  const [componentSize, setComponentSize] = useState({ width: 0, height: 0 });

    const handleLayout = (event:any) => {
        const { width, height } = event.nativeEvent.layout;
        setComponentSize({ width, height });
    };

  const handleThresholdReached = () => {
    setShowPage(2);
  };

  const handleGoBack = () => {
    setShowFixedImage(0);
    setShowPage(1);
  };

  const handlePan = (image_id: number) => {
    // 0 轮询 其他固定
    setShowFixedImage(image_id);
  };

  const handleloveReached = () => {
    // 0 轮询 其他固定
    setShowPage(3);
  };
  

  return (
    <View style={styles.container}>
      <View style={{position: 'absolute',top: 60, left: 80, zIndex: 2}}>
        <Gift onThresholdReached={handleThresholdReached} onhandlePan={handlePan} X={80} Y={60} svgPath={yingtao} imageIndex={3}></Gift>
      </View>
      <View style={{position: 'absolute',top: 120, right: 60, zIndex: 2,borderWidth: 0,borderColor: 'red'}}>
        <Gift onThresholdReached={handleThresholdReached} onhandlePan={handlePan} X={-110} Y={120} svgPath={yinfu} imageIndex={4}></Gift>
      </View>
      <View style={{position: 'absolute',top: 220, left: 20, zIndex: 2,borderWidth: 0,borderColor: 'red'}}>
        <Gift onThresholdReached={handleThresholdReached} onhandlePan={handlePan} X={20} Y={220} svgPath={erji} imageIndex={5}></Gift>
      </View>
      <View style={{position: 'absolute',top: 300, right: 10, zIndex: 2,borderWidth: 0,borderColor: 'red'}}>
        <Gift onThresholdReached={handleThresholdReached} onhandlePan={handlePan} X={-60} Y={300} svgPath={mao} imageIndex={6}></Gift>
      </View>
      {/* <View style={{position: 'absolute',top: 100, left: 200, zIndex: 2,borderWidth: 0,borderColor: 'red'}}>
        <Gift onThresholdReached={handleThresholdReached} onhandlePan={handlePan} X={100} Y={100} svgPath={yitao} imageIndex={2}></Gift>
      </View> */}
      <View style={[styles.coreContainer,{transform: [{ translateX: -componentSize.width / 2 },{ translateY: -componentSize.height / 2 },],},]}onLayout={handleLayout} >
        {showPage === 1 && <Heart onThresholdReached={handleThresholdReached} onhandlePan={handlePan} onloveReached={handleloveReached}/>}
        {showPage === 2 && <Prize onGoBack={handleGoBack} onhandlePan={handlePan}/>}
        {showPage === 3 && <Edictor onGoBack={handleGoBack} onhandlePan={handlePan}/>}
      </View>
      <Cinnamoroll showFixedImage={showFixedImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coreContainer: {
    zIndex: 2,
    borderColor: 'red',
    borderWidth: 0, // 你可以根据需要调整边框的宽度
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  cinnamoroll: {
    width: 250, 
    height: 200,
    position: 'absolute',
    bottom: 0,  
    alignSelf: 'center',  
    zIndex: 1,
},

});

export default MyComponent;

