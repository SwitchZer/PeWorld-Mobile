import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {getProfile} from '../../../configs/redux/action/recruiterAction';
import {useDispatch, useSelector} from 'react-redux';

const EditProfileRecruiter = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {profile, loading, error} = useSelector(state => state.profile);
  const [form, setForm] = React.useState({
    company: '',
    position: '',
    city: '',
    description: '',
    instagram: '',
    phone: '',
    linkedin: '',
  });

  const handleChageImageLibrary = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await launchImageLibrary(null);
      if (res.didCancel) {
        return;
      }
      const data = res.assets[0];
      const maxFileSize = 5 * 1024 * 1024;

      const mediaTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (data.fileSize > maxFileSize) {
        Alert.alert('File Too Large and Please Select File Under 5 MB');
        return;
      }

      if (!mediaTypes.includes(data.type)) {
        Alert.alert('Please Select Valid File PNG or JPEG');
        return;
      }

      const formData = new FormData();

      const dataImage = {
        uri: data.uri,
        name: data.fileName,
        filename: data.fileName,
        type: data.type,
      };

      formData.append('photo', dataImage);

      const result = await axios.put(
        `${process.env.API_URL}/recruiters/profile/photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(result.data);
      Alert.alert('Success Edit Photo');
    } catch (error) {
      console.log(error?.response.data);
    }
  };

  const handleChageImageCamera = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await launchCamera(null);
      if (res.didCancel) {
        return;
      }
      const data = res.assets[0];
      const maxFileSize = 5 * 1024 * 1024;

      const mediaTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (data.fileSize > maxFileSize) {
        Alert.alert('File Too Large and Please Select File Under 5 MB');
        return;
      }

      if (!mediaTypes.includes(data.type)) {
        Alert.alert('Please Select Valid File PNG or JPEG');
        return;
      }

      const formData = new FormData();

      const dataImage = {
        uri: data.uri,
        name: data.fileName,
        filename: data.fileName,
        type: data.type,
      };

      formData.append('photo', dataImage);

      const result = await axios.put(
        `${process.env.API_URL}/recruiters/profile/photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(result.data);
      Alert.alert('Success Edit Photo');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleEditProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put(
        `${process.env.API_URL}/recruiters/profile`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      navigation.navigate('Profile');
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

  const handleCancel = () => {
    navigation.navigate('RecruiterProfile');
  };

  useEffect(() => {
    if (profile) {
      setForm({
        company: profile.company || '',
        position: profile.position || '',
        city: profile.city || '',
        description: profile.description || '',
        instagram: profile.instagram || '',
        phone: profile.phone || '',
        linkedin: profile.linkedin || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={
            profile.photo
              ? {uri: profile.photo}
              : require('../../../assets/default-image.png')
          }
          resizeMode="auto"
          style={styles.profileImage}
        />
        <Text style={{textAlign: 'center'}}>Edit Photo</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity onPress={handleChageImageLibrary}>
            <Text style={{fontWeight: 600, fontSize: 22, color: '#9EA0A5'}}>
              Gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChageImageCamera}>
            <Text style={{fontWeight: 600, fontSize: 22, color: '#9EA0A5'}}>
              Camera
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.nameWrapper}>
          <Text style={{fontWeight: 'bold', fontSize: 30, color: 'black'}}>
            {profile.company}
          </Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text>{profile.position || '-'}</Text>
        </View>
        <View style={styles.locationWrapper}>
          {/* <Image
          resizeMode="auto"
          source={{
            uri: '',
          }}
          style={styles.locationIcon}
        /> */}
          <View style={styles.locationText}>
            <Text>{profile.city || '-'}</Text>
          </View>
        </View>
        <View style={styles.talentLabel}>
          <Text>{profile.description || '-'}</Text>
        </View>
      </View>
      <View style={styles.containerEdit}>
        <Text style={{fontWeight: 'bold', fontSize: 30, color: 'black'}}>
          Data Diri
        </Text>
        <Text style={styles.label}>Company Name</Text>
        <TextInput
          style={styles.input}
          value={form.company}
          onChangeText={value => setForm({...form, company: value})}
          placeholder="Company"
        />
        <Text style={styles.label}>Position</Text>
        <TextInput
          style={styles.input}
          value={form.position}
          onChangeText={value => setForm({...form, position: value})}
          placeholder="Position"
        />
        <Text style={styles.label}>Domicile</Text>
        <TextInput
          style={styles.input}
          value={form.city}
          onChangeText={value => setForm({...form, city: value})}
          placeholder="Domicile"
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={styles.input}
          value={form.description}
          onChangeText={value => setForm({...form, description: value})}
          placeholder="Description"
        />
        <Text style={styles.label}>Instagram</Text>
        <TextInput
          style={styles.input}
          value={form.instagram}
          onChangeText={value => setForm({...form, instagram: value})}
          placeholder="Work Place"
        />
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={form.phone}
          onChangeText={value => setForm({...form, phone: value})}
          placeholder="Work Place"
        />
        <Text style={styles.label}>Instagram</Text>
        <TextInput
          style={styles.input}
          value={form.linkedin}
          onChangeText={value => setForm({...form, linkedin: value})}
          placeholder="Work Place"
        />
      </View>
      <TouchableOpacity style={styles.hireButton} onPress={handleEditProfile}>
        <Text style={{color: 'white', padding: 13, fontSize: 22}}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerSkill: {
    flex: 1,
    backgroundColor: '#FBB017',
    alignSelf: 'flex-start',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
    gap: 10,
  },
  container: {
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
  profileImage: {
    borderRadius: 75,
    alignSelf: 'center',
    position: 'relative',
    width: 180,
    height: 180,
    marginTop: 30,
  },
  nameWrapper: {
    color: '#1F2A36',
    marginTop: 33,
  },
  titleWrapper: {
    color: '#1F2A36',
    fontFamily: 'Open Sans, sans-serif',
    marginTop: 19,
  },
  locationWrapper: {
    display: 'flex',
    marginTop: 19,
    alignItems: 'stretch',
    gap: 11,
  },
  locationIcon: {
    position: 'relative',
    width: 16,
    flexShrink: 0,
    aspectRatio: 1,
  },
  locationText: {
    fontFamily: 'Open Sans, sans-serif',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  talentLabel: {
    fontFamily: 'Open Sans, sans-serif',
    marginTop: 19,
    marginBottom: 15,
  },
  description: {
    fontFamily: 'Open Sans, sans-serif',
    marginTop: 29,
  },
  cancelButton: {
    padding: 15,
    backgroundColor: 'white',
    borderColor: '#5E50A1',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    whiteSpace: 'nowrap',
    justifyContent: 'center',
    font: '700 16px Open Sans, sans-serif',
  },
  hireButton: {
    borderRadius: 4,
    backgroundColor: '#5E50A1',
    marginTop: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    whiteSpace: 'nowrap',
    justifyContent: 'center',
    font: '700 16px Open Sans, sans-serif',
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

export default EditProfileRecruiter;
