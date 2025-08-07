import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Chapters({ course }) {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>Chapters</Text>

      <FlatList
        data={course?.chapters}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.chapterContainer}
            onPress={() =>
              router.push({
                pathname: '/ChapterView',
                params: {
                  chapterParams: JSON.stringify(item),
                  chapterIndex: index,
                },
              })
            }
          >
            <View style={styles.chapterLeft}>
              <Text style={styles.chapterText}>{index + 1}.</Text>
              <Text style={styles.chapterText}>{item?.chapterName}</Text>
            </View>
            <Ionicons name="play" size={24} color="#007bff" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chapterContainer: {
    padding: 18,
    borderWidth: 0.5,
    borderRadius: 15,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ccc',
  },
  chapterLeft: {
    flexDirection: 'row',
    gap: 10,
  },
  chapterText: {
    fontFamily: 'outfit',
    fontSize: 18,
  },
});