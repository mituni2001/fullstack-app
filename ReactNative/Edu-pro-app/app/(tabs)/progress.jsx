import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  FlatList,
  Dimensions,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedProgressCircle = ({
  progress,
  radius = 60,
  strokeWidth = 10,
  color = "#3b82f6",
}) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const [displayProgress, setDisplayProgress] = useState(0);

  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    const listener = animatedProgress.addListener(({ value }) => {
      setDisplayProgress(Math.round(value));
    });

    return () => animatedProgress.removeListener(listener);
  }, [progress]);

  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        marginRight: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Svg height={radius * 2} width={radius * 2}>
        <Circle
          stroke="#eee"
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          stroke={color}
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${radius}, ${radius}`}
        />
      </Svg>
      <Text
        style={[
          styles.progressText,
          { color, width: radius * 2, textAlign: "center", top: radius - 20 },
        ]}
      >
        {displayProgress}%
      </Text>
    </View>
  );
};

const AnimatedProgressBar = ({ progress, color = "#3b82f6", widthBar = 180 }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 1200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const barWidth = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: [0, widthBar],
  });

  return (
    <View style={[styles.progressBarBackground, { width: widthBar }]}>
      <Animated.View style={[styles.progressBarFill, { width: barWidth, backgroundColor: color }]} />
    </View>
  );
};

export default function ProgressScreen() {
  const courses = [
    {
      id: "1",
      title: "React Native Fundamentals",
      progress: 30,
      color: "#3b82f6",
      description: "Build mobile apps with React Native",
    },
    {
      id: "2",
      title: "Python Programming",
      progress: 40,
      color: "#10b981",
      description: "Master Python for software and AI",
    },
    {
      id: "3",
      title: "Database Management",
      progress: 55,
      color: "#a855f7",
      description: "Understand relational databases and SQL",
    },
    {
      id: "4",
      title: "JavaScript Essentials",
      progress: 20,
      color: "#facc15",
      description: "Core JavaScript for web development",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Learning Progress</Text>
      <Text style={styles.subtitle}>Keep track of your courses</Text>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 20 }}
        renderItem={({ item }) => (
          <View style={styles.courseCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AnimatedProgressCircle
                progress={item.progress}
                color={item.color}
                radius={50}
                strokeWidth={8}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.courseTitle}>{item.title}</Text>
                <Text style={styles.courseDescription}>{item.description}</Text>
                <Text style={styles.courseProgressText}>
                  {item.progress}% completed
                </Text>
                <AnimatedProgressBar progress={item.progress} color={item.color} />
              </View>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  courseCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  courseDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  courseProgressText: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
    marginBottom: 4,
  },
  progressText: {
    position: "absolute",
    fontWeight: "700",
    fontSize: 22,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 10,
    borderRadius: 5,
  },
});






