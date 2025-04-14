import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useRef } from 'react';
import Color from '@/services/Color';
import axios from 'axios';
import ActionSheet from "react-native-actions-sheet";
import {GENERATE_OPTION_PROMPT,GENERATE_COMPLETE_RECIPE} from '../../services/PROMPT'
import useAPI from '@/hooks/useAPI';
import useChatAPI from '@/hooks/useChatAPI';
import Loader from '@/services/Loader';
import RecipeScreen from './RecipeShowPage';

const i1 = require('../../assets/images/i1.png');
export default function Home() {
    const actionSheetRef = useRef(null);
    const [valid, setValid] = useState<boolean>(false);
    const [input, setInput] = useState('');
    const [page, setPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fullrecipe, setFullRecipe] = useState([]);
    const [recipeOption, setRecipeOptions] = useState<{ recipeName: string; description: string }[]>([]);

    const ShowMore = async (recipe: any) => {
        setValid(true);
        actionSheetRef.current?.hide();
        const prompt = recipe.description+" " + recipe.recipeName+" " + GENERATE_COMPLETE_RECIPE;
        const content = await useChatAPI(prompt);
        console.log(content);
        const recipes = JSON.parse(content);
        console.log(recipes);
        setFullRecipe(recipes);
        setValid(false);
        setPage(true);
    }

    const HandleSubmit = async () => {
        setLoading(true);
        if (!input) { Alert.alert("Please Enter Details"); return; }

        const prompt = "User Instruction: " +input+ " prompt: "+ GENERATE_OPTION_PROMPT;
        console.log(prompt);
        const content = await useChatAPI(prompt);
        console.log("content",content);
        const recipes = JSON.parse(content);
        console.log(recipes);
        setRecipeOptions(recipes);
        actionSheetRef.current?.show();
        setLoading(false);
    };
    const onClose=()=>{
        setPage(false);
    }


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
                <TouchableOpacity disabled={loading} style={styles.btn} onPress={HandleSubmit}>
                    {loading ? <ActivityIndicator size="small" color="#0000ff" /> : <Image source={i1} style={styles.img} />}
                    <Text style={styles.btnText}>Generate Recipe</Text>
                </TouchableOpacity>
            </View>

            <ActionSheet ref={actionSheetRef}>
                <View style={styles.actionSheetContainer}>
                    <Text style={styles.headingTxt}>Which One Would You like the most</Text>
                    <View style={styles.recipeOptionContainer}>
                        {Array.isArray(recipeOption) && recipeOption.length > 0 ? (
                            recipeOption.map((recipe, index) => (
                                <TouchableOpacity disabled={valid} onPress={() => ShowMore(recipe)} key={index} style={[styles.recipeOptionContainer, { marginBottom: 12 }]}>
                                    <Text style={{ fontFamily: 'outfit-dark', fontSize: 20, marginBottom: 4 }}>
                                        {recipe?.recipeName}
                                    </Text>
                                    <Text style={{ fontFamily: 'outfit', color: Color.GREY, fontSize: 18 }}>
                                        {recipe?.description}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={{ fontFamily: 'outfit-light', color: Color.GREY }}>
                                No recipes available.
                            </Text>
                        )}
                    </View>
                </View>
            </ActionSheet>

            {valid && <Loader valid={valid} />} 
            { page && <RecipeScreen page={page} fullRecipe={fullrecipe} onClose={onClose} />}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        height: 350,
        padding: 15,
        margin: 10,
        backgroundColor: '#ebebeb',
        borderRadius: 20,
        display: 'flex'

    },
    label: {
        fontSize: 22,
        fontWeight: '600',
        color: Color.PRIMARY,
        marginBottom: 'auto',
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
        height: 130,
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
        marginVertical: 18,
        gap: 10

    },
    btnText: {
        fontSize: 16,
        fontFamily: 'outfit'
    },
    actionSheetContainer: {
        backgroundColor: '#ebebeb',
        padding: 25
    },
    headingTxt: {
        fontSize: 32,
        fontFamily: 'outfit',
        marginHorizontal: 'auto',
    },
    recipeOptionContainer: {
        padding: 15,
        borderWidth: 0.5,
        borderRadius: 15,
        marginTop: 15
    }

});
