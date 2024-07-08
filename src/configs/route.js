/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screen/main/Home';
import Option from '../screen/Option';
import SignInWorker from '../screen/auth/Worker/Sign-In';
import SignUpWorker from '../screen/auth/Worker/Sign-Up';
import SignUpRecruiter from '../screen/auth/Recruiter/Sign-Up';
import SignInRecruiter from '../screen/auth/Recruiter/Sign-In';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../components/modules/TabBar';
import Profile from '../screen/main/Profile';
import RecruiterProfile from '../screen/main/RecruiterProfile';
import OptionLogin from '../screen/Option';
import EditProfileWorker from '../screen/main/EditProfileWorker';
import SearchWorker from '../screen/main/Search';
import api from './api';
import axios from 'axios';
// import {Profile} from '';

const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  const [roles, setRoles] = React.useState('Worker');

  React.useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await axios.get(`${process.env.API_URL}/auth/check-role`);

        const {role} = res.data.data.data.role;

        setRoles(role);
      } catch (error) {
        console.error('Failed to check user role:', error);
        setRoles('worker');
      }
    };

    checkRole();
  }, []);
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchWorker} />
      {/* <Tab.Screen name="Profile" component={ProfileStack} /> */}
      <Tab.Screen
        name="Profile"
        component={
          roles === 'recruiter' ? RecruiterProfileStack : WorkerProfileStack
        }
      />

      {/* <Tab.Screen name="seting" component={Setting} /> */}
    </Tab.Navigator>
  );
};

const RecruiterProfileStack = () => {
  return (
    <stack.Navigator
      initialRouteName="RecruiterProfile"
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen name="RecruiterProfile" component={RecruiterProfile} />
      {/* <stack.Screen
        name="EditProfileRecruiter"
        component={EditProfileRecruiter}
      /> */}
    </stack.Navigator>
  );
};

const WorkerProfileStack = () => {
  return (
    <stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen name="Profile" component={Profile} />
      <stack.Screen name="EditProfileWorker" component={EditProfileWorker} />
    </stack.Navigator>
  );
};

const MainRouter = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="Option"
        screenOptions={{
          headerShown: false,
        }}>
        <stack.Screen name="SignInWorker" component={SignInWorker} />
        <stack.Screen name="SignInRecruiter" component={SignInRecruiter} />
        <stack.Screen name="SignUpRecruiter" component={SignUpRecruiter} />
        <stack.Screen name="SignUpWorker" component={SignUpWorker} />
        <stack.Screen name="MainTab" component={MainTab} />
        <stack.Screen name="Option" component={OptionLogin} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRouter;
