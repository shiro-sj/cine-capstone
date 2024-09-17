import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import {router} from 'expo-router'

const welcome_page = () => {
  function navigate(){
    router.push('/login')
  };
  return (
    <View style={styles.container}>
      <LinearGradient
          colors={["#1B065E", "#FF4E00" ]}
          locations={[0.4,0.9]}
          style={styles.backgroundGradient}>
            <View style={styles.info}>
              <Text style={styles.title}>Account created</Text>
              <Text style={styles.subtitle}>Proceed to login</Text>

            </View>
            <View style={styles.navigation}>
              <TouchableOpacity style={styles.button} onPress={navigate}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

            </View>

          </LinearGradient>
      
    </View>
  )
};

export default welcome_page;

const styles = StyleSheet.create({
  container:{
    flex:1,

  },
  backgroundGradient:{
    flex:1,

  },
  info:{
    flex:1,
    justifyContent:'center',
    marginHorizontal:30,
  },
  title:{
    color:'white',
    fontSize:50,
    fontWeight:'bold',
    textAlign:'center',
  },
  subtitle:{
    color:'white',
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    opacity:0.5,

  },
  navigation:{
    justifyContent:'center',
    marginHorizontal:30,
    marginBottom:60,

  },
  button:{
    backgroundColor: '#1B065E',
    padding:10,
    borderRadius:20,
    textAlign:'center',
    justifyContent:'center',
  },
  buttonText:{
    color:'white',
    fontSize:20,
    padding:5,
    textAlign:'center',
    fontWeight:'bold',
  },
})