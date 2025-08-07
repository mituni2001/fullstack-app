import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Progress from 'react-native-progress';

export default function ChapterView() {
  const { chapterParams, chapterIndex } = useLocalSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(chapterIndex) || 0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  let chapter = null;

  try {
    chapter =
      typeof chapterParams === 'string'
        ? JSON.parse(chapterParams)
        : chapterParams;
  } catch (error) {
    console.error('JSON parse error:', error);
  }

  if (!chapter || !chapter.content) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', fontSize: 18 }}>
          Error loading chapter content.
        </Text>
      </View>
    );
  }

  const getProgress = () => {
    return (currentPage + 1) / chapter.content.length;
  };

  const handleChapterComplete = async () => {
    setLoading(true);
    try {
      // Optional: send completion to backend
      router.replace('/home');
    } catch (err) {
      console.error('Error completing chapter:', err);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Progress.Bar
        progress={getProgress()}
        width={Dimensions.get('screen').width * 0.85}
        color="#007bff"
      />

      <View style={{ marginTop: 20 }}>
        <Text style={styles.heading}>
          {chapter?.content[currentPage]?.topic}
        </Text>
        <Text style={styles.description}>
          {chapter?.content[currentPage]?.explain}
        </Text>

        {chapter?.content[currentPage]?.code && (
          <Text style={styles.codeBlock}>
            {chapter?.content[currentPage]?.code}
          </Text>
        )}

        {chapter?.content[currentPage]?.example && (
          <Text style={styles.example}>
            {chapter?.content[currentPage]?.example}
          </Text>
        )}
      </View>

      <View style={styles.footer}>
        {currentPage < chapter.content.length - 1 ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => setCurrentPage(currentPage + 1)}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.finishButton}
            onPress={handleChapterComplete}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Finish</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'outfit-bold',
  },
  description: {
    fontSize: 18,
    fontFamily: 'outfit',
    marginTop: 10,
    color: '#333',
  },
  codeBlock: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    fontFamily: 'monospace',
  },
  example: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    fontFamily: 'outfit',
    color: '#444',
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 25,
    right: 25,
  },
  nextButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  finishButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});