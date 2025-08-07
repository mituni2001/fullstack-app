import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from '../context/usercontext';
import { useRouter } from 'expo-router';

export default function Header() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Hello, {user?.username || 'Guest'}</Text>
        <Text style={styles.subtitle}>Let's Get Started!</Text>
      </View>

      <TouchableOpacity onPress={() => router.push('/addcourse')}>
        <Text style={styles.addText}>+</Text>
        
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 30, fontWeight: 'bold' },
  subtitle: { fontSize: 23 },
  addText : {fontSize: 40, fontWeight: 'bold', color: '#000', marginRight: 5}
    
  });