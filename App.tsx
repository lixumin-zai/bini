/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { View } from 'react-native';
import MyComponent from './src/index'; // 确保路径正确

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <MyComponent />
    </View>
  );
};

export default App;