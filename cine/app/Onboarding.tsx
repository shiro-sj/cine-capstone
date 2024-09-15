import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';


const onboarding = () => {
  return (
    

  <LinearGradient
        colors={['#EB5E28', '#FC60A8']}
        style={styles.background}
        locations={[0.6,0.9]}>

  </LinearGradient>
  );
};

export default onboarding;

const styles = StyleSheet.create({})