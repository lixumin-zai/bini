import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Heart from './heart';
import NewScreen from './screen';

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
      {showNewScreen ? (
        <NewScreen onGoBack={handleGoBack} />
      ) : (
        <Heart onThresholdReached={handleThresholdReached} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,  // 添加边框
    borderColor: 'blue',  // 设置边框颜色
  },
  text: {
    textAlign: 'center',
    color: 'green',
    borderWidth: 1,  // 添加边框
    borderColor: 'red',  // 设置边框颜色
  },
});

export default MyComponent;
