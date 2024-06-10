/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Input from '../../../../components/base/Input';

const SignUp = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            resizeMode="auto"
            source={require('../../../../assets/128827b10cad548eeca4d2034ad800bcf427d6288941b931ce87f2c87377e50a.png')}
            style={styles.logo}
          />
          <Text style={styles.loginTitle}>SignUp</Text>
          <Text style={styles.description}>
            Start Your Journey By Making Your Account.
          </Text>
          <Input label="Name" placeholder="Name" />
          <Input label="Email" placeholder="Email" />
          <Input label="Company" placeholder="Company" />
          <Input label="Position" placeholder="Position" />
          <Input label="No Handphone" placeholder="No Handphone" />
          <Input
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
          />
          <Input
            label="Confirmation Password"
            placeholder="Confirmation Password"
            secureTextEntry={true}
          />
          <View style={styles.forgotPassword} />
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.registerText}>
            Already Have Account?{' '}
            <Text style={styles.registerLink}>Sign In Here</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F7F8',
    flex: 1,
    justifyContent: 'center',
    marginVertical: 40,
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

export default SignUp;
