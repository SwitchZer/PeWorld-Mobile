/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Input from '../../../../components/base/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../../configs/redux/action/authAction';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(loginUser(form));
    navigation.navigate('MainTab');
  };

  const handleNavigate = () => {
    navigation.navigate('SignUpRecruiter');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            resizeMode="auto"
            source={require('../../../../assets/128827b10cad548eeca4d2034ad800bcf427d6288941b931ce87f2c87377e50a.png')}
            style={styles.logo}
          />
          <Text style={styles.loginTitle}>SignIn</Text>
          <Text style={styles.description}>Sign In to Start Your Journey.</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              label="Email"
              style={styles.input}
              value={form.email}
              onChangeText={value => setForm({...form, email: value})}
              placeholder="Email"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              label="Password"
              style={styles.input}
              value={form.password}
              onChangeText={value => setForm({...form, password: value})}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
          <Text style={styles.forgotPassword}>Forgot Your Password?</Text>
          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
          <Text style={styles.registerText}>
            You don't have an account yet?{' '}
            <Text style={styles.registerLink} onPress={handleNavigate}>
              Sign Up Here
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
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

export default SignIn;
