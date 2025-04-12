import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Color from '@/services/Color';
import axios from 'axios';
import Constants from 'expo-constants';
// require('dotenv').config();

const i1 = require('../../assets/images/i1.png');
export default function Home() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    console.log(Constants.expoConfig?.extra?.openrouterApiKey)
    // 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
    const HandleSubmit = async () => {
        
    console.log(input);
      const resp = await axios.post('http://10.81.20.135:8001/chatapi',{input});
      console.log(resp);

    };
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.label}>
                    Generate Delicious Recipes in seconds with the power of AI and the App
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter The Recipe You want to know..."
                    placeholderTextColor={Color.SECONDRY}
                    multiline
                    numberOfLines={3}
                    maxLength={120}
                    onChangeText={setInput}
                    value={input}
                    keyboardType="default"
                    textAlignVertical="top"
                />
                <TouchableOpacity style={styles.btn} onPress={HandleSubmit}>
                    {loading ? <Image source={i1} style={styles.img} /> : <ActivityIndicator size="small" color="#0000ff" />}
                    <Text style={styles.btnText}>Generate Recipe</Text>
                </TouchableOpacity>
            </View>
            <View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        height: 280,
        padding: 15,
        margin: 10,
        backgroundColor: '#ebebeb',
        borderRadius: 20,
        display: 'flex'

    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: Color.PRIMARY,
        marginBottom: 8,
        marginHorizontal: 'auto',
        marginTop: 'auto',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: Color.PRIMARY,
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        height: 100,
        color: Color.WHITE,
        backgroundColor: Color.BACKGROUNDCOLOR,
    },
    img: {
        height: 26,
        width: 26
    },
    btn: {
        backgroundColor: 'green',
        height: 40,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
        gap: 10

    },
    btnText: {
        fontSize: 16,
        fontFamily: 'outfit'
    }

});
