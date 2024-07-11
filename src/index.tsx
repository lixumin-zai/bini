import React, { useState } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import Heart from './heart';
import Prize from './prize';
import Cinnamoroll from './cinnamoroll';

const MyComponent = () => {
  // 控制主要页面
  const [showPage, setShowPage] = useState(1);
  // 主组件与图片展示组件交互
  const [showFixedImage, setShowFixedImage] = useState(0);

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

  return (
    <View style={styles.container}>
      <View 
        style={styles.coreContainer} 
      >
        {showPage === 1 && <Heart onThresholdReached={handleThresholdReached} onhandlePan={handlePan}/>}
        {showPage === 2 && <Prize onGoBack={handleGoBack} onhandlePan={handlePan}/>}
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
    position: 'relative',
  },
  coreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  cinnamoroll: {
    width: 250, 
    height: 200,
    position: 'absolute',
    bottom: 0,  
    alignSelf: 'center',  
    zIndex: 1,
    // borderColor: 'red',
    // borderWidth: 10, // 你可以根据需要调整边框的宽度
},

});

export default MyComponent;

