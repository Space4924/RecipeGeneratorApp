import { useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  console.log("Starting Index")
  const router=useRouter();
 useEffect(() => {
  
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      console.log(token);
      if (token) {
        router.replace('/tabs/home');
      }
      else router.replace('/starting');
    };
    checkToken();
  }, []);
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
}
