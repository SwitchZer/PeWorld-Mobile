/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import Input from '../../../../components/base/Input';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      Alert.alert('Please fill out all the required fields.');
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.API_URL}/workers/register`,
        form,
      );
      navigation.navigate('SignInWorker');
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log('Error response:', error.response.data);
        Alert.alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.log('Error request:', error.request);
        Alert.alert('Error: No response received from the server');
      } else {
        console.log('Error:', error.message);
        Alert.alert('An unexpected error occurred. Please try again later.');
      }
      throw error;
    }
  };

  const handleNavigate = () => {
    navigation.navigate('SignInWorker');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
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
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                label="Name"
                style={styles.input}
                value={form.name}
                onChangeText={value => setForm({...form, name: value})}
                placeholder="Name"
              />
            </View>
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
              <Text style={styles.label}>No Handphone</Text>
              <TextInput
                label="No Handphone"
                style={styles.input}
                value={form.phone}
                onChangeText={value => setForm({...form, phone: value})}
                placeholder="No Handphone"
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
            {/* <Input
            label="Confirmation Password"
            placeholder="Confirmation Password"
            value={form.password}
            onChangeText={value => setForm({...form, password: value})}
            secureTextEntry={true}
          /> */}
            <View style={styles.forgotPassword} />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleRegister}>
              <Text style={styles.loginButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.registerText}>
              Already Have Account?{' '}
              <Text style={styles.registerLink} onPress={handleNavigate}>
                Sign In Here
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default SignUp;
