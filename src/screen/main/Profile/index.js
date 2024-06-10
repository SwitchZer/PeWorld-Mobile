/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const [profile, setProfile] = React.useState([]);
  const [skill, setSkill] = React.useState([]);
  const navigation = useNavigation();
  const getSkill = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`${process.env.API_URL}/skills`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSkill(res.data.data);
    } catch (error) {
      console.warn(error);
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

  const handleNavigate = () => {
    navigation.navigate('EditProfile');
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  return (
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
      <View style={styles.nameWrapper}>
        <Text style={{fontWeight: 'bold', fontSize: 30, color: 'black'}}>
          {profile.name}
        </Text>
      </View>
      <View style={styles.titleWrapper}>
        <Text>{profile.job_desk || 'Worker Job Desk'}</Text>
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
          <Text>{profile.domicile || 'Worker Domicile'}</Text>
        </View>
      </View>
      <View style={styles.talentLabel}>
        <Text>{profile.workplace || 'Worker Work Place'}</Text>
      </View>
      <View style={styles.description}>
        <Text>{profile.description || 'Worker Description'}</Text>
      </View>
      <TouchableOpacity style={styles.hireButton} onPress={handleNavigate}>
        <Text style={{color: 'white', padding: 13, fontSize: 22}}>Edit</Text>
      </TouchableOpacity>
      <View style={styles.skillLabel}>
        <Text>Skill</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  description: {
    fontFamily: 'Open Sans, sans-serif',
    marginTop: 29,
  },
  hireButton: {
    borderRadius: 4,
    backgroundColor: '#5E50A1',
    marginTop: 42,
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
});

export default Profile;
