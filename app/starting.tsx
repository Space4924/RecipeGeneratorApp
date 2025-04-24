import { StyleSheet, Text, View } from 'react-native'
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react'
import Landing from '@/Component/GetStarted/Landing';
import Second from '@/Component/GetStarted/Second';

export default function index() {
  console.log("working FIne");
  return(
    <>
      <Landing />
      <Second />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  Com: {
    transform: [{ rotate: '-10deg' }]
  }
})