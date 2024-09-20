import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSignUp } from '@clerk/clerk-expo';

const Password = () => {
  const [password, setPassword] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const { emailAddress, username } = useLocalSearchParams();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState<string>(''); 
  const router = useRouter();

  const handleSignup = async () => {
    setError(''); 

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (!isLoaded) {
      setError('Clerk is still loading. Please try again.');
      return;
    }

    try {
      await signUp.create({
        username: username as string,
        emailAddress: emailAddress as string,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true); 
    } catch (err: any) {
      const clerkError = err.errors?.[0]?.longMessage || 'An error occurred. Please try again.';
      setError(clerkError);
    }
  };

  const onPressVerify = async () => {
    setError(''); 
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/(home)');
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (err: any) {
      const clerkError = err.errors?.[0]?.longMessage || 'An error occurred during verification. Please try again.';
      setError(clerkError);
    }
  };

  return (
    <View style={styles.container}>
      {!pendingVerification && (
        <View style={styles.container}>
          <LinearGradient colors={['#060606', '#1D1E18']} style={styles.backgroundGradient}>
            <View style={styles.info}>
              <Text style={styles.title}>Create a password</Text>
              <Text style={styles.subtitle}>Must be at least 8 characters</Text>
              <TextInput
                secureTextEntry={true}
                onChangeText={setPassword}
                style={styles.input}
                value={password}
                placeholder='Enter your password'
              />
            </View>

            <View style={styles.checking}>
              {error ? <Text style={styles.checkingText}>{error}</Text> : null}
            </View>


            <KeyboardAvoidingView style={styles.navigation} behavior='padding'>
              <TouchableOpacity onPress={() => router.push('../')}>
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
        <View style={styles.container}>
        <LinearGradient colors={['#060606', '#1D1E18']} style={styles.backgroundGradient}>
        <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
            style={styles.input}
          />
          <Button title="Verify Email" onPress={onPressVerify} />

          {error ? <Text style={styles.checkingText}>{error}</Text> : null}

        </LinearGradient>
        </View>
          
        </>
      )}
    </View>
  );
};

export default Password;

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
