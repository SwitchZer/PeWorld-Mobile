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

const SearchScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const talent = useSelector(state => state.worker.workers);
  const [loading, setLoading] = React.useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const [params, setParams] = useState({
    limit: 9,
    page: 1,
    search: '',
    sort: 'created_at',
    sortBy: 'ASC',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await dispatch(getWorker(params));
        setTotalPages(Math.ceil(response.totalCount / params.limit));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, [dispatch, params.page, params.search]);

  const renderLoader = () => {
    return loading && <ActivityIndicator size="large" color="#00ff00" />;
  };

  const loadMoreItem = () => {
    if (params.page < totalPages) {
      setParams(prevParams => ({
        ...prevParams,
        page: prevParams.page + 1,
      }));
    }
  };

  const handleSearchInputChange = text => {
    setSearchInput(text);
    setParams({
      ...params,
      page: 1,
      search: text,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Workers"
        type="text"
        value={searchInput}
        onChangeText={handleSearchInputChange}
        style={{
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 8,
        }}
      />
      <FlatList
        data={talent}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailWorkers', {id: item.id})}>
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

export default SearchScreen;
