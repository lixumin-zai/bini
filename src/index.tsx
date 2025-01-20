import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text} from 'react-native';
import Heart from './heart';
import Prize from './prize';
import Cinnamoroll from './cinnamoroll';
import Gift from './gift';
import Edictor from './edictScreen';
import { mao, erji, yingtao, yinfu } from './giftObject';
import Title from './title';
import Letter from './letter';

const MyComponent = () => {
  // 控制主要页面
  const [showPage, setShowPage] = useState(1);
  // 主组件与图片展示组件交互
  const [showFixedImage, setShowFixedImage] = useState(0);

  const [componentSize, setComponentSize] = useState({ width: 0, height: 0 });

  const [showLetter, setShowLetter] = useState(0);

  const [prizeInfo, setPrizeInfo] = useState([]); // 记录使用情况
  const [letterInfo, setLetterInfo] = useState(""); // 记录使用情况


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
    fetchPrizeInfo();
    fetchLetterInfo();
  };

  const handlePan = (image_id: number) => {
    // 0 轮询 其他固定
    setShowFixedImage(image_id);
  };

  const handleloveReached = () => {
    // 0 轮询 其他固定
    setShowPage(3);
  };
  const onshowLatter = (isshow: number) => {
    // 0 轮询 其他固定
    setShowLetter(isshow);
  };
  const fetchPrizeInfo = async () => {
    try {
      const response = await fetch("https://lismin.online:8888/message");
      // const response = await fetch("http://192.168.1.206:20010/message");
      const data = await response.json();
      setPrizeInfo(data);
    } catch (error) {
      const data = require('./public/massage.json');
      setPrizeInfo(data);
      console.error('Error fetching message:', error);
    }
  };

  const fetchLetterInfo = async () => {
    try {
      const response = await fetch("https://lismin.online:8888/letter");
      // const response = await fetch("http://192.168.1.206:20010/message");
      const data = await response.json();
      setLetterInfo(data);
    } catch (error) {
      const data = require('./public/letter.json');
      setLetterInfo(data);
      console.error('Error fetching useInfo:', error);
    }
  };

  useEffect(() => {
    fetchPrizeInfo();
    fetchLetterInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{position: 'absolute',top: 240, left: 60, zIndex: 2}}>
        <Gift onThresholdReached={handleThresholdReached} onhandlePan={handlePan} X={60} Y={240} svgPath={yingtao} imageIndex={3}></Gift>
      </View>
      <View style={{position: 'absolute',top: 270, right: 60, zIndex: 2,borderWidth: 0,borderColor: 'red'}}>
        <Gift onThresholdReached={handleThresholdReached} onhandlePan={handlePan} X={-110} Y={270} svgPath={yinfu} imageIndex={4}></Gift>
      </View>
      <View style={{position: 'absolute',top: 420, left: 10, zIndex: 2,borderWidth: 0,borderColor: 'red'}}>
        <Gift onThresholdReached={handleThresholdReached} onhandlePan={handlePan} X={10} Y={420} svgPath={erji} imageIndex={5}></Gift>
      </View>
      <View style={{position: 'absolute',top: 460, right: 10, zIndex: 2,borderWidth: 0,borderColor: 'red'}}>
        <Gift onThresholdReached={handleThresholdReached} onhandlePan={handlePan} X={-60} Y={460} svgPath={mao} imageIndex={6}></Gift>
      </View>
      <Title></Title>
      <View style={[styles.coreContainer,{transform: [{ translateX: -componentSize.width / 2 },{ translateY: -componentSize.height / 2 },],},]}onLayout={handleLayout} >
        {showPage === 1 && <Heart onThresholdReached={handleThresholdReached} onhandlePan={handlePan} onloveReached={handleloveReached}/>}
        {showPage === 2 && <Prize onGoBack={handleGoBack} onhandlePan={handlePan} prizeInfo={prizeInfo}/>}
        {showPage === 3 && <Edictor onGoBack={handleGoBack} onhandlePan={handlePan} onshowLatter={onshowLatter}/>}
      </View>
      <View style={[styles.cinnamorollContainer]}>
      <Cinnamoroll showFixedImage={showFixedImage} />
      </View>
      <View style={styles.letterContainer}>
        {showLetter === 1 && <Letter onshowLatter={onshowLatter} letter={letterInfo}></Letter>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
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
  cinnamorollContainer: {
    width: 250, 
    height: 200,
    position: 'absolute',
    bottom: 0,  
    alignSelf: 'center',  
    zIndex: 1,
  },
  letterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default MyComponent;

