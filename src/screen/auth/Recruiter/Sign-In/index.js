/* eslint-disable prettier/prettier */
import * as React from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Input from '../../../../components/base/Input';

const SignIn = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          resizeMode="auto"
          source={require('../../../../assets/128827b10cad548eeca4d2034ad800bcf427d6288941b931ce87f2c87377e50a.png')}
          style={styles.logo}
        />
        <Text style={styles.loginTitle}>Login</Text>
        <Text style={styles.description}>
          Lorom ipsum dolor si amet uegas anet.
        </Text>
        <Input label="Email" placeholder="Masukan alamat email" />
        <Input
          label="Kata Sandi"
          placeholder="Masukan kata sandi"
          secureTextEntry={true}
        />
        <Text style={styles.forgotPassword}>Lupa kata sandi?</Text>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Masuk</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Anda belum punya akun?{' '}
          <Text style={styles.registerLink}>Daftar disini</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F7F8',
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 16,
  },
  logo: {
    width: 86,
    aspectRatio: 3.57,
  },
  loginTitle: {
    marginTop: 45,
    fontSize: 32,
    fontWeight: '700',
    color: '#46505C',
  },
  description: {
    marginTop: 13,
    fontSize: 14,
    color: '#858D96',
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 28,
    fontSize: 14,
    color: '#1F2A36',
  },
  loginButton: {
    borderRadius: 4,
    backgroundColor: '#FBB017',
    marginTop: 28,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  registerText: {
    marginTop: 32,
    fontSize: 14,
    color: '#1F2A36',
  },
  registerLink: {
    color: '#FBB017',
  },
});

export default SignIn;
