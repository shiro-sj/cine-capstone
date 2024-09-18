import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';


const OnboardingLayout = () => {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/tabs'} />
  }

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