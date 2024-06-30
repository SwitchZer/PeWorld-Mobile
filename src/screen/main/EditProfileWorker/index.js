import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import ProfileExperience from '../../../components/modules/Profile/ProfileExperience';
import ProfilePortofolio from '../../../components/modules/Profile/ProfilePortofolio';
import CardSkill from '../../../components/modules/CardSkills';

const EditProfileWorker = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = React.useState([]);
  const [photo, setPhoto] = React.useState(null);
  const [skill, setSkill] = React.useState([]);
  const [skillForm, setSkillForm] = React.useState('');
  const [editProfile, setEditProfile] = React.useState({
    name: '',
    job_desk: '',
    domicile: '',
    workplace: '',
    description: '',
  });

  const getSkill = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${process.env.API_URL}/skills`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSkill(response.data.data);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleAddSkill = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await axios.post(
        `${process.env.API_URL}/skills`,
        {skill_name: skillForm},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Alert.alert('Success Add Skill');
      setSkillForm('');
      getSkill();
    } catch (error) {
      console.log(error?.response.data);
    }
  };

  const handleDeleteSkill = async id => {
    try {
      const token = await AsyncStorage.getItem('token');

      await axios.delete(`${process.env.API_URL}/skills/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert('Skill Succesfully deleted');

      getSkill();
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`${process.env.API_URL}/workers/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data.data);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleChageImageLibrary = async () => {
    try {
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
        `${process.env.API_URL}/workers/profile/photo`,
        formData,
        {
          headers: {
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
        `${process.env.API_URL}/workers/profile/photo`,
        formData,
        {
          headers: {
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

  const handleEditProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put(
        `${process.env.API_URL}/workers/profile`,
        editProfile,
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
    navigation.navigate('Profile');
  };

  React.useEffect(() => {
    getProfile();
    getSkill();
  }, []);

  return (
    <SafeAreaView>
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
              {profile.name}
            </Text>
          </View>
          <View style={styles.titleWrapper}>
            <Text>{profile.job_desk || '-'}</Text>
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
              <Text>{profile.domicile || '-'}</Text>
            </View>
          </View>
          <View style={styles.talentLabel}>
            <Text>{profile.workplace || '-'}</Text>
          </View>
        </View>
        <View style={styles.containerEdit}>
          <Text style={{fontWeight: 'bold', fontSize: 30, color: 'black'}}>
            Data Diri
          </Text>
          <Text style={styles.label}>Name</Text>
          <TextInput
            label="Name"
            style={styles.input}
            value={editProfile.name}
            onChangeText={value =>
              setEditProfile({...editProfile, name: value})
            }
            placeholder="Name"
          />
          <Text style={styles.label}>Job Title</Text>
          <TextInput
            label="Job Title"
            style={styles.input}
            value={editProfile.job_desk}
            onChangeText={value =>
              setEditProfile({...editProfile, job_desk: value})
            }
            placeholder="Job Title"
          />
          <Text style={styles.label}>Domicile</Text>
          <TextInput
            label="Domicile"
            style={styles.input}
            value={editProfile.domicile}
            onChangeText={value =>
              setEditProfile({...editProfile, domicile: value})
            }
            placeholder="Domicile"
          />
          <Text style={styles.label}>Work Place</Text>
          <TextInput
            label="Work Place"
            style={styles.input}
            value={editProfile.workplace}
            onChangeText={value =>
              setEditProfile({...editProfile, workplace: value})
            }
            placeholder="Work Place"
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            label="Description"
            style={styles.input}
            value={editProfile.description}
            onChangeText={value =>
              setEditProfile({...editProfile, description: value})
            }
            placeholder="Description"
          />
        </View>
        <TouchableOpacity style={styles.hireButton} onPress={handleCancel}>
          <Text style={{color: 'white', padding: 13, fontSize: 22}}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.hireButton} onPress={handleEditProfile}>
          <Text style={{color: 'white', padding: 13, fontSize: 22}}>Save</Text>
        </TouchableOpacity>
        <View style={styles.containerEdit}>
          <Text style={{fontWeight: 'bold', fontSize: 30, color: 'black'}}>
            Skill
          </Text>
          <TextInput
            label="Skill"
            style={styles.input}
            value={skillForm}
            onChangeText={value => setSkillForm(value)}
            placeholder="Skills Name"
          />
          <TouchableOpacity style={styles.skillButton} onPress={handleAddSkill}>
            <Text style={{color: 'white', padding: 13, fontSize: 22}}>
              Add SKill
            </Text>
          </TouchableOpacity>
          <View style={{marginTop: 10}}>
            <Text>Note: Clicked Skill Will be Deleted</Text>
            <FlatList
              data={skill}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handleDeleteSkill(item.id)}>
                  <View style={[styles.containerSkill]}>
                    <Text style={{color: '#fff', fontWeight: '800'}}>
                      {item.skill_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <ProfileExperience />

        <ProfilePortofolio />
      </ScrollView>
    </SafeAreaView>
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
  skillButton: {
    borderRadius: 4,
    backgroundColor: '#FBB017',
    marginTop: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    whiteSpace: 'nowrap',
    justifyContent: 'center',
    font: '700 16px Open Sans, sans-serif',
  },
  skillLabel: {
    color: '#1F2A36',
    marginTop: 41,
    font: '600 18px/133% Open Sans, sans-serif',
  },
  skillsContainer: {
    display: 'flex',
    marginTop: 25,
    alignItems: 'stretch',
    gap: 6,
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  skillBox: {
    fontFamily: 'Open Sans, sans-serif',
    borderRadius: 4,
    borderColor: 'rgba(251, 176, 23, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'rgba(251, 176, 23, 0.60)',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: '8px 14px',
  },
  contactItem: {
    display: 'flex',
    marginTop: 60,
    alignItems: 'stretch',
    gap: 20,
    whiteSpace: 'nowrap',
  },
  contactImage: {
    position: 'relative',
    width: 24,
    flexShrink: 0,
    aspectRatio: 1,
  },
  contactTextWrapper: {
    fontFamily: 'Open Sans, sans-serif',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    margin: 'auto 0',
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

export default EditProfileWorker;
