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
import {useDispatch, useSelector} from 'react-redux';
import {getWorkerProfile} from '../../../configs/redux/action/profileAction';
import {fetchSkills} from '../../../configs/redux/action/fetchSkillAction';
import {getMyPortfolio} from '../../../configs/redux/action/portfolioAction';
import {getMyExperience} from '../../../configs/redux/action/experienceAction';

const Profile = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = React.useState(1);
  const navigation = useNavigation();

  const profile = useSelector(state => state.profile.profile);
  const {data} = useSelector(state => state.skills);
  const {myPortfolio} = useSelector(state => state.portfolio);
  const {myExperience} = useSelector(state => state.experience);

  useEffect(() => {
    dispatch(getMyPortfolio());
    dispatch(getMyExperience());
  }, [dispatch]);

  const handleToggle = id => {
    setToggle(id);
  };

  const handleNavigate = () => {
    navigation.navigate('EditProfileWorker');
  };

  const handleNavigateHistory = () => {
    navigation.navigate('HistoryHireWorkers');
  };

  useEffect(() => {
    dispatch(getWorkerProfile());
    dispatch(fetchSkills());
  }, [dispatch]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <View style={styles.profileDetails}>
            <Image
              source={{uri: `${profile.photo}`}}
              style={styles.profileImage}
            />
            <View style={styles.profileText}>
              <Text style={{fontWeight: 600, fontSize: 22, color: '#1F2A36'}}>
                {profile.name}
              </Text>
              <Text style={{fontWeight: 400, fontSize: 14, color: '#1F2A36'}}>
                {profile.job_desk}
              </Text>
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <Text style={{fontWeight: 400, fontSize: 14, color: '#9EA0A5'}}>
                  {profile.domicile}
                </Text>
              </View>
              <Text style={{fontWeight: 400, fontSize: 14, color: '#9EA0A5'}}>
                {profile.workplace}
              </Text>
              <Text style={{fontWeight: 400, fontSize: 14, color: '#9EA0A5'}}>
                {profile.description}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.hireButton}
              onPress={handleNavigate}>
              <Text style={{color: 'white', padding: 13, fontSize: 22}}>
                Edit profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.hireButton}
              onPress={handleNavigateHistory}>
              <Text style={{color: 'white', padding: 13, fontSize: 22}}>
                Hire History
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.skillsContainer}>
            <Text style={styles.skillsTitle}>Skill</Text>
            <View style={styles.skillsList}>
              {data.map(item => (
                <View
                  key={item.id}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    backgroundColor: '#FDD074',
                    borderColor: '#FBB017',
                    borderWidth: 1,
                    borderRadius: 4,
                  }}>
                  <Text
                    style={{fontWeight: 600, fontSize: 12, color: '#FFFFFF'}}>
                    {item.skill_name}
                  </Text>
                </View>
              ))}
            </View>
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
                <View
                  style={
                    toggle === 1
                      ? styles.activeTabIndicator
                      : styles.inactiveTabIndicator
                  }></View>
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
                <View
                  style={
                    toggle === 2
                      ? styles.activeTabIndicator
                      : styles.inactiveTabIndicator
                  }></View>
              </TouchableOpacity>
            </View>

            {toggle === 1 && (
              <View style={styles.contentContainer}>
                <View style={styles.list}>
                  {myPortfolio.map(item => (
                    <TouchableOpacity
                      key={item.portfolio_id}
                      onPress={() => handleNavigate(item.link)}>
                      <Image source={{uri: item.image}} style={styles.image} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {toggle === 2 && (
              <View style={styles.contentContainer}>
                <View style={styles.list}>
                  {myExperience.map(item => (
                    <View
                      key={item.experience_id}
                      style={{flexDirection: 'row', gap: 20}}>
                      <Image
                        source={require('../../../assets/default-image.png')}
                        style={styles.companyLogo}
                      />
                      <View style={{gap: 6, flex: 1}}>
                        <Text
                          style={{
                            fontWeight: 600,
                            fontSize: 20,
                            color: '#1F2A36',
                          }}>
                          {item.position}
                        </Text>
                        <Text
                          style={{
                            fontWeight: 400,
                            fontSize: 18,
                            color: '#46505C',
                          }}>
                          {item.company}
                        </Text>
                        {/* <Text
                          style={{
                            fontWeight: 400,
                            fontSize: 16,
                            color: '#9EA0A5',
                          }}>
                          {formatDate(item.start_date)} -{' '}
                          {formatDate(item.end_date)}
                        </Text>
                        <Text
                          style={{
                            fontWeight: 400,
                            fontSize: 16,
                            color: '#9EA0A5',
                          }}>
                          {item.duration_in_months} months
                        </Text> */}
                        <Text
                          style={{
                            fontWeight: 400,
                            fontSize: 14,
                            color: '#1F2A36',
                          }}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F7F8',
  },
  header: {
    backgroundColor: '#5E50A1',
    height: 361,
  },
  content: {
    paddingTop: 70,
    paddingBottom: 210,
  },
  profileContainer: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 10,
    marginBottom: 30,
  },
  profileDetails: {
    alignItems: 'center',
    marginBottom: 34,
  },
  profileText: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
  skillsContainer: {
    marginBottom: 34,
  },
  skillsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2A36',
    marginBottom: 20,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  socialContainer: {
    marginBottom: 34,
    gap: 24,
  },
  profileTabContainer: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
  },
  activeTabText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1F2A36',
  },
  inactiveTabText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#9EA0A5',
  },
  activeTabIndicator: {
    height: 4,
    backgroundColor: '#5E50A1',
    borderRadius: 2,
    marginTop: 5,
  },
  inactiveTabIndicator: {
    height: 4,
    backgroundColor: 'transparent',
    borderRadius: 2,
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
    marginTop: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  list: {
    flexDirection: 'column',
    gap: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  companyLogo: {
    width: '40',
    aspectRatio: 1 / 1,
    resizeMode: 'cover',
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
});

export default Profile;
