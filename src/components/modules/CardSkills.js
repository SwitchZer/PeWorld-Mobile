/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CardSkill = ({skillname, style, ...props}) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <Text style={{color: '#fff', fontWeight: '800'}}>{skillname}</Text>
    </View>
  );
};

export default CardSkill;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBB017',
    alignSelf: 'flex-start',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
});
