import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';

const OptionLogin = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../assets/option-background.png')}
      style={styles.container}
      resizeMode="cover">
      <View style={styles.innerContainer}>
        <Text style={{fontWeight: 700, fontSize: 34, color: '#FFFFFF'}}>
          Temukan developer berbakat & terbaik di berbagai bidang keahlian
        </Text>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignInWorker')}
            style={styles.loginButtonWorker}>
            <Text
              style={{
                color: '#5E50A1',
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '700',
              }}>
              Masuk sebagai Pekerja
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <View style={{flex: 1, height: 1, backgroundColor: '#FFFFFF'}} />
            <Text style={{fontWeight: 600, fontSize: 14, color: '#FFFFFF'}}>
              atau
            </Text>
            <View style={{flex: 1, height: 1, backgroundColor: '#FFFFFF'}} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignInRecruiter')}
            style={styles.loginButtonRecruiter}>
            <Text
              style={{
                color: '#FFF',
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '700',
              }}>
              Masuk sebagai Recruiter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F6F7F8',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 30,
    justifyContent: 'space-between',
  },
  actionContainer: {
    flexDirection: 'column',
    gap: 20,
  },
  link: {
    textAlign: 'right',
    fontSize: 16,
    color: '#FBB017',
  },
  linkYellow: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FBB017',
  },
  textCenter: {
    textAlign: 'center',
    fontSize: 16,
    color: '#1F2A36',
  },
  loginButtonWorker: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  loginButtonRecruiter: {
    padding: 15,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default OptionLogin;
