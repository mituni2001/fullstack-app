import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';

export default function AddCourse() {
  const [courseTitle, setCourseTitle] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateTopic = async () => {
    if (!courseTitle.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post('http://192.168.8.198:5000/api/generate-topics', {
        prompt: `Generate a list of topics for a course on "${courseTitle}"`,
      });

      const topicList = res.data.topics || [];
      setTopics(topicList);
      setSelectedTopics([]);
    } catch (error) {
      console.error('Error generating topics:', error);
    }

    setLoading(false);
  };

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleGenerateCourse = async () => {
    if (!selectedTopics.length || !courseTitle.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post('http://192.168.8.198:5000/api/generate-course', {
        title: courseTitle,
        topics: selectedTopics,
      });

      const course = res.data.course;

      // Navigate to preview screen with course data
      console.log("Navigating with:",
        {
         title: courseTitle,
         topics: selectedTopics,
         course,
        }); 
      router.push({
        pathname: '/coursePreview',
        params: {
          title: courseTitle,
          topics: JSON.stringify(selectedTopics),
          course: JSON.stringify(course),
        },
      });
    } catch (error) {
      console.error('Error generating course:', error);
    }

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 27 }}>
      <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Create New Course</Text>
      <Text style={{ fontSize: 25, marginVertical: 8 }}>What do you want to learn today?</Text>
      <Text style={{ color: '#666', marginBottom: 15 }}>
        Enter the course you want to create (e.g. Learn Python, 10th Science, Digital Marketing...)
      </Text>

      <TextInput
        placeholder="Learn Python"
        value={courseTitle}
        onChangeText={setCourseTitle}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 15,
          padding: 20,
          marginBottom: 10,
        }}
      />

      <TouchableOpacity
        onPress={handleGenerateTopic}
        style={{
          borderWidth: 1,
          borderColor: '#007bff',
          borderRadius: 10,
          padding: 15,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        {loading ? <ActivityIndicator color="#007bff" /> : <Text style={{ color: '#007bff' }}>Generate Topics</Text>}
      </TouchableOpacity>

      {topics.length > 0 && (
        <>
          <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
            Select the topics you want to include in the course
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {topics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleTopic(topic)}
                style={{
                  backgroundColor: selectedTopics.includes(topic) ? '#007bff' : '#f2f2f2',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 20,
                  margin: 4,
                }}
              >
                <Text style={{ color: selectedTopics.includes(topic) ? 'white' : '#333' }}>
                  {topic}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {topics.length > 0 && (
        <TouchableOpacity
          onPress={handleGenerateCourse}
          style={{
            marginTop: 30,
            backgroundColor: '#007bff',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Generate Course</Text>
          )}
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}