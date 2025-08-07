import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import { imageAssets } from '../constants/options';

export default function CourseProgress({ courseList = [] }) {
  return (
    <View style={{ marginTop: 10 }}>
      

      <FlatList
        data={courseList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.progressContainer}>
            <View style={styles.row}>
              <Image
                source={imageAssets[item.banner_image] }
                style={styles.image}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.title} numberOfLines={2}>{item?.title}</Text>
                <Text style={styles.subtitle}>{item?.chapters?.length} chapters</Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Progress.Bar progress={0.3} width={250} />
              <Text style={styles.progressText}>3 out of 5 chapters completed</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
  },
  progressContainer: {
    margin: 7,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: 280,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 19,
  },
  subtitle: {
    fontFamily: 'outfit',
    fontSize: 15,
  },
  progressText: {
    fontFamily: 'outfit',
    marginTop: 2,
  },
});