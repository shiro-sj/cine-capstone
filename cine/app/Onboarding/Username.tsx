import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const Username = () => {
  const [username, setUsername] = useState<string>('');
  function handlePress(){
    setUsername('')
    console.log(username)
  }
  function navigate(){
    router.push('/Onboarding/Email')
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
       <LinearGradient
      colors={["#060606", "#1D1E18" ]}
      style={styles.backgroundGradient}>
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.info}>
        <Text style={styles.title}>Create a username</Text>
        <Text style={styles.subtitle}>This is how other users see you.</Text>
        <View>
          <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Enter your username"></TextInput>
        </View>
        </View>
     
      <View style={styles.navigation}>
        <View style={styles.backButton}>
          <Link href="../"><Text style={styles.backButtonText}>Back</Text></Link>
       </View>
       <View style={styles.buttonContainer}>
        <Pressable onPress={handlePress} onPressOut={navigate} style={styles.button}><Text style={styles.buttonText}>Continue</Text></Pressable>
       </View>
      </View>
    
      </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Username;

const styles = StyleSheet.create({
  container:{
    backgroundColor:'black',
    flex:1,
  },
  innerContainer:{
    flex:1,
    margin:30,
    justifyContent:'space-between',

  },
  info:{
    marginTop:50

  },
  backgroundGradient:{
    flex: 1,
  },
  title:{
    fontSize:40,
    color:'white',
    fontFamily:'Inter',
    fontWeight:'bold',
    padding:10,

  },  
  input:{
    height:50,
    borderColor:'grey',
    backgroundColor:'grey',
    borderWidth:1,
    marginHorizontal:10,
    borderRadius: 20,
    padding:10,
    marginTop:50,
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    fontFamily:'Inter'

  },
  subtitle:{
    color:'white',
    padding:10,
    fontSize:20,
    fontWeight:'bold',
  },
  button:{
    padding:20,
    backgroundColor:'#1B065E',
    justifyContent:'center',
    margin:20,
    borderRadius:30,
  },
  buttonText:{
    color:'white',
    textAlign:'center',
    fontWeight:'700',
    fontFamily:'Inter',
    fontSize:20,
  },
  buttonContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  backButton:{
    padding:20,
    borderRadius:20,
  },
  navigation:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    gap:100
  },
  backButtonText:{
    color:'white',
    textAlign:'center',
    fontWeight:'700',
    fontFamily:'Inter',
    fontSize:20,
    opacity:0.5,

  }


})
