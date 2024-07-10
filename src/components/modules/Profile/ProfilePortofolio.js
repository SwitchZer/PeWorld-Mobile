import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ProfilePortofolio = () => {
  const [portfolio, setPortfolio] = React.useState({
    application_name: '',
    link_repository: '',
    application: '',
    image: '',
  });

  // if (
  //   !portfolio.application_name ||
  //   !portfolio.link_repository ||
  //   !portfolio.application
  // ) {
  //   Alert.alert('Please fill out all the required fields.');
  //   return;
  // }

  const handleAddPortfolio = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      await axios.post(`${process.env.API_URL}/portofolio`, portfolio, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert('Success Add Portfolio');
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        Alert.alert('Error Adding Portfolio', error.response.data.message);
      } else if (error.request) {
        console.log(error.request);
        Alert.alert('Error Adding Portfolio', 'No response from the server');
      } else {
        console.log('Error', error.message);
        Alert.alert('Error Adding Portfolio', error.message);
      }
    }
  };

  const handleImageLibrary = async () => {
    try {
      const res = await launchCamera(null);
      if (res.didCancel) {
        return;
      }
      const data = res.assets[0];

      const formData = new FormData();

      const dataImage = {
        uri: data.uri,
        name: data.fileName,
        filename: data.fileName,
        type: data.type,
      };

      console.log(dataImage);

      formData.append('file', dataImage);

      const result = await axios.post(
        `${process.env.API_URL}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const image = result.data.data.file_url;
      setPortfolio({...portfolio, image: image});
      console.log(result.setPortfolio);
      Alert.alert('Success Add Photo');
    } catch (error) {
      console.log('Error response:', error.response);
      console.log('Error data:', error.response.data);
      console.log('Error status:', error.response.status);
      console.log('Error headers:', error.response.headers);
      Alert.alert('Error adding photo:', error.message);
    }
  };

  return (
    <View style={styles.containerEdit}>
      <Text style={{fontWeight: 'bold', fontSize: 30, color: 'black'}}>
        Portofolio
      </Text>
      <Text style={styles.label}>Application Name</Text>
      <TextInput
        label="Application Name"
        style={styles.input}
        value={portfolio.application_name}
        onChangeText={value =>
          setPortfolio({...portfolio, application_name: value})
        }
        placeholder="Application Name"
      />
      <Text style={styles.label}>Link Repository</Text>
      <TextInput
        label="Link Repository"
        style={styles.input}
        value={portfolio.link_repository}
        onChangeText={value =>
          setPortfolio({...portfolio, link_repository: value})
        }
        placeholder="Link GitHub"
      />
      <Text style={styles.label}>Type Application</Text>
      <TextInput
        label="Application"
        style={styles.input}
        value={portfolio.application}
        onChangeText={value => setPortfolio({...portfolio, application: value})}
        placeholder="Application"
      />
      <Text
        style={{
          fontSize: 12,
          color: '#9EA0A5',
          paddingLeft: 5,
          marginBottom: 5,
        }}>
        Upload gambar
      </Text>
      <TouchableOpacity
        onPress={handleImageLibrary}
        style={{
          padding: 30,
          alignItems: 'center',
          gap: 20,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: '#9EA0A5',
        }}>
        <>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 12,
                color: '#1F2A36',
                paddingLeft: 5,
                marginBottom: 5,
              }}>
              Upload file dari penyimpanan
            </Text>
          </View>
          <View style={{alignItems: 'center', gap: 10}}>
            <Text
              style={{
                fontSize: 12,
                color: '#1F2A36',
                paddingLeft: 5,
                marginBottom: 5,
              }}>
              High-Res Image PNG, JPG or GIF
            </Text>
          </View>
          <View style={{alignItems: 'center', gap: 10}}>
            <Text
              style={{
                fontSize: 12,
                color: '#1F2A36',
                paddingLeft: 5,
                marginBottom: 5,
              }}>
              Size 1080x1920 or 600x800
            </Text>
          </View>
        </>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.formContainer}
        onPress={handleAddPortfolio}>
        <Text style={styles.formTitle}>Add Portofolio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    borderRadius: 4,
    borderColor: 'rgba(251, 176, 23, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 40,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 17,
  },
  formTitle: {
    color: '#FBB017',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'Open Sans',
    textAlign: 'center',
  },
  containerEdit: {
    borderRadius: 8,
    backgroundColor: '#FFF',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    fontSize: 14,
    color: '#9EA0A5',
    fontWeight: '400',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
  },
  label: {
    marginTop: 25,
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

export default ProfilePortofolio;
