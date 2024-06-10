/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const Input = ({label, placeholder, secureTextEntry}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  label: {
    fontSize: 12,
    color: '#9EA0A5',
  },
  input: {
    borderRadius: 4,
    borderColor: 'rgba(226, 229, 237, 1)',
    borderWidth: 1,
    backgroundColor: '#FFF',
    marginTop: 7,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
  },
});
