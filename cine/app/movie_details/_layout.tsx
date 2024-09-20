import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';


const MovieDetailsLayout = () => {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/tabs'} />
  }

  return (
    <Stack>
        <Stack.Screen name="[name]" options={{headerShown: false}}/>
    </Stack>

  )
};

export default MovieDetailsLayout;