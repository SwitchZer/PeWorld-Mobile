/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {checkRole} from './redux/action/checkRoleAction';
// import {Profile} from '';

const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth);
  const {role} = useSelector(state => state.checkRole);
  useEffect(() => {
    if (token) {
      dispatch(checkRole());
    }
  }, [token, dispatch]);
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
          role === 'recruiter' ? RecruiterProfileStack : WorkerProfileStack
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
