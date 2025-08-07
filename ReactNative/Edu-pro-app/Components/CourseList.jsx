import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CoursesOptions } from '../constants/options';
import { useRouter } from 'expo-router';

export default function CourseList() {
  const router = useRouter();

  const handleCoursePress = (course) => {
    router.push({
      pathname: '/assets/images/video1.mp4',
      params: { course: JSON.stringify(course) },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CoursesOptions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={styles.heading}>Courses</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleCoursePress(item)}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <Text style={styles.title}>{item.name.trim()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,              // important for full height so FlatList scrolls properly
    marginTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 50,
  },
  heading: {
    fontSize: 22,
    fontFamily: 'outfit-bold', // <-- bold font for "Courses"
    marginBottom: 10,
    color: '#000',
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
    elevation: 2, // for Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontFamily: 'outfit',
    padding: 10,
    color: '#333',
  },
});
