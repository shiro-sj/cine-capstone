import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSignUp } from '@clerk/clerk-expo';

const Email = () => {
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [emailError, setEmailError] = useState<string>(''); 
  const { username } = useLocalSearchParams<string>();
  const router = useRouter();
  const { signUp, isLoaded } = useSignUp(); 

  // Email validation function
  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (emailAddress: string) => {
    setEmailAddress(emailAddress);
    if (!validateEmail(emailAddress)) {
      setEmailError('Please enter a valid email address.'); 
    } else {
      setEmailError('Email is valid.'); 
    }
  };


  const handleContinue = async () => {
    setEmailError(''); 

    if (!validateEmail(emailAddress)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!isLoaded) {
      setEmailError('Clerk is loading. Please wait.');
      return;
    }

    try {
      await signUp.create({ emailAddress });
      // If successful, proceed....
      router.push({ pathname: '/onboarding/password', params: { emailAddress, username } });
    } catch (err: any) {
      const clerkError = err.errors?.[0]?.longMessage || 'An error occurred. Please try again.';
      setEmailError(clerkError);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#060606", "#1D1E18"]}
        style={styles.backgroundGradient}>
        <View style={styles.info}>
          <Text style={styles.title}>Enter your email</Text>
          <Text style={styles.subtitle}>Add a valid email address</Text>
          <TextInput
            onChangeText={handleEmailChange}
            style={styles.input}
            value={emailAddress}
            placeholder='Enter your email'
            keyboardType="email-address"
          />          
        </View>

        <View style={styles.checking}>
        <Text style={styles.checkingText}>
          {emailError ? <Text style={styles.checkingText}>{emailError}</Text> : null} {/* Display email validation error */}
          </Text>
        </View>

        <KeyboardAvoidingView style={styles.navigation} behavior='padding'>
          <TouchableOpacity onPress={() => { router.push('../') }}>
            <Text style={styles.back}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

export default Email;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
    justifyContent: 'space-between',
  },
  info: {
    textAlign: 'left',
    marginHorizontal: 50,
    marginTop: 100,
  },
  navigation: {
    justifyContent: 'space-between',
    marginHorizontal: 50,
    flexDirection: 'row',
    marginBottom: 60,
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subtitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    opacity: 0.5,
    paddingTop: 10,
  },
  input: {
    backgroundColor: 'grey',
    marginTop: 40,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1B065E',
    padding: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  back: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    opacity: 0.5,
    paddingTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    marginTop: 10,
  },
  checking:{
    flex:1,
    justifyContent:'flex-start',
    gap:10,
    marginHorizontal:40,
    marginVertical:20,
  },
  checkingText:{
    color:'white',
    fontSize:15,
    fontWeight:'medium',
    textAlign:'left',
    opacity:0.6,
    paddingTop:10,
  },
});
