import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
// import { FIREBASE_AUTH } from '../../FirebaseConfig'
import HomeWidget from '../../components/HomeWidget'
import HomeHeader from '../../components/HomeHeader'


const Home = () => {
  return (
    <SafeAreaView>
      <Text>Welcome</Text>
      
      <HomeHeader TitleName={'test title'}/>
      <HomeWidget widgetName = {'test'}/>

      <Link href='/movieDetails/high_school_musical'>
        <Text>Movie Details page</Text>
      </Link>

       {/* <Button onPress={()=> FIREBASE_AUTH.signOut()} title='Logout'/> */}
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})