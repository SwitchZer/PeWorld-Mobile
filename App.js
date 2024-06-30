import React from 'react';
import MainRouter from './src/configs/route';
import {LogLevel, OneSignal} from 'react-native-onesignal';

const App = () => {
  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize('7d0c2d53-30f5-487e-ab5b-fe1dd4da0058');

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });
  return <MainRouter />;
};

export default App;
