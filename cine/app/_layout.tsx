import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="onboarding" options={{headerShown: false, presentation: 'modal'}}/>
        <Stack.Screen name="login" options={{headerShown: false, presentation:'modal'}}/>
        <Stack.Screen name="tabs" options={{headerShown: false}}/>
        <Stack.Screen name="movie_details" options={{headerShown: false}}/>
        
    </Stack>

  )
};

export default RootLayout