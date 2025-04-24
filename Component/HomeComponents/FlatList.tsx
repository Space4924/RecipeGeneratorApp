import { StyleSheet, Image, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react'
import Color from '@/services/Color';
const { width } = Dimensions.get('window');
const cardWidth = width * 0.44;
const cardMarginHorizontal = width*0.02;
interface FoodItemType { name: string; iconn: keyof typeof FontAwesome5.glyphMap; details: string; image?: string; }
const FoodCard = ({ item, setInput }: { item: FoodItemType, setInput: React.Dispatch<React.SetStateAction<string>> }) => {
    const PutInInput = (item: FoodItemType) => {
        console.log("Choosen Item is: ", item);
        setInput(item.details);
    }
    return (
        <TouchableOpacity onPress={() => PutInInput(item)} style={styles.foodCard}>
            {item.image && <Image source={{ uri: item.image }} style={styles.cardImage} />}
            {!item.image && <View style={styles.iconPlaceholder}><FontAwesome5 name={item.iconn} size={28} color="#4CAF50" /></View>}
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDetails} numberOfLines={2} ellipsizeMode="tail">{item.details}</Text>
        </TouchableOpacity>
    )
}
export default FoodCard;


const styles = StyleSheet.create({
    foodCard: {
        width: cardWidth,
        height:'auto',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: cardMarginHorizontal,
        marginBottom: 16,
        padding: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center'
    },
    cardImage: {
        width: '100%',
        height: 100, // Reduced image height
        borderRadius: 8,
        marginBottom: 8,
    },
    iconPlaceholder: {
        width: 60, // Reduced icon placeholder size
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e0f2f7',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 16, // Reduced title size
        fontFamily: 'outfit-dark',
        color: Color.PRIMARY,
        marginBottom: 4,
        textAlign: 'center',
    },
    cardDetails: {
        fontSize: 12, // Reduced details size
        color: '#555',
        textAlign: 'center',
    },
})