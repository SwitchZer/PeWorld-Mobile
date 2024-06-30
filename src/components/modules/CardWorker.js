/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import CardSkill from './CardSkills';
// import SkillCard from './SkillCard';

const CardWorker = ({data}) => {
  const skills = data.skills;
  const displayedSkills = skills.slice(0, 2);
  const overflowCount = skills.length - displayedSkills.length;
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={
            data.photo
              ? {uri: data.photo}
              : require('../../assets/default-image.png')
          }
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.name}>{data?.name}</Text>
        <Text style={styles.role}>Web Developer</Text>
        <View style={styles.skillCardWrapper}>
          <FlatList
            data={displayedSkills}
            keyExtractor={item => item.id}
            renderItem={({item}) => <CardSkill skillname={item} />}
            contentContainerStyle={{paddingVertical: 16}}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
          />
          {overflowCount > 0 && (
            <View style={[styles.overflow, {backgroundColor: '#999'}]}>
              <Text style={{color: 'white'}}>+{overflowCount}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CardWorker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
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
