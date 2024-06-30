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

const SearchScreen = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [params, setParams] = React.useState({
    page: 1,
    limit: 10,
    search: '',
  });

  const getWorkers = async () => {
    try {
      const res = await axios.get(`${process.env.API_URL}/workers`, {
        params: {
          page: params.page,
          limit: params.limit,
          search: params.search,
        },
      });

      const {data} = res.data;
      setWorkers(current => [...current, ...data]);
    } catch (error) {
      console.warn(error);
    }
  };

  const renderLoader = () => {
    return loading && <ActivityIndicator size="large" color="#00ff00" />;
  };

  const loadMoreItem = () => {
    setParams(current => ({
      ...current,
      page: current.page + 1,
    }));
  };

  const handleSearch = () => {
    setParams(prevParams => ({
      ...prevParams,
      page: 1,
      search: searchTerm,
    }));
    getWorkers();
  };

  useEffect(() => {
    getWorkers();
  }, [params]);
  return (
    <View style={styles.container}>
      <TextInput
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <TouchableOpacity onPress={() => handleSearch}>
        <Text style={styles.formTitle}>Search Worker</Text>
      </TouchableOpacity>
      <FlatList
        data={workers}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CardWorker data={item} />}
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
    backgroundColor: '#fff',
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

export default SearchScreen;
