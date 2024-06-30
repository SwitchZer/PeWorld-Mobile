import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import CardSkill from '../../../components/modules/CardSkills';
import {SafeAreaView} from 'react-native-safe-area-context';

const Profile = () => {
  const [portfolio, setPortofolio] = React.useState([]);
  const [profile, setProfile] = React.useState([]);
  const [skill, setSkill] = React.useState([]);
  const [toggle, setToggle] = React.useState(1);
  const navigation = useNavigation();

  const getPortfolio = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await axios.get(`${process.env.API_URL}/portfolio`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPortofolio(res.data.data);
      console.log(setPortofolio);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        Alert.alert(
          'Error Fetching Portfolio',
          `Error ${error.response.status}: ${error.response.data.message}`,
        );
      } else if (error.request) {
        console.log(error.request);
        Alert.alert('Error Fetching Portfolio', 'No response from the server');
      } else {
        console.log('Error', error.message);
        Alert.alert('Error Fetching Portfolio', error.message);
      }
    }
  };

  const getSkill = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await axios.get(`${process.env.API_URL}/skills/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSkill(res.data.data);
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

  const handleToggle = id => {
    setToggle(id);
  };

  const handleNavigate = () => {
    navigation.navigate('EditProfileWorker');
  };

  React.useEffect(() => {
    getProfile();
    getSkill();
    getPortfolio();
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
            <Text style={{color: 'white', padding: 13, fontSize: 22}}>
              Edit
            </Text>
          </TouchableOpacity>
          <View style={styles.skillLabel}>
            <Text>Skill</Text>
            <FlatList
              data={skill}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <CardSkill skillname={item.skill_name} accessible={true} />
              )}
              contentContainerStyle={{paddingVertical: 16}}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
            />
          </View>
        </View>
        <View style={styles.profileTabContainer}>
          <View style={{}}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => handleToggle(1)}>
                <Text
                  style={
                    toggle === 1 ? styles.activeTabText : styles.inactiveTabText
                  }>
                  Portfolio
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => handleToggle(2)}>
                <Text
                  style={
                    toggle === 2 ? styles.activeTabText : styles.inactiveTabText
                  }>
                  Pengalaman Kerja
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.list}>
                {portfolio.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleNavigate(item.link_repository)}>
                    <Image source={{uri: item.image}} style={styles.image} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {toggle === 2 && (
              <View style={styles.contentContainer}>
                <View style={styles.list}>
                  {/* <FlatList
                    // data={experience}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                      <View style={styles.experienceContainer}>
                        <Image
                          source={require('../../../assets/default-image.png')}
                          style={styles.companyLogo}
                        />
                        <View style={styles.experienceDetails}>
                          <Text style={styles.positionText}>
                            {item.position}
                          </Text>
                          <Text style={styles.companyText}>{item.company}</Text>
                          <View style={styles.dateContainer}>
                            <Text style={styles.dateText}>
                              {item.work_month}
                            </Text>
                            <Text style={styles.dateText}>
                              {item.work_year}
                            </Text>
                          </View>
                          <Text style={styles.descriptionText}>
                            {item.description}
                          </Text>
                        </View>
                      </View>
                    )}
                  /> */}
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    flexDirection: 'column',
    gap: 20,
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
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileTabContainer: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default Profile;
