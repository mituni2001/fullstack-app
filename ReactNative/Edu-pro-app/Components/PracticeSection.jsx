// components/PracticeSection.jsx

import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { practiceOptions } from '../constants/options';
import { useRouter } from 'expo-router';

export default function PracticeSection() {
  const router = useRouter();

  const handlePress = (name) => {
    if (name === 'Quizz') router.push('/quiz');
    else if (name === 'Puzzels') router.push('/puzzle');
    else if (name === 'Question & Ans') router.push('/codequiz');
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.heading}>Practice</Text>
      <FlatList
        data={practiceOptions}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item.name)}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <Text style={styles.label}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  label: {
    position: 'absolute',
    padding: 10,
    fontFamily: 'outfit',
    fontSize: 15,
    color: 'white',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    textAlign: 'center',
  },
});
