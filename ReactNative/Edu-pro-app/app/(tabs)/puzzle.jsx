import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const puzzles = [
  {
    question: "🕯️ I’m tall when I’m young, and I’m short when I’m old. What am I?",
    answer: "A candle",
  },
  {
    question: "🎹 What has keys but can’t open locks?",
    answer: "A piano",
  },
  {
    question: "🥚 What has to be broken before you can use it?",
    answer: "An egg",
  },
  {
    question: "🌊 What runs but never walks?",
    answer: "A river",
  },
];

export default function MiniPuzzleScreen() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => setShowAnswer(!showAnswer);

  const nextPuzzle = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % puzzles.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🧩 Daily Puzzle</Text>

      <View style={styles.card}>
        <Text style={styles.question}>{puzzles[index].question}</Text>
        {showAnswer && (
          <Text style={styles.answer}>💡 Answer: {puzzles[index].answer}</Text>
        )}
      </View>

      <TouchableOpacity onPress={toggleAnswer} style={styles.button}>
        <Text style={styles.buttonText}>
          {showAnswer ? '🙈 Hide Answer' : '🤔 Show Answer'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={nextPuzzle}
        style={[styles.button, { backgroundColor: '#10b981' }]}
      >
        <Text style={styles.buttonText}>➡️ Next Puzzle</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    color: '#1f2937',
  },
  answer: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
    color: '#2563eb',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    marginBottom: 14,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
