import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const quizzes = [
  {
    code: `x = 5\ny = 10\nprint(x + y * 2)`,
    options: ['30', '25', '20', '15'],
    correct: '25',
  },
  {
    code: `def add(a, b):\n  return a + b\n\nprint(add(2, 3))`,
    options: ['23', '5', 'Error', 'None'],
    correct: '5',
  },
  {
    code: `a = [1, 2, 3]\nprint(a[1])`,
    options: ['1', '2', '3', 'Error'],
    correct: '2',
  },
];

export default function CodeOutputQuiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const current = quizzes[index];

  const handleOption = (option) => {
    setSelected(option);
    setShowResult(true);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % quizzes.length);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <LinearGradient colors={['#ffffff', '#ccffcc', '#cceeff']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>💻 Predict the Output</Text>

          <View style={styles.codeBox}>
            <Text style={styles.codeText}>{current.code}</Text>
          </View>

          {current.options.map((opt, i) => {
            const isSelected = selected === opt;
            const isCorrect = opt === current.correct;

            let backgroundColor = '#e0e7ff'; // default
            if (showResult) {
              if (isSelected && isCorrect) backgroundColor = '#34d399'; // green
              else if (isSelected && !isCorrect) backgroundColor = '#f87171'; // red
              else if (isCorrect) backgroundColor = '#d1fae5'; // soft green
            }

            return (
              <TouchableOpacity
                key={i}
                style={[styles.option, { backgroundColor }]}
                onPress={() => handleOption(opt)}
                disabled={showResult}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            );
          })}

          {showResult && (
            <Text style={styles.resultText}>
              {selected === current.correct
                ? '✅ Correct!'
                : `❌ Incorrect. Correct Answer: ${current.correct}`}
            </Text>
          )}

          <TouchableOpacity onPress={next} style={styles.nextButton}>
            <Text style={styles.nextText}>➡️ Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 24,
  },
  codeBox: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  codeText: {
    fontFamily: 'Courier',
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    color: '#334155',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 30,
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

