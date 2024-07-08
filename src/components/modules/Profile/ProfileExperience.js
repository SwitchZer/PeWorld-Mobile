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

const ProfileExperience = () => {
  const [experience, setExperience] = React.useState({
    position: '',
    company: '',
    work_month: '',
    work_year: '',
    description: '',
  });

  const addExperience = async () => {
    if (
      !experience.position ||
      !experience.company ||
      !experience.work_month ||
      !experience.work_year ||
      !experience.description
    ) {
      Alert.alert('Please fill out all the required fields.');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${process.env.API_URL}/experience`,
        experience,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Alert.alert('Success Add Experience');
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        Alert.alert('Error Adding Experience', error.response.data.message);
      } else if (error.request) {
        console.log(error.request);
        Alert.alert('Error Adding Experience', 'No response from the server');
      } else {
        console.log('Error', error.message);
        Alert.alert('Error Adding Experience', error.message);
      }
    }
  };
  return (
    <View style={styles.containerEdit}>
      <Text style={{fontWeight: 'bold', fontSize: 30, color: 'black'}}>
        Experience
      </Text>
      <Text style={styles.label}>Position</Text>
      <TextInput
        label="Position"
        style={styles.input}
        value={experience.position}
        onChangeText={value => setExperience({...experience, position: value})}
        placeholder="Position"
      />
      <Text style={styles.label}>Company Name</Text>
      <TextInput
        label="Company Name"
        style={styles.input}
        value={experience.company}
        onChangeText={value => setExperience({...experience, company: value})}
        placeholder="Company Name"
      />
      <Text style={styles.label}>Month</Text>
      <TextInput
        label="Month"
        style={styles.input}
        value={experience.work_month}
        onChangeText={value =>
          setExperience({...experience, work_month: value})
        }
        placeholder="Month"
      />
      <Text style={styles.label}>Year</Text>
      <TextInput
        label="Year"
        style={styles.input}
        value={experience.work_year}
        onChangeText={value => setExperience({...experience, work_year: value})}
        placeholder="Year"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        label="Description"
        style={styles.input}
        value={experience.description}
        onChangeText={value =>
          setExperience({...experience, description: value})
        }
        placeholder="Description"
      />
      <TouchableOpacity style={styles.formContainer} onPress={addExperience}>
        <Text style={styles.formTitle}>Add Experience</Text>
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

export default ProfileExperience;
