import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Second from './Second'
import Landing from './Landing'

export default function Index() {
    return (
        <View style={styles.container}>
            <Landing/>
            <Second/>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        flex:1,
        height:'100%'
    },
    Com: {
        transform: [{ rotate: '-10deg' }]
    }
})