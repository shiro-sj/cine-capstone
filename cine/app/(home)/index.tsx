import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Connect, { Platform } from '@gandalf-network/connect';
import * as Linking from 'expo-linking';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, router, useRouter } from 'expo-router';

const gandalf = () => {
    const [url, seturl] = useState('');
    const {user} = useUser();
    const { signOut, isLoaded } = useAuth(); 
    const router = useRouter(); 

    const handleSignOut = async () => {
      if (!isLoaded) return;
      try {
        await signOut();
        router.replace('../'); 
      } catch (error) {
        console.error('Error signing out: ', error);
      }
    };

    useEffect(() => {

        //Initialize Connect
        const connect = new Connect({
            publicKey: "0x02015e78df7470d4236cfa05f684c56796886a172e7612db33e2e06258f895ed3d",
            redirectURL: "http://localhost:8081/tabs/profile",
            // The platform defaults to IOS but could be ANDROID or UNIVERSAL
            platform: Platform.IOS,
            services:
            {
                netflix: {
                    traits: ["Plan"],
                    activities: ["Watch"],
                }
            }
        });

        const generateUrl = async () => {
            const Url = await connect.generateURL();
            seturl(Url);
        }
        generateUrl();
    })

    const handleClick = () => {
        Linking.openURL(url)
        console.log(url);
    }

    return (
      <LinearGradient
      colors={["#060606", "#1D1E18" ]}
      style={styles.backgroundGradient}>
      <SafeAreaView style={styles.container}>
       
        
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Hello, {user?.username} </Text>
            <TouchableOpacity onPress={handleClick} style={styles.button}>
              <Text style={styles.buttonText}>Connect to Gandalf</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut} style={styles.button}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
        

      </SafeAreaView>
      </LinearGradient>
        
    )
}
export default gandalf;

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  backgroundGradient:{
    flex:1
  },
  innerContainer:{
    flex:1,
    justifyContent:'flex-start',
    margin:30,
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
button:{
  backgroundColor:'#1B065E',
  padding:20,
  borderRadius:20,
  marginTop:80,
},
buttonText:{
  color:'white',
  fontSize:20,
  fontWeight:'bold',
  textAlign:'center',

},

});