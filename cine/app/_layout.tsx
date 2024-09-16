
const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="movieDetails/[name]" />
        </Stack>
    )
}

export default StackLayout;
=======
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movieDetails/[name]" />
    </Stack>

  )
};

export default RootLayout

