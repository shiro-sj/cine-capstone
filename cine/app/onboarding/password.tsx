import { Button, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link, router, useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSignUp } from '@clerk/clerk-expo';

const password = () => {
    const [password, setPassword] = useState<string>('');
    const { emailAddress, username } = useLocalSearchParams();
    const {isLoaded, signUp, setActive} = useSignUp();
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('');
    const router = useRouter();

    async function handleSignup(){
        if(!isLoaded){
            return
        }
        try{
            await signUp.create({
                username: username as string,
                emailAddress: emailAddress as string,
                password,
            })

            await signUp.prepareEmailAddressVerification({strategy: 'email_code'})

            setPendingVerification(true)
        } catch (err:any){
            console.error(JSON.stringify(err, null, 2))
        }
    };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    
    <View style={styles.container}>
        {!pendingVerification && (
            <View style={styles.container}>
            <LinearGradient
           colors={["#060606", "#1D1E18" ]}
           style={styles.backgroundGradient}>
             <View style={styles.info}>
                 <Text style={styles.title}>{emailAddress}{username}</Text>
                 <Text style={styles.title}>Create a password</Text>
                 <Text style={styles.subtitle}>Must be at least 8 characters</Text>
                 <TextInput secureTextEntry={true} onChangeText={setPassword} style={styles.input} value={password} placeholder='Enter your password'></TextInput>
             </View>
             <KeyboardAvoidingView style={styles.navigation} behavior='padding'>
                 <TouchableOpacity onPress={()=>{router.push('../')}}>
                     <Text style={styles.back}>Back</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.button} onPress={handleSignup}>
                     <Text style={styles.buttonText}>Create Account</Text>
                 </TouchableOpacity>
                 
             </KeyboardAvoidingView>
             </LinearGradient>
           
         </View>

        )}
    {pendingVerification && (
        <>
          <TextInput value={code} placeholder="Code..." onChangeText={(code) => setCode(code)} style={styles.input}/>
          <Button title="Verify Email" onPress={onPressVerify} />
        </>
      )}

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

