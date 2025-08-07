import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CourseDetails() {
  const router = useRouter();

  const chapters = [
    'Introduction to React Native',
    'Core Components',
    'Handling User Input',
  ];

  const handleStartCourse = () => {
    console.log('Start course');
    // router.push('/chapterview') or any path to start course
  };

  const handleChapterPress = (chapter) => {
    console.log(`Navigate to ${chapter}`);
    // router.push('/chapterview?chapter=1') or your dynamic logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Image */}
      <Image
        source={require('../assets/images/banner1.png')}
        style={styles.courseImage}
        resizeMode="cover"
      />

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.title}>React Native Fundamentals</Text>
        <Text style={styles.chapterCount}>📘 3 Chapters</Text>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description:</Text>
        <Text style={styles.description}>
          This course introduces the core concepts of React Native development, including components, layout, and user input handling.
        </Text>

        {/* Start Button */}
        <TouchableOpacity style={styles.startButton} onPress={handleStartCourse}>
          <Text style={styles.startButtonText}>Start Now</Text>
        </TouchableOpacity>

        {/* Chapters */}
        <Text style={styles.sectionTitle}>Chapters</Text>
        {chapters.map((chapter, index) => (
          <TouchableOpacity
            key={index}
            style={styles.chapterItem}
            onPress={() => handleChapterPress(chapter)}
          >
            <Text style={styles.chapterText}>{`${index + 1}. ${chapter}`}</Text>
            <Ionicons name="chevron-forward" size={20} color="#333" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  courseImage: {
    width: '100%',
    height: 220,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  chapterCount: {
    marginVertical: 5,
    fontSize: 14,
    color: '#555',
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
  startButton: {
    marginTop: 20,
    backgroundColor: '#2E75FF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  chapterItem: {
    marginTop: 12,
    padding: 15,
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chapterText: {
    fontSize: 14,
    color: '#333',
  },
});