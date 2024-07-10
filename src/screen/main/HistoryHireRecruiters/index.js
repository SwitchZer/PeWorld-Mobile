import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardSkill from '../../../components/modules/CardSkills';
import CardWorker from '../../../components/modules/CardWorker';
import {endEvent} from 'react-native/Libraries/Performance/Systrace';
import {useDispatch, useSelector} from 'react-redux';
import {getWorker} from '../../../configs/redux/action/workerAction';
import {useNavigation} from '@react-navigation/native';

const HistoryHireRecruiters = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  return (
    <View style={styles.container}>
      <FlatList
        data={talent}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity>
            <CardWorker data={item} />
          </TouchableOpacity>
        )}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F8',
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workerItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
  },
  formContainer: {
    borderRadius: 10,
    borderColor: 'rgba(251, 176, 23, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 15,
  },
});

export default HistoryHireRecruiters;
