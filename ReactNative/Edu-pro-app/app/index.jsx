import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("./../assets/images/la.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Top Texts */}
      <View style={styles.topTextContainer}>
        <Text style={styles.topTitle}>Welcome to EduPro</Text>
        <Text style={styles.topSubtitle}>
          Transform your ideas into engaging educational content effortlessly with
          AI! 📚✨
        </Text>
      </View>

      {/* Bottom Section with light white backgrounds */}
      <View style={styles.overlay}>
        {/* First Section */}
        <View style={[styles.sectionContainer, styles.lightBackground]}>
          <Text style={[styles.sectionHeading, { marginTop: 10 }]}>
            Start Your Journey
          </Text>
          <TouchableOpacity
            style={styles.darkGrayButton}
            onPress={() => router.push("/login/signup")}
          >
            <Text style={styles.whiteButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>

        {/* Second Section */}
        <View style={[styles.sectionContainer, styles.lightBackground]}>
          <Text style={styles.sectionHeading}>Already with Us?</Text>
          <TouchableOpacity
            style={styles.blackButton}
            onPress={() => router.push("/login/signin")}
          >
            <Text style={styles.whiteButtonText}>Already have an Account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "space-between",
  },
  topTextContainer: {
    paddingTop: 60,
    paddingHorizontal: 25,
  },
  topTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "right",
    fontFamily: "outfit",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  topSubtitle: {
    fontSize: 20,        // bigger text
    color: "#DDE6F7",    // soft white-blue-gray color
    fontFamily: "outfit",
    textAlign: "right",
  },
  overlay: {
    padding: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  sectionContainer: {
    marginBottom: 25,
    padding: 20,
    borderRadius: 15,
  },
  lightBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.85)", // light white translucent background
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A237E", // Navy bright blue
    fontFamily: "outfit",
    marginBottom: 10,
    textAlign: "left",
  },
  darkGrayButton: {
    backgroundColor: "#333333", // Dark gray
    padding: 15,
    borderRadius: 10,
  },
  blackButton: {
    backgroundColor: "#000000", // Pure black
    padding: 15,
    borderRadius: 10,
  },
  whiteButtonText: {
    color: "#FFFFFF", // White text
    textAlign: "center",
    fontSize: 16,
    fontFamily: "outfit",
    fontWeight: "500",
  },
});







