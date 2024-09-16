import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';


const OnboardingLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="Username" options={{headerShown: false}}/>
        <Stack.Screen name="Email" options={{headerShown: false}}/>
        <Stack.Screen name="CreatePassword" options={{headerShown: false}}/>
    </Stack>

  )
};

export default OnboardingLayout;