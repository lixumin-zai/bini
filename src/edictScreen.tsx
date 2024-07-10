import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import messages from './public/massage.json'; // 导入现有的 JSON 文件

const EditScreen = ({ onGoBack }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleAddMessage = () => {
    if (newMessage.trim() !== '') {
      messages.messages.push(newMessage.trim());
      setNewMessage('');
      alert('Message added!');
    } else {
      alert('Please enter a message.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a new message</Text>
      <TextInput
        style={styles.input}
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Enter new message"
      />
      <Button title="Add Message" onPress={handleAddMessage} />
      <Button title="Go Back" onPress={onGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default EditScreen;
