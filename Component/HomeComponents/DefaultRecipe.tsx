import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import foodData from '../../services/FoodData.json';
import Color from '@/services/Color';
import FoodCard from './FlatList';


interface FoodCategoryType { veg: FoodItemType[]; nonVeg: FoodItemType[]; }
interface FoodItemType { name: string; iconn: keyof typeof FontAwesome.glyphMap; details: string; image?: string; }
const numColumns = 2;

const FilterButton = ({ label, isActive, onPress }: { label: string; isActive: boolean; onPress: () => void; }) => (
    <TouchableOpacity style={[styles.filterButton, isActive && styles.activeFilterButton]} onPress={onPress}>
        <Text style={[styles.filterButtonLabel, isActive && styles.activeFilterButtonLabel]}>{label}</Text>
    </TouchableOpacity>
);
export default function FoodMenuGrid({setInput}:{setInput:React.Dispatch<React.SetStateAction<any>>}) {
    const [filter, setFilter] = useState<'all' | keyof FoodCategoryType>('all');
    const [data, setData] = useState<FoodCategoryType | null>(null);
    const [filteredItems, setFilteredItems] = useState<FoodItemType[]>([]);
    const [ready, setReady] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const prepare = async () => {
            try {
                await SplashScreen.preventAutoHideAsync();
                await Font.loadAsync(FontAwesome.font).then(() => setFontsLoaded(true));
                setData(foodData.foodItems as FoodCategoryType);
            } catch (e) {
                console.warn(e);
            } finally {
                setReady(true);
                await SplashScreen.hideAsync();
            }
        };
        prepare();
    }, []);

    useEffect(() => {
        if (data) {
            if (filter === 'all') {
                setFilteredItems([...data.veg, ...data.nonVeg]);
            } else {
                setFilteredItems(data[filter] || []);
            }
        }
    }, [data, filter]);

    if (!ready || !data || !fontsLoaded) {
        return null; // Or a loading indicator
    }

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                style={styles.filterBar}
                data={[{ key: 'all', label: 'All' }, { key: 'veg', label: 'Veg' }, { key: 'nonVeg', label: 'Non-Veg' }]}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <FilterButton
                        label={item.label}
                        isActive={filter === item.key}
                        onPress={() => setFilter(item.key as 'all' | 'veg' | 'nonVeg')}
                    />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterBarContent}
            />
            <FlatList
                data={filteredItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <FoodCard setInput={setInput}  item={item} />}
                numColumns={numColumns}
                // contentContainerStyle={styles.foodListContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        backgroundColor: '#ebebeb',
        borderRadius: 10,
        width: '96%',
        marginHorizontal: 'auto'
    },
    filterBar: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    filterBarContent: {
        flexGrow: 1,
        // alignItems: 'center',
        textAlign:'center'
    },
    filterButton: {
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 20,
        backgroundColor: '#eee',
        marginRight: 15,

        // height:20
    },
    activeFilterButton: { backgroundColor: '#4CAF50', },
    filterButtonLabel: { fontSize: 16, color: Color.PRIMARY },
    activeFilterButtonLabel: { color: '#fff' },
});