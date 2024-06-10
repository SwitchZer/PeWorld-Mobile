import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Button = ({text, style}) => (
  <View style={[styles.authButton, style]}>
    <Text>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  authButton: {
    alignItems: 'center',
  },
});

export default Button;
