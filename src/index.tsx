import React, { useState } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import Heart from './heart';
import Prize from './prize';
import Cinnamoroll from './cinnamoroll';
import Gift from './gift';
import Edictor from './edictScreen';

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
      <View style={{position: 'absolute',top: 100, left: 150, zIndex: 2,borderWidth: 0,borderColor: 'red'}}>
        <Gift onThresholdReached={handleThresholdReached} onhandlePan={handlePan}></Gift>
      </View>
      <View style={[
                    styles.coreContainer,
                    {
                        transform: [
                            { translateX: -componentSize.width / 2 },
                            { translateY: -componentSize.height / 2 },
                        ],
                    },
                ]}
                onLayout={handleLayout} >
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

