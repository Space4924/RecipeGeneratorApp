import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SignIn from '@/Component/Authentication/SignIn'
import SignUp from '@/Component/Authentication/SignUp'
import useAuth from '@/hooks/useAuth'


export default function auth() {
    const { valid } = useAuth();
    if (valid) return <SignIn/>; return <SignUp/>

}
