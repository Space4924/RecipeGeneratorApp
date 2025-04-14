import Color from '@/services/Color';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const RecipeScreen = ({ page, fullRecipe, onClose }: any) => {
  if (!fullRecipe) return null;

  const {
    recipeName,
    description,
    cookTime,
    serve,
    totalCalories,
    ingredients,
    steps,
  } = fullRecipe;

  return (
    fullRecipe?<Modal visible={page} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>{recipeName}</Text>
          <Text style={styles.description}>{description}</Text>

          <Image
            source={{
              uri:
                'https://plus.unsplash.com/premium_photo-1661762555601-47d088a26b50?q=80&w=2092&auto=format&fit=crop',
            }}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.badgeContainer}>
            <Badge label={`⏱ ${cookTime}`} />
            <Badge label={`🍽 Serves: ${serve}`} />
            <Badge label={`🔥 ${totalCalories} cal`} />
          </View>

          <Section title="🧂 Ingredients">
            {ingredients?.map((item: any, index: number) => (
              <View key={index} style={styles.card}>
                <Text style={styles.ingredientText}>
                  {item.icon} {item.name}
                  {item.preparation ? ` (${item.preparation})` : ''}
                </Text>
                <Text style={styles.quantityText}>{item.quantity}</Text>
              </View>
            ))}
          </Section>

          <Section title="👨‍🍳 Instructions">
            {steps?.map((step: string, index: number) => (
              <View key={index} style={styles.stepItem}>
                <Text style={styles.stepNumber}>{index + 1}.</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </Section>
        </ScrollView>

        <Pressable onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeText}>✖ Close</Text>
        </Pressable>
      </View>
    </Modal>:null
  );
};

// Reusable Components
const Badge = ({ label }: { label: string }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{label}</Text>
  </View>
);

const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  content: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:'outfit-dark',
    marginBottom: 6,
    color: Color.PRIMARY,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily:'outfit-light',
    color: Color.GREY,
    marginBottom: 16,
    // fontStyle: 'italic',
  },
  image: {
    width: screenWidth - 32,
    height: 220,
    borderRadius: 16,
    alignSelf: 'center',
    marginBottom: 20,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  badge: {
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  badgeText: {
    fontSize: 13,
    fontFamily:'outfit',
    color: '#444',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: Color.PRIMARY,
  },
  sectionContent: {
    gap: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 1,
    shadowColor: Color.PRIMARY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  quantityText: {
    fontSize: 14,
    color: '#777',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#444',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#444',
  },
  closeBtn: {
    padding: 16,
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

export default RecipeScreen;
