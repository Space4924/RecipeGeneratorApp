import React, { useEffect, useState } from 'react';
import {View,Text,ScrollView,Image,TouchableOpacity,StyleSheet,Alert} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import useAPI from '@/hooks/useAPI';
import RecipeScreen from '../HomeComponents/RecipeShowPage';
import Color from '@/services/Color';

const History = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);

  const fetchData = async () => {
    const response = await useAPI('/fetch', {}, 'GET');
    setData(response.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const parseRecipeJSON = (content: string) => {
    try {
      const jsonStr = content.replace(/```json/, '').replace(/```/, '').trim();
      const parsed = JSON.parse(jsonStr);
      const mappedIngredients = parsed.ingredients.map((ing: any) => ({
        name: ing.item,
        quantity: ing.quantity,
        icon: ing.icon || '🔹',
      }));
      return {
        recipeName: parsed.recipeName,
        description: parsed.imagePrompt,
        cookTime: parsed.cookTime,
        serve: parsed.serve,
        totalCalories: parsed.totalCalories,
        ingredients: mappedIngredients,
        steps: parsed.steps,
      };
    } catch (error) {
      console.error('Parsing error:', error);
      return null;
    }
  };

  const handleOpen = (item: any) => {
    const content = item.response?.choices?.[0]?.message?.content;
    const recipe = parseRecipeJSON(content);
    if (recipe) {
      setSelectedRecipe(recipe);
      setShowModal(true);
    }
  };

  const handleDelete = (index: number) => {
    Alert.alert('Delete', 'Are you sure you want to remove this recipe?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const response = await useAPI(`/delete/${index}`, {}, 'DELETE');
          console.log(response.status);
          const updated = [...data];
          updated.splice(index, 1);
          setData(updated);
        },
      },
    ]);
  };

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome5 name="history" size={48} color={Color.GREY} />
      <Text style={styles.emptyText}>No Searched History</Text>
    </View>
  );

  return (
    <>
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {data.map((item, index) => {
            const content = item.response?.choices?.[0]?.message?.content;
            const parsed = parseRecipeJSON(content);
            if (!parsed) return null;

            const { recipeName, description } = parsed;
            const previewText = description?.slice(0, 100) + '...';
            const image =
              'https://images.unsplash.com/photo-1604908176834-650a1d46ad53?auto=format&fit=crop&w=500&q=80';

            const isPressed = pressedIndex === index;

            return (
              <View key={index} style={styles.cardContainer}>
                <TouchableOpacity
                  onPress={() => handleOpen(item)}
                  style={styles.card}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: image }} style={styles.cardImage} />
                  <View style={styles.cardText}>
                    <Text style={styles.title}>{recipeName}</Text>
                    <Text style={styles.description} numberOfLines={2}>
                      {previewText}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPressIn={() => setPressedIndex(index)}
                  onPressOut={() => setPressedIndex(null)}
                  onPress={() => handleDelete(index)}
                  style={[
                    styles.deleteButton,
                    isPressed && styles.deleteButtonPressed,
                  ]}
                >
                  <FontAwesome5
                    name="times"
                    size={24}
                    color={isPressed ? '#fff' : Color.PRIMARY}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}

      <RecipeScreen
        page={showModal}
        fullRecipe={selectedRecipe}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop:32,
    gap: 12,
  },
  cardContainer: {
    position: 'relative',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardText: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    paddingRight: 45, // leave enough space for the delete button
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'outfit',
    color: Color.PRIMARY,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Color.GREY,
    fontFamily: 'outfit-light',
  },
  deleteButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -15 }],
    padding: 10,
    borderRadius: 25,
    zIndex: 1,
  },
  deleteButtonPressed: {
    backgroundColor: 'red',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 120,
  },
  emptyText: {
    fontSize: 18,
    color: Color.GREY,
    marginTop: 12,
    fontFamily: 'outfit',
  },
});

export default History;
