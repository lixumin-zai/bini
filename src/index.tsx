import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Heart from './heart';
import NewScreen from './screen';
import Sanrio from './sanrio'

const MyComponent = () => {
  const [showNewScreen, setShowNewScreen] = useState(false);

  const handleThresholdReached = () => {
    setShowNewScreen(true);
  };

  const handleGoBack = () => {
    setShowNewScreen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.coreContainer}>
        {showNewScreen ? (
          <NewScreen onGoBack={handleGoBack} />
        ) : (
          <Heart onThresholdReached={handleThresholdReached} />
        )}
      </View>
      <Sanrio width={250} height={250} style={styles.sanrio} />
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
  sanrio: {
    position: 'absolute',
    bottom: -50,  // 调整负值来减少底部空白
    alignSelf: 'center',  // 确保 Sanrio 组件水平居中
    zIndex: 1,
  },
});

export default MyComponent;

