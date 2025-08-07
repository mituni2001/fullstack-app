import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import BASE_URL from "../../constants/api";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/user/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Login successful ✅");
        router.push("/(tabs)/home");
      } else {
        Alert.alert("Login Failed", data.error || "Invalid credentials ⚠");
      }
    } catch (err) {
      Alert.alert("Error", err.message || "Network error occurred ❓");
    }
  };

  return (
    <View style={{ flex: 1, padding: 25, justifyContent: "center", backgroundColor: "black" }}>
      {/* Logo */}
      <Image
        source={require("./../../assets/images/logo.png")}
        style={{
          width: 200,
          height: 120,
          resizeMode: "contain",
          alignSelf: "center",
          marginBottom: 10,
        }}
      />

      {/* Title */}
      <Text style={styles.title}>Welcome Back 👋</Text>

      {/* Glass Container */}
      <BlurView intensity={50} tint="dark" style={styles.glassContainer}>
        {/* Email */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#fff"
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Password */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#fff"
            secureTextEntry
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Button */}
        <TouchableOpacity onPress={handleSignin} style={{ marginTop: 25 }}>
          <LinearGradient
            colors={["#FF4081", "#8E2DE2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </BlurView>

      {/* Sign Up Link */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
        <Text style={{ fontFamily: "outfit", color: "white" }}>Don't have an account?</Text>
        <Pressable onPress={() => router.push("/login/signup")}>
          <Text style={styles.signUpLink}> Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  glassContainer: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  inputWrapper: {
    borderRadius: 12,
    marginTop: 15,
    backgroundColor: "rgba(0,153,255,0.25)", // Blue glass background
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)", // White glass border
    overflow: "hidden",
  },
  textInput: {
    padding: 15,
    fontSize: 18,
    color: "white", // White text
    fontFamily: "outfit",
  },
  button: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  buttonText: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "outfit-bold",
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  signUpLink: {
    color: "#FFD700",
    fontFamily: "outfit-bold",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
});






