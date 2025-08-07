import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { UserContext } from '../../context/usercontext';

export default function Profile() {
  const { user, logout } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome,</Text>
        <Text style={styles.userName}>{user?.name || 'User Name'}</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.card}>
        <Image
          source={require('./../../assets/images/logo.png')}
          style={styles.avatar}
        />
        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>Quizzes</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>95%</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => router.push('/settings')}
      >
        <Text style={styles.settingsText}>Account Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#4b6cb7',
    paddingVertical: 30, // more spacing
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,         // increased from 18
    color: '#fff',
    fontWeight: '500',
  },
  userName: {
    fontSize: 30,         // increased from 24
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 6,
  },
  card: {
    backgroundColor: '#f9f9f9',
    width: '100%',
    borderRadius: 16,
    alignItems: 'center',
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  settingsButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
  },
  settingsText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
