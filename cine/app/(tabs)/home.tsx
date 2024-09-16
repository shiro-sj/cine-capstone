import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
// import { FIREBASE_AUTH } from '../../FirebaseConfig'
import HomeWidget from '../../components/HomeWidget'
import HomeHeader from '../../components/HomeHeader'
import { LinearGradient } from 'expo-linear-gradient'


const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View >

        <LinearGradient
          colors={["#1B065E", "#FF4E00"]}
          locations={[0.4, 0.9]}
          style={styles.topArea}
        >

          <Text style={styles.title}>Welcome Name</Text>
          <Text style={styles.subtitle}>What are we watching next</Text>

        </LinearGradient>

        <View style={styles.body}>
          <HomeHeader TitleName={'test title'} />
          <HomeWidget widgetName={'test'} />

          <Link href='/movieDetails/high_school_musical'>
            <Text>Movie Details page</Text>
          </Link>

          {/* <Button onPress={()=> FIREBASE_AUTH.signOut()} title='Logout'/> */}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({

  container: {
    // backgroundColor: '#060606',
    height: '100%',
  },

  topArea: {
    height: 250,
    borderBottomEndRadius: 200,
    padding: 20
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Georgia',
    fontWeight: 'medium',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 20,
  },
  subtitle: {
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 15
  },
  body:{
    paddingLeft:20,
    paddingRight:20
  }

})