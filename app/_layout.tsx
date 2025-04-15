import Color from "@/services/Color";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { AuthProvider } from "@/Context/AuthContext";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-dark': require('../assets/fonts/Outfit-Bold.ttf'),
    'outfit-light': require('../assets/fonts/Outfit-Light.ttf'),
  });
  return <>
    <AuthProvider>
      <Stack initialRouteName="index"
        screenOptions={{
          contentStyle: {
            backgroundColor: Color.BACKGROUNDCOLOR, // this sets background for every screen
          },
        }}>
        <StatusBar style="auto" />
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  </>

}
