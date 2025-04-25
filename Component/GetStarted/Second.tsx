import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '@/services/Color'
// import { useRoute } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import useAPI from '@/hooks/useAPI';

export default function Second() {
    const [connected, setConnected] = useState<boolean | null>(null);
    useEffect(() => {
        const checkConnection = async () => {
          try {
            const res = await useAPI('/health', {}, 'GET');
            console.log(res);
            console.log("working");
            if (res.data?.status === 'ok') {
              setConnected(true);
            } else {
              setConnected(false);
            }
          } catch (err) {
            setConnected(false);
          }
        };
    
        checkConnection();
      }, []);
      console.log("connected",connected);
    console.log("GetStarted/Second");
    const router=useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to an amazing food recipe App</Text>
            <Text style={styles.secondText}>Generate Delicious Recipes in seconds with the power of AI</Text>
            <TouchableOpacity style={styles.btn} onPress={()=>router.push('./auth')}>
                <Text style={styles.btnText}>Let's Start</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height:'28%',
        justifyContent: 'center'

    },
    text: {
        width: '90%',
        fontSize: 28,
        textAlign: 'center',
        marginHorizontal: 'auto',
        fontFamily: 'outfit-dark',
        color:Color.PRIMARY
    },
    secondText: {
        fontSize: 14,
        width:'80%',
        fontWeight: '300',
        marginHorizontal: 'auto',
        marginVertical: 6,
        textAlign:'center',
        fontFamily: 'outfit-light',
        color:Color.PRIMARY
    },
    btn: {
        width: '90%',
        backgroundColor: 'green',
        borderRadius: 12,
        marginHorizontal: 'auto',
        marginVertical: 15

    },
    btnText: {
        fontSize: 16,
        margin: 'auto',
        padding: 8,
        fontFamily: 'outfit',
        color:Color.WHITE
    },
})