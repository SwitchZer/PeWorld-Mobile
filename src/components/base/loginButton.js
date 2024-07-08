import * as React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';

const LoginButton = ({text}) => (
  <Pressable style={styles.loginButton}>
    <Text style={styles.loginButtonText}>{text}</Text>
  </Pressable>
);

function RecruiterLogin() {
  return (
    <View style={styles.container}>
      <LoginButton text="Masuk sebagai perekrut" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    borderRadius: 4,
    borderColor: 'rgba(255, 255, 255, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 17,
    minWidth: 200,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default RecruiterLogin;
