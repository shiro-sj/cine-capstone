import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const password = () => {
  const [password, setPassword] = useState<string>('');
  function handlePress(){
    setPassword('')
    console.log(password)
  }
  function navigate(){
    router.push('/onboarding/welcome_page')
  }
  return (
    <View style={styles.container}>
       <LinearGradient
      colors={["#060606", "#1D1E18" ]}
      style={styles.backgroundGradient}>
        <View style={styles.info}>
            <Text style={styles.title}>Create a password</Text>
            <Text style={styles.subtitle}>Must be at least 8 characters</Text>
            <TextInput onChangeText={setPassword} style={styles.input} value={password} placeholder='Enter your password'></TextInput>
        </View>
        <KeyboardAvoidingView style={styles.navigation} behavior='padding'>
            <TouchableOpacity onPress={()=>{router.push('../')}}>
                <Text style={styles.back}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handlePress} onPressOut={navigate}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            
        </KeyboardAvoidingView>
        </LinearGradient>
      
    </View>
  );
};

export default password;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    backgroundGradient:{
        flex:1,
        justifyContent:'space-between',
    },
    info:{
        textAlign:'left',
        marginHorizontal:50,
        marginTop:100,
    },
    navigation:{
        justifyContent:'space-between',
        marginHorizontal:50,
        flexDirection:'row',
        marginBottom:60,
    },
    title:{
        color:'white',
        fontSize:40,
        fontWeight:'bold',
        textAlign:'left',

    },
    subtitle:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'left',
        opacity:0.5,
        paddingTop:10,
    },
    input:{
        backgroundColor:'grey',
        marginTop:40,
        padding:20,
        borderRadius:20,
        borderWidth:1,
        borderColor:'black',
        color:'white',
        fontSize:20,
        fontWeight:'bold',

    },
    button:{
        backgroundColor:'#1B065E',
        padding:20,
        borderRadius:20,
    },
    buttonText:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',

    },
    back:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'left',
        opacity:0.5,
        paddingTop:20,
        
    }


})