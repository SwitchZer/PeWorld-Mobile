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
import OptionLogin from '../screen/Option';
import EditProfile from '../screen/main/EditProfile';
// import {Profile} from '';

const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      {/* <Tab.Screen name="seting" component={Setting} /> */}
    </Tab.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <stack.Navigator initialRouteName="Profile">
      <stack.Screen name="Profile" component={Profile} />
      <stack.Screen name="EditProfile" component={EditProfile} />
    </stack.Navigator>
  );
};

const MainRouter = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="SignUpWorker"
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
