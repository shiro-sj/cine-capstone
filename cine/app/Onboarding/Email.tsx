import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'

const Email = () => {
    const [email, setEmail] = useState('');
    function handlePress(){
        setEmail('');
        console.log(email);
    }
  return (
    <View>
      <Text>Email</Text>
      <Text>What is your email?</Text>
      <View>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter your email">
        </TextInput>
        <Pressable onPress={handlePress}><Text>Submit</Text></Pressable>
      </View>
      <Link href="/onboarding/CreatePassword">
      <Text>Next</Text>
      </Link>
    </View>
  )
}

export default Email

const styles = StyleSheet.create({
    input:{
        height:50,
        borderColor:'black',
        borderWidth:1,
        marginHorizontal:20
      }
})