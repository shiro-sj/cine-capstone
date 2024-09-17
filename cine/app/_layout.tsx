
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

const tokenCache = {
  async getToken(key:string){
    try{
      return SecureStore.getItemAsync(key);
    }catch (err){
      return null;
    }
  },

  async saveToken(key: string, value: string) {
    try{
      return SecureStore.setItemAsync(key, value);
    } catch (err){
      return;
    }
  }
};

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="Onboarding" options={{headerShown:false, presentation:'modal'}}/>
        <Stack.Screen name='Login' options={{headerShown:false, presentation:'modal'}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movieDetails/[name]" />
      </Stack>
    </ClerkProvider>
    

  )
};

export default RootLayout;

