import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Color from '@/services/Color';
import { StatusBar } from 'expo-status-bar';

export default function TabsLayout() {
    return (
        <>

        <StatusBar style="dark" />
        <Tabs
            screenOptions={({ route }) => ({
                contentStyle: { backgroundColor: Color.BACKGROUNDCOLOR },
                tabBarActiveTintColor: Color.PRIMARY,
                tabBarInactiveTintColor: Color.GREY,
                tabBarStyle: {
                    height: 50,
                    paddingBottom: 2,
                    backgroundColor: Color.BACKGROUNDCOLOR,
                },
                tabBarIcon: ({ color }) => {
                    let iconName = 'home-outline';
                    if (route.name === 'profile') iconName = 'person-outline';
                    else if (route.name === 'history') iconName = 'time-outline';
                    return <Ionicons name={iconName as any} size={24} color={color} />;
                },
                headerShown: false,
            })}
        >

            <Tabs.Screen name="home" options={{ title: 'Home' }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
            <Tabs.Screen name="history" options={{ title: 'History' }} />
        </Tabs>
        </>
    );
}
