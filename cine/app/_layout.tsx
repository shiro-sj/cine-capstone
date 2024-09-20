import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

const RootLayout = () => {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }

  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key)
        if (item) {
          console.log(`${key} was used 🔐 \n`)
        } else {
          console.log('No values stored under key: ' + key)
        }
        return item
      } catch (error) {
        console.error('SecureStore get item error: ', error)
        await SecureStore.deleteItemAsync(key)
        return null
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value)
      } catch (err) {
        return
      }
    },
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="index" options={{headerShown: false}}/>
          <Stack.Screen name="onboarding" options={{headerShown: false, presentation: 'modal'}}/>
          <Stack.Screen name="login" options={{headerShown: false, presentation:'modal'}}/>
          <Stack.Screen name="tabs" options={{headerShown: false}}/>
          <Stack.Screen name="movie_details" options={{headerShown: false}}/>
          <Stack.Screen name="(home)"/>
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
    

  )
};

export default RootLayout