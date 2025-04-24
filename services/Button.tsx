import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
// import Modal from ''
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const LogoutSlider = () => {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    const handleConfirmLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('user');
        setIsVisible(false);
        router.replace('/starting'); // Redirect to landing page
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.logoutButton} onPress={() => setIsVisible(true)}>
                <View style={{margin:'auto',flexDirection:'row',gap:10}}>

                <Ionicons name="log-out-outline" size={20} color="#fff" />
                <Text style={styles.logoutText}>Logout</Text>
                </View>
            </TouchableOpacity>

            <Modal
                isVisible={isVisible}
                onBackdropPress={() => setIsVisible(false)}
                onSwipeComplete={() => setIsVisible(false)}
                swipeDirection="down"
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <View style={styles.swipeIndicator} />
                    <Text style={styles.modalTitle}>Logout?</Text>
                    <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                    <View style={styles.modalActions}>
                        <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.cancelBtn}>
                            <Text style={{ color: '#333' }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleConfirmLogout} style={styles.confirmBtn}>
                            <Text style={{ color: 'white' }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default LogoutSlider;

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        width: '100%'
    },
    logoutButton: {
        width:'100%',
        flexDirection: 'row',
        backgroundColor: '#e74c3c',
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    logoutText: {
        color: '#fff',
        fontWeight: '600',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    swipeIndicator: {
        width: 400,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 2.5,
        marginBottom: 12,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.8,
    },
    cancelBtn: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        width: '45%',
        alignItems: 'center',
    },
    confirmBtn: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#e74c3c',
        width: '45%',
        alignItems: 'center',
    },
});
