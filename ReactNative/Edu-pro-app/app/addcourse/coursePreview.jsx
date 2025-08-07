import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const CoursePreview = () => {
  const { title, topics, course } = useLocalSearchParams();

  const parsedCourse = course ? JSON.parse(course) : [];

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15 }}>{title}</Text>
      {parsedCourse.map((module, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{index + 1}. {module.module}</Text>
          {module.points.map((point, i) => (
            <Text key={i} style={{ marginLeft: 10 }}>• {point}</Text>
          ))}
          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Quiz:</Text>
          <Text>{module.quiz.question}</Text>
          {module.quiz.options.map((opt, i) => (
            <Text key={i}>{String.fromCharCode(65 + i)}. {opt}</Text>
          ))}
          <Text style={{ color: 'green', fontWeight: 'bold' }}>Answer: {module.quiz.answer}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default CoursePreview;