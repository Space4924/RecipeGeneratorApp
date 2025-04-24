import Color from "@/services/Color";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { AuthProvider } from "@/Context/AuthContext";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const router = useRouter();
  const [loaded] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-dark': require('../assets/fonts/Outfit-Bold.ttf'),
    'outfit-light': require('../assets/fonts/Outfit-Light.ttf'),
  });

  if (!loaded) return null;

  return (
    <AuthProvider>
      <StatusBar style="inverted" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: Color.BACKGROUNDCOLOR,
          },
        }}
      >
        <Stack.Screen name="starting" />
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="tabs" />

      </Stack>
    </AuthProvider>
  );
}
