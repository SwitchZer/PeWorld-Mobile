import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    borderColor: '#FFF',
    borderWidth: 1,
    backgroundColor: '#FFF',
    flex: 1,
    height: 1,
  },
});

export default Divider;
