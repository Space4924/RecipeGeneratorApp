import { StyleSheet, Text, Image, View } from 'react-native'
import React from 'react'
import { Marquee } from '@animatereactnative/marquee'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Second from './Second';
const images = [
    require('../../assets/images/1.jpg'),
    require('../../assets/images/c1.jpg'),
    require('../../assets/images/2.jpg'),
    require('../../assets/images/c2.jpg'),
    require('../../assets/images/3.jpg'),
    require('../../assets/images/c3.jpg'),
    require('../../assets/images/4.jpg'),
    require('../../assets/images/5.jpg'),
    require('../../assets/images/6.jpg'),
];
export default function Landing() {
    console.log("GetStarted/landing")
    return (
        <GestureHandlerRootView style={styles.container}>
                <Marquee spacing={10} speed={1} style={{transform:[{rotate:'-5deg'}]}}>
                    <View style={styles.imageContainer}>
                        {
                            images.map((img, index) => (
                                <Image key={index} source={img} style={styles.img} />
                            ))
                        }
                    </View>
                </Marquee>
            
                <Marquee spacing={10} speed={0.5} style={{transform:[{rotate:'-5deg'}],marginVertical:20}}>
                    <View style={styles.imageContainer}>
                        {
                            images.map((img, index) => (
                                <Image source={img} key={index} style={styles.img} />
                            ))
                        }
                    </View>
                </Marquee>
            
                <Marquee spacing={10} speed={1.5} style={{transform:[{rotate:'-5deg'}]}}>
                    <View style={styles.imageContainer}>
                        {
                            images.map((img, index) => (
                                <Image source={img} key={index} style={styles.img} />
                            ))
                        }
                    </View>
                </Marquee>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container:{
        height:'72%',
        marginVertical:-20,
        // backgroundColor:'red'
    },
    imageContainer: {
        flexDirection: 'row',
        gap: 10,
        // height:500
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 10

    }
})