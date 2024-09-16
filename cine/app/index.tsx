import { Button, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import logo from '../assets/logo.png';
import { Link } from 'expo-router';

export default function Onboarding() {


  // const width = useSharedValue(100);

  // const handlePress = () => {
  //   width.value = withSpring(width.value + 50);

  return (
    <View style={styles.container}>
      <LinearGradient
      colors={["#060606", "#1D1E18" ]}
      style={styles.backgroundGradient}>
        <LinearGradient
          colors={["#1B065E", "#FF4E00" ]}
          locations={[0.4,0.9]}
          style={styles.topArea}/>

        <View style={styles.background}>

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo}/>
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>cine</Text>
          <Text style={styles.subtitle}>View watch histories and more.</Text>
        </View>

        <View style={styles.login}>
            <Text style={styles.loginText}>Already have an account?<Link href="/Login/Login"><Text style={styles.loginTextButton}>  Login</Text></Link></Text>
          </View>

          <TouchableOpacity style={styles.buttonContainer}>
            <Link href="/Onboarding" style={styles.buttonText}>
            <Text>Get Started</Text>
            </Link>
          </TouchableOpacity>

        </View>
      </LinearGradient>
    </View>


  //   <View style={{ flex: 1, alignItems: 'center' }}>
  //   <Animated.View
  //     style={{
  //       width,
  //       height: 100,
  //       backgroundColor: 'violet',
  //     }}
  //   />
  //   <Button onPress={handlePress} title="Click me" />
  // </View>
   
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center'
  },
  logo:{
    width:200,
    height:200,
  },
  logoContainer:{
    justifyContent:'center',
    alignItems:'center',
  },
  backgroundGradient:{
    flex: 1,
  },
  background:{
    marginBottom:50
  },
  topArea:{
    height:350,
    borderBottomEndRadius:200,
  },
  info:{
    justifyContent:'center', 
    alignItems:'center',
    paddingBottom: 80 , 
  },
  title: {
    color: 'white',
    fontSize: 100,
    fontFamily: 'Georgia',
    fontWeight: 'medium',
    textShadowColor: 'black', 
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 20, 
  },
  subtitle:{
    color:'white',
    fontFamily:'Inter',
    fontSize:15
    },
  buttonContainer:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#1B065E",
    borderRadius:100,
    marginHorizontal:50,
  },
  buttonText:{
    padding:15,
    color:"white",
    fontSize:20
  },
  login:{
    justifyContent:'center',
    alignItems:'center',
    padding:10
  },
  loginText:{
    color:'white',
    fontSize:13,
    fontFamily:'Inter'
  },

  loginTextButton:{
    color:'white',
    fontSize:15,
    fontFamily:'Inter',
    fontWeight:'bold'
  },

})