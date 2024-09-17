import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';


const OnboardingLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="username" options={{headerShown: false}}/>
        <Stack.Screen name="email" options={{headerShown: false}}/>
        <Stack.Screen name="password" options={{headerShown: false}}/>
        <Stack.Screen name="welcome_page" options={{headerShown: false}}/>
    </Stack>

  )
};

export default OnboardingLayout;