import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function CategoryPage() {
  const { category } = useLocalSearchParams(); // From Explore.jsx click
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses by category from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Replace with your backend API endpoint
        const res = await fetch(
          `http://192.168.8.198:5000/api/courses?category=${encodeURIComponent(category)}`
        );
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching category courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [category]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!courses.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.noData}>No courses found for "{category}"</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{category} Courses</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.courseCard}>
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.courseDesc}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1f2937',
  },
  noData: { fontSize: 16, color: 'gray', textAlign: 'center' },
  courseCard: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  courseTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  courseDesc: { fontSize: 14, color: '#666' },
});
