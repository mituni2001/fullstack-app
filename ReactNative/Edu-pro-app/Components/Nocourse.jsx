// NoCourse.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function NoCourse() {
  const router = useRouter();

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 30 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
        You Don’t Have Any Course
      </Text>
      <Text style={{ color: '#666', marginBottom: 20 }}>
        Create your first course to get started
      </Text>

      <TouchableOpacity
        onPress={() => router.push('/addcourse')}
        style={{
          backgroundColor: '#007bff',
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Create New Course</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          // You can use this for future "Explore Existing Courses"
        }}
      >
        <Text style={{ color: '#007bff' }}>Explore Existing Courses</Text>
      </TouchableOpacity>

      <Image
        source={require('../../assets/images/book.png')} // if you have image
        style={{ width: 250, height: 250, marginTop: 30 }}
        resizeMode="contain"
      />
    </View>
  );
}