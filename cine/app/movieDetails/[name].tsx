import { View, Text } from 'react-native'
import React from 'react'
import {Stack, useLocalSearchParams} from 'expo-router';


const movieDetails = () => {

const {name} = useLocalSearchParams();
  
  return (
    <View>
 
      <Text>{name}</Text>
    </View>
  )
}

export default movieDetails