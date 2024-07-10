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
import {getWorkerId} from '../../../configs/redux/action/workerAction';
import {hireWorkers} from '../../../configs/redux/action/hireAction';
import {Picker} from '@react-native-picker/picker';

const HireWorkers = ({route}) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {profile, loading, error} = useSelector(state => state.profile);
  const [form, setForm] = React.useState({
    workers_id: id,
    message_purpose: 'Full-time',
    name_request_hire: '',
    email_request_hire: '',
    phone_request_hire: '',
    description_request_hire: '',
  });

  useEffect(() => {
    dispatch(getWorkerId(id));
  }, [dispatch]);

  const handleHire = e => {
    e.preventDefault();
    dispatch(hireWorkers(form));
    navigation.navigate('home');
    Alert.alert('Hire Success');
  };

  const handleSortChange = itemValue => {
    setForm({
      ...form,
      message_purpose: itemValue,
    });
  };

  const handleCancel = () => {
    navigation.navigate('RecruiterProfile');
  };

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
        <View
          style={{flexDirection: 'row', justifyContent: 'space-evenly'}}></View>
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
          Hire
        </Text>
        <View style={styles.containerSelect}>
          <Text style={styles.labelSelect}>Purpose of this Message</Text>
          <Picker
            style={styles.picker}
            selectedValue={form.message_purpose}
            onValueChange={handleSortChange}>
            <Picker.Item label="Full-time" value="Full-time" />
            <Picker.Item label="Part-time" value="Part-time" />
            <Picker.Item label="Self-employed" value="Self-employed" />
            <Picker.Item label="Freelance" value="Freelance" />
            <Picker.Item label="Contract" value="Contract" />
            <Picker.Item label="Internship" value="Internship" />
            <Picker.Item label="Apprenticeship" value="Apprenticeship" />
            <Picker.Item label="Seasonal" value="Seasonal" />
          </Picker>
        </View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={form.name_request_hire}
          onChangeText={value => setForm({...form, name_request_hire: value})}
          placeholder="Name"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={form.email_request_hire}
          onChangeText={value => setForm({...form, email_request_hire: value})}
          placeholder="Email"
        />
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={form.phone_request_hire}
          onChangeText={value => setForm({...form, phone_request_hire: value})}
          placeholder="Phone"
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          multiline={true}
          numberOfLines={5}
          style={styles.input}
          value={form.description_request_hire}
          onChangeText={value =>
            setForm({...form, description_request_hire: value})
          }
          placeholder="Description"
        />
      </View>
      <TouchableOpacity style={styles.hireButton} onPress={handleHire}>
        <Text style={{color: 'white', padding: 13, fontSize: 22}}>Hire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
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
  containerSelect: {
    flexDirection: 'column',
    gap: 4,
    width: '100%',
  },
  labelSelect: {
    fontWeight: 'normal',
    fontSize: 12,
    color: '#9EA0A5',
    paddingLeft: 5,
  },
  picker: {
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

export default HireWorkers;
