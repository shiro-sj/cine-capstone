import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useSignIn } from '@clerk/clerk-expo'
import { useRouter, Redirect } from 'expo-router'

const login_page = () => {
    const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(home)')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, emailAddress, password])

  return (
    <View style={styles.container}>
        <LinearGradient
        colors={["#060606", "#1D1E18" ]}
        style={styles.backgroundGradient}>
            <View style={styles.innerContainer}>
            <View>
                <Text style={styles.title}>Login to your account</Text>
            </View>
            <View>
            <TextInput
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Email"
                    onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                    style={styles.input}
                />
                <TextInput
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    style={styles.input}
                />
            </View>

            <View>
                <TouchableOpacity style={styles.button} onPress={onSignInPress}>
                    <Text style={styles.buttonText }>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=> {router.replace("/onboarding")}}>
                    <Text style={styles.buttonText }>Sign Up</Text>
                </TouchableOpacity>

            </View>

            </View>
        </LinearGradient>
    </View>
  )
}

export default login_page

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    backgroundGradient:{
        flex:1,
    },
    innerContainer:{
        flex:1,
        margin:20,
        justifyContent:'center',
        gap:30
    },
        
    input:{
        backgroundColor:'grey',
        marginTop:40,
        padding:20,
        borderRadius:20,
        borderWidth:1,
        borderColor:'black',
        color:'white',
        fontSize:15,
    },
    button:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: "#1B065E",
        borderRadius:100,
        padding:15,
        marginVertical:10

    },
    buttonText:{
        padding:5,
        color:"white",
        fontSize:20,
        opacity:0.5,
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
})

