import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export const yitao = (
<Svg height="50px" width="50px" viewBox="0 0 75.669 75.669">
    <Path
    d="M15.089 56.691l-3.845-3.363c.241-.29 24.089-29.568 24.089-51.568h5c0 10-4.269 22.591-12.687 36.697-6.193 10.382-12.299 17.926-12.557 18.234z"
    fill="#985123"
    />
    <Path
    d="M60.578 56.691c-.258-.309-6.363-7.853-12.558-18.234C39.602 24.351 35.334 11.76 35.334 1.76h5c0 22 23.848 51.279 24.089 51.568l-3.845 3.363z"
    fill="#985123"
    />
    <Path
    d="M37.945 1.781S31.144 25.062 7.93 21.53c0-.001 6.553-22.743 30.015-19.749z"
    fill="#56b300"
    />
    <Path
    d="M68.125 45.145c-8.333-.794-9.186 6.745-9.186 6.745l.312.526-.091-.562s-3.653-6.812-11.312-3.434-5.12 16.524 3.361 22.645c7.127 5.145 15.626 3.771 20.771-3.356 6.121-8.48 4.479-21.769-3.855-22.564zM7.543 45.145c8.333-.794 9.186 6.745 9.186 6.745l-.311.526.091-.562s3.653-6.812 11.312-3.434 5.12 16.524-3.361 22.645c-7.127 5.145-15.626 3.771-20.771-3.356-6.123-8.48-4.48-21.769 3.854-22.564z"
    fill="#ff4a44"
    />
</Svg>
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 50,
      height: 50,
    },
  });

export const yinfu = (
    <Image source={require('./public/gift/音符_with_alpha.png') } style={styles.image}/>
);


export const yingtao = (
    <Image source={require('./public/gift/樱桃_with_alpha.png') } style={styles.image}/>
);
export const erji = (
    <Image source={require('./public/gift/耳机_with_alpha.png') } style={styles.image}/>
);
export const mao = (
    <Image source={require('./public/gift/小猫_with_alpha.png') } style={styles.image}/>
);

