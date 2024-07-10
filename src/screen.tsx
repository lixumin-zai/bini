import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// 导入JSON文件
const messages = require('./public/massage.json');

interface NewScreenProps {
  onGoBack: () => void;
}

const NewScreen: React.FC<NewScreenProps> = ({ onGoBack }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 随机选择一条消息
    const randomIndex = Math.floor(Math.random() * messages.messages.length);
    setMessage(messages.messages[randomIndex]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Button title="Go Back" onPress={onGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default NewScreen;
