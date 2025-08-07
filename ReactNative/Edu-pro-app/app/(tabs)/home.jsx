import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../Components/Header';
import CourseProgress from '../../Components/CourseProgress';
import PracticeSection from '../../Components/PracticeSection';
import CourseList from '../../Components/CourseList';
import axios from 'axios';
import { UserContext } from '../../context/usercontext';

export default function Home() {
  const { user } = useContext(UserContext);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (!user?.email) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://192.168.8.198:5000/api/course/user/${user.email}`
        );
        setCourseList(response.data);
      } catch (error) {
        console.log('Error fetching courses:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (loading) {
    return (
      <LinearGradient
        colors={['#ADD8E6', '#00008B', '#90EE90']} // light blue, dark blue, light green
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.center}
      >
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#ADD8E6', '#00008B', '#90EE90']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={[]} // FlatList is used for scrolling behavior
          ListHeaderComponent={() => (
            <View>
              <Header />
              <CourseProgress courseList={courseList} />
              <PracticeSection />
              <CourseList courseList={courseList} />
            </View>
          )}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



