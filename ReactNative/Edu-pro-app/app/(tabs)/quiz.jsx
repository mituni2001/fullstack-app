import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const quizzes = {
  React: [
    {
      question: '🧠 What is React Native?',
      options: ['📱 A mobile framework', '💾 A database', '💻 A programming language'],
      answerIndex: 0,
    },
    {
      question: '🏢 Who developed React Native?',
      options: ['🔍 Google', '📘 Facebook', '🖥 Microsoft'],
      answerIndex: 1,
    },
    {
      question: '🎨 Which language is used for styling React Native apps?',
      options: ['🎯 CSS', '📜 JavaScript', '🔤 JSX'],
      answerIndex: 0,
    },
  ],
  HTML: [
    {
      question: '📄 What does HTML stand for?',
      options: [
        'HyperText Markup Language',
        'Hyper Transfer Markup Language',
        'Home Tool Markup Language',
      ],
      answerIndex: 0,
    },
    {
      question: '🔗 Which tag is used for hyperlinks?',
      options: ['<link>', '<a>', '<href>'],
      answerIndex: 1,
    },
    {
      question: '🖼 Which tag is used to display an image?',
      options: ['<img>', '<picture>', '<image>'],
      answerIndex: 0,
    },
  ],
  Java: [
    {
      question: '☕ What is Java?',
      options: ['A database', 'A coffee brand', 'A programming language'],
      answerIndex: 2,
    },
    {
      question: '⚙️ Java runs on which principle?',
      options: ['Compile and Execute', 'Write Once, Run Anywhere', 'Only Windows'],
      answerIndex: 1,
    },
    {
      question: '🔢 Which data type is used for decimal numbers?',
      options: ['int', 'float', 'char'],
      answerIndex: 1,
    },
  ],
  CSharp: [
    {
      question: '🧮 What is C# primarily used for?',
      options: ['Web development', 'Game development', 'Data analysis'],
      answerIndex: 1,
    },
    {
      question: '🎮 Which engine uses C#?',
      options: ['Unity', 'Unreal', 'CryEngine'],
      answerIndex: 0,
    },
    {
      question: '🧾 What is the file extension for C# code files?',
      options: ['.java', '.cs', '.cpp'],
      answerIndex: 1,
    },
  ],
};

export default function QuizApp() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = selectedTopic ? quizzes[selectedTopic] : [];

  const handleAnswer = (index) => {
    setSelected(index);
    if (index === questions[currentIndex].answerIndex) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelected(null);
      } else {
        setShowScore(true);
      }
    }, 600);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowScore(false);
    setSelected(null);
  };

  const goBackToTopics = () => {
    resetQuiz();
    setSelectedTopic(null);
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#ccffcc', '#cceeff']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        {!selectedTopic ? (
          <>
            <Text style={styles.title}>🎯 Choose a Quiz Topic</Text>
            <FlatList
              data={Object.keys(quizzes)}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.topicButton}
                  onPress={() => setSelectedTopic(item)}
                >
                  <Text style={styles.topicText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </>
        ) : showScore ? (
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={goBackToTopics} style={styles.backButton}>
              <Text style={styles.backText}>⬅</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 40, alignItems: 'center' }}>
              <Text style={styles.title}>🎉 Quiz Completed</Text>
              <Text style={styles.scoreText}>
                🏁 You scored {score} out of {questions.length}
              </Text>
              <TouchableOpacity style={styles.restartButton} onPress={resetQuiz}>
                <Text style={styles.restartText}>🔁 Restart Quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.topicTitle}>📘 {selectedTopic}</Text>
            <Text style={styles.counterText}>
              📝 Question {currentIndex + 1} of {questions.length}
            </Text>
            <Text style={styles.questionText}>
              {questions[currentIndex].question}
            </Text>

            {questions[currentIndex].options.map((option, index) => {
              const isCorrect = index === questions[currentIndex].answerIndex;
              const isSelected = index === selected;

              let backgroundColor = '#fff';
              if (selected !== null) {
                if (isSelected && isCorrect) backgroundColor = '#4ade80';
                else if (isSelected && !isCorrect) backgroundColor = '#f87171';
                else backgroundColor = '#f3f4f6';
              }

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor,
                      borderColor: selected !== null ? '#d1d5db' : '#60a5fa',
                    },
                  ]}
                  onPress={() => handleAnswer(index)}
                  disabled={selected !== null}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: 20,
  },
  topicTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  counterText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 12,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#1f2937',
  },
  optionButton: {
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
  },
  topicButton: {
    backgroundColor: '#60a5fa',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  topicText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  scoreText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600',
    color: '#2563eb',
    marginVertical: 20,
  },
  restartButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 12,
  },
  restartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 10,
  },
  backText: {
    fontSize: 26,
    color: '#1f2937',
    fontWeight: '700',
  },
});




