import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import colors from "../constants/colors";
import { UserProvider } from "../context/usercontext"; 

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.WHITE,
      }}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  }

  return (
    <UserProvider> 
      <Stack screenOptions={{ headerShown: false }} />
    </UserProvider>
  );
}
