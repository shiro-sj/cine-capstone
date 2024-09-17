import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const Password = () => {
  const [password, setPassword] = useState<string>('');
  function handlePress(){
    setPassword('')
    console.log(password)
  }
  function navigate(){
    router.push('/Login/login_page')
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
       <LinearGradient
      colors={["#060606", "#1D1E18" ]}
      style={styles.backgroundGradient}>
      <SafeAreaView style={styles.innerContainer}>
        <View>
        <Text style={styles.title}>Create a password</Text>
        <Text style={styles.subtitle}>Should be at least 6 characters</Text>
        <View>
          <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Create a password"></TextInput>
        </View>
        </View>
     
      <View style={styles.navigation}>
        <View style={styles.backButton}>
          <Link href="../"><Text style={styles.buttonText}>Back</Text></Link>
       </View>
       <View style={styles.buttonContainer}>
        <Pressable onPress={handlePress} onPressOut={navigate} style={styles.button}><Text style={styles.buttonText}>Create Account</Text></Pressable>
       </View>
      </View>
    
      </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Password;

const styles = StyleSheet.create({
  container:{
    backgroundColor:'black',
    flex:1,
  },
  innerContainer:{
    flex:1,
    margin:20,
    justifyContent:'space-between',

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
    borderRadius:20,
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
    backgroundColor: "#1B065E",
  },
  navigation:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    gap: 70

  },


})
