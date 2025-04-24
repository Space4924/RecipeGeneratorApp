import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '@/services/Color';
import { Ionicons } from '@expo/vector-icons';

const creditOptions = [
    { id: '1', credits: 5, price: 25 },
    { id: '2', credits: 10, price: 45 },
    { id: '3', credits: 8, price: 35 },
    { id: '4', credits: 15, price: 60 },
    { id: '5', credits: 20, price: 75 },
    { id: '6', credits: 30, price: 99 },
    { id: '7', credits: 50, price: 149 },
    { id: '8', credits: 100, price: 249 },
];

const BuyCredits = () => {
    const router = useRouter();
    const [credits, setCredits] = useState<number>(0);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setCredits(parsedUser.credits || 0);
                }
            } catch (err) {
                console.error('Failed to load user from storage', err);
            }
        };
        loadUser();
    }, []);

    const handleBuy = (credits: number, price: number) => {
        Alert.alert(
            'Confirm Purchase',
            `Buy ${credits} credits for ₹${price}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Buy',
                    onPress: async () => {
                        Alert.alert('Success', `${credits} credits purchased!`);
                        router.back();
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }: { item: typeof creditOptions[0] }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleBuy(item.credits, item.price)}
            activeOpacity={0.8}
        >
            <Text style={styles.cardCredits}>{item.credits} Credits</Text>
            <Text style={styles.cardPrice}>₹{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Back button */}
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color={Color.PRIMARY} />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Buy Credits</Text>

            {/* Current credits */}
            <Text style={styles.creditsText}>
                You have <Text style={styles.creditsNumber}>{credits}</Text> credits
            </Text>

            <FlatList
                data={creditOptions}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    backText: {
        fontSize: 16,
        fontFamily: 'outfit',
        color: Color.PRIMARY,
        marginLeft: 4,
    },
    title: {
        fontSize: 28,
        fontFamily: 'outfit-dark',
        // fontWeight: 'bold',
        textAlign: 'center',
        color: Color.PRIMARY,
        marginBottom: 6,
    },
    creditsText: {
        fontSize: 18,
        color: '#34495e',
        fontFamily: 'outfit',
        textAlign: 'center',
        marginBottom: 20,
    },
    creditsNumber: {
        color: Color.PRIMARY,
        fontFamily: 'outfit-dark',
    },
    list: {
        paddingBottom: 40,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        width: '48%',
        paddingVertical: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        alignItems: 'center',
    },
    cardCredits: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2c3e50',
    },
    cardPrice: {
        fontSize: 16,
        marginTop: 8,
        color: Color.PRIMARY,
        fontWeight: '600',
    },
});

export default BuyCredits;
