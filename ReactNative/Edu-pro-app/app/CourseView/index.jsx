import React from 'react';
import { View, FlatList, Text } from 'react-native'; // ✅ Imported Text
import { useLocalSearchParams } from 'expo-router';
import Intro from '../../Components/CourseView/Intro';
import Chapters from '../../Components/CourseView/Chapters';
import  Colors  from '../../constants/colors'; // ✅ Imported with curly braces

export default function CourseView() {
  const { courseParams } = useLocalSearchParams();

  let course = null;
  try {
    course = courseParams ? JSON.parse(courseParams) : null;
  } catch (error) {
    console.error('Failed to parse courseParams:', error);
    course = null;
  }

  if (!course) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.WHITE }}>
        <Text>No course data available.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={[]} // Empty data just to use ListHeaderComponent
      ListHeaderComponent={
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
          <Intro course={course} />
          <Chapters course={course} />
        </View>
      }
    />
  );
}