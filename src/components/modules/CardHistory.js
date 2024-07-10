import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CardHistory = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.name}>{data?.name_request_hire}</Text>
        <Text style={styles.role}>{data?.email_request_hire}</Text>
        <Text style={styles.role}>{data?.phone_request_hire}</Text>
        <Text style={styles.role}>{data?.description_request_hire}</Text>
      </View>
    </View>
  );
};

export default CardHistory;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingLeft: 20,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: 'hidden',
    margin: 10,
  },
  imageWrapper: {
    marginRight: 10,
  },
  textWrapper: {
    justifyContent: 'center',
    rowGap: 2,
  },
  name: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 17,
  },
  role: {
    color: '#9EA0A5',
  },
  skillCardWrapper: {
    flexDirection: 'row',
    columnGap: 7,
  },
  overflow: {
    padding: 5,
    borderRadius: 5,
  },
});
