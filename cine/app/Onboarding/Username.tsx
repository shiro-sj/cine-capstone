import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router';

const Username = () => {
  const [username, setUsername] = useState<string>('');
  function handlePress(){
    setUsername('')
    console.log(username)
  }
  return (
    <View>
      <Text>Username</Text>
      <Text>What is your username?</Text>
      <View>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Enter your username">
        </TextInput>
         <Link href="/onboarding/CreatePassword"><Pressable onPress={handlePress}><Text>Submit</Text></Pressable></Link>
      </View>
      <Link href="/onboarding/Email"><Text>
        Next
      </Text>
      </Link>
    </View>
  );
};

export default Username;

const styles = StyleSheet.create({
  input:{
    height:50,
    borderColor:'black',
    borderWidth:1,
    marginHorizontal:20
  }
})
