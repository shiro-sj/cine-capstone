import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'

const CreatePassword = () => {
    const [password, setPassword] = useState('');
    function handlePress(){
        setPassword('');
        console.log(password);
    }
  return (
    <View>
      <Text>Password</Text>
      <Text>Create a password</Text>
      <View>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Create a password">
        </TextInput>
         <Link href="/onboarding/CreatePassword"><Pressable onPress={handlePress}><Text>Submit</Text></Pressable></Link>
      </View>
      <Link href="/Login"><Text>
        Next
      </Text>
      </Link>
    </View>
  )
}

export default CreatePassword

const styles = StyleSheet.create({
    input:{
        height:50,
        borderColor:'black',
        borderWidth:1,
        marginHorizontal:20
      }
})