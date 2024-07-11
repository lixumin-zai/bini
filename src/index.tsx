import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Heart from './heart';
import Prize from './prize';
import Cinnamoroll from './cinnamoroll';

const MyComponent = () => {
  const [showPage, setShowPage] = useState(1);

  const handleThresholdReached = () => {
    setShowPage(2);
  };

  const handleGoBack = () => {
    setShowPage(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.coreContainer}>
        {showPage === 1 && <Heart onThresholdReached={handleThresholdReached} />}
        {showPage === 2 && <Prize onGoBack={handleGoBack} />}
      </View>
      <Cinnamoroll width={250} height={250} style={styles.cinnamoroll} />
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
    position: 'absolute',
    bottom: -50,  
    alignSelf: 'center',  
    zIndex: 1,
  },
});

export default MyComponent;

