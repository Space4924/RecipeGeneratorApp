import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, TextInput, Alert, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '@/services/Color';
import { useRouter } from 'expo-router';
import LogoutSlider from '@/services/Button';

const ProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>({
    name: '',
    email: '',
    phoneNo: '',
    id: '',
  });
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [editableName, setEditableName] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setEditableName(parsedUser.name);
        }
      } catch (err) {
        console.error('Failed to load user from storage', err);
      }
    };
    loadUser();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setPhotoURL(uri);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('jwtToken');
          await AsyncStorage.removeItem('user');
          router.replace('/starting')
        },
      },

    ]);
  };

  const handleNameSave = () => {
    setUser((prev: any) => ({ ...prev, name: editableName }));
    setEditing(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>

      
      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        <Image
          source={photoURL ? { uri: photoURL } : require('../../assets/images/1.jpg')}
          style={styles.image}
        />
        <View style={styles.avatarAccessory}>
          <Ionicons name="camera" size={18} color="white" />
        </View>
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Name</Text>
        {editing ? (
          <View style={styles.editRow}>
            <TextInput
              value={editableName}
              onChangeText={setEditableName}
              style={styles.input}
              placeholder="Enter your name"
            />
            <TouchableOpacity onPress={handleNameSave}>
              <Ionicons name="checkmark" size={24} color="#2ecc71" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.editRow} onPress={() => setEditing(true)}>
            <Text style={styles.text}>{user.name || 'Not Set'}</Text>
            <Ionicons name="create-outline" size={20} color="#2980b9" />
          </TouchableOpacity>
        )}

        <Text style={styles.label}>Email</Text>
        <Text style={styles.text}>{user.email || 'Not Set'}</Text>

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.editRow}>
          <Text style={styles.text}>
            {/* { user!==null && ( phoneVisible ? user.phoneNo : user?.phoneNo.replace(/.(?=.{4})/g, '*'))} */}
            {/* {user.phoneNo} */}
            {user !== null && (
              phoneVisible
                ? user.phoneNo
                : user.phoneNo
                  ? user.phoneNo.replace(/.(?=.{4})/g, '*')
                  : 'N/A' // or null, or empty string — your fallback
            )}
          </Text>
          <TouchableOpacity onPress={() => setPhoneVisible(!phoneVisible)}>
            <Ionicons
              name={phoneVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>User ID</Text>
        <Text style={styles.text}>#{user.id?.slice(0, 8) || 'N/A'}</Text>
      </View>

      {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity> */}
      <LogoutSlider/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#ebebeb',
    flexGrow: 1,
    alignItems: 'center',
    // marginVertical:'auto'
  },
  innerContainer:{
    paddingTop: 60,
    paddingHorizontal: 20,
    width:'100%'
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
    position: 'relative',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#2ecc71',
  },
  avatarAccessory: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    backgroundColor: '#2ecc71',
    borderRadius: 20,
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#95a5a6',
    marginTop: 12,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#2d3436',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    color: '#2d3436',
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10,
  },
  logoutText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
