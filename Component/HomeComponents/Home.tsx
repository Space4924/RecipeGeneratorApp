import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useRef } from 'react';
import Color from '@/services/Color';
import ActionSheet from "react-native-actions-sheet";
import {GENERATE_OPTION_PROMPT,GENERATE_COMPLETE_RECIPE} from '../../services/PROMPT'
import Loader from '@/services/Loader';
import RecipeScreen from './RecipeShowPage';
import usePhoto from '@/hooks/usePhoto';
import DefaultRecipe from './DefaultRecipe';
import ChatGPT from '@/hooks/useChatAPI';
const i1 = require('../../assets/images/i1.png');

export default function Home() {
    const actionSheetRef = useRef(null);
    const [valid, setValid] = useState<boolean>(false);
    const [input, setInput] = useState('');
    const [page, setPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fullrecipe, setFullRecipe] = useState([]);
    const [ImageURL,setImageURL]=useState<string>("");
    const [recipeOption, setRecipeOptions] = useState<{ recipeName: string; description: string }[]>([]);

    const ShowMore = async (recipe: any) => {
        setValid(true);
        actionSheetRef.current?.hide();
        const prompt = "recipe Description " +recipe.description+", " +"recipe Name "+ recipe.recipeName+", " + GENERATE_COMPLETE_RECIPE;
        const content = await ChatGPT(2,prompt);
        console.log(content);
        const recipes = JSON.parse(content);
        console.log("reciep.imagePrompt" +recipes.imagePrompt);
        const ImagePrompt=recipes.imagePrompt;
        const ImageURL=await usePhoto(ImagePrompt);
        console.log(ImageURL);
        setImageURL(ImageURL?.data);
        // console.log(recipes);
        setFullRecipe(recipes);
        setValid(false);
        setPage(true);
    }

    const HandleSubmit = async () => {
        setLoading(true);
        if (!input) { Alert.alert("Please Enter Details"); return; }

        const prompt = "User Instruction: " +input+ ", prompt: "+ GENERATE_OPTION_PROMPT;
        console.log(prompt);
        const content = await ChatGPT(1,prompt);
        console.log("content",content);
        const recipes = JSON.parse(content);
        console.log(recipes);
        setRecipeOptions(recipes);
        actionSheetRef.current?.show();
        setLoading(false);
    };
    const onClose=()=>{
        setPage(false);
        actionSheetRef.current?.show();
    }
    const CloseTheTerminal=()=>{
        actionSheetRef.current?.hide();
        setRecipeOptions([]);
        setFullRecipe([]);
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
                    <Text style={styles.btnText}>Generate Recipes</Text>
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
                    <TouchableOpacity onPress={CloseTheTerminal} style={styles.closeBtn}>
                              <Text style={styles.closeText}>✖ Close</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
            <DefaultRecipe setInput={setInput}/>

            {valid && <Loader valid={valid} />} 
            { page && <RecipeScreen image={ImageURL} page={page} fullRecipe={fullrecipe} onClose={onClose} />}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        height: 300,
        padding: 15,
        margin: 6,
        marginTop:38,
        backgroundColor: Color.BACKGROUNDCOLOR,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        display: 'flex'

    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        fontFamily:'outfit',
        color: Color.PRIMARY,
        margin:'auto',
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
        marginVertical: 18,
        gap: 10
    },
    btnText: {
        fontSize: 17,
        fontFamily: 'outfit',
        color:Color.PRIMARY,
        // fontWeight:'600',
    },
    actionSheetContainer: {
        backgroundColor: '#ebebeb',
        padding: 25
    },
    headingTxt: {
        fontSize: 30,
        fontFamily: 'outfit',
        color:Color.PRIMARY,
        textAlign:'center',
        marginHorizontal: 'auto',
    },
    recipeOptionContainer: {
        padding: 15,
        borderWidth: 0.5,
        borderRadius: 15,
        marginTop: 15
    },
     closeBtn: {
        padding: 16,
        marginTop:18,
        borderRadius:12,
        backgroundColor: Color.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
      },
      closeText: {
        fontSize: 16,
        color: '#444',
        fontWeight: '500',
      },
});
