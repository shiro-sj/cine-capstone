import { TouchableOpacity,View, Text } from 'react-native'
import React from 'react'
import {Stack, useLocalSearchParams} from 'expo-router';


const movieDetails = () => {

const {name} = useLocalSearchParams();
  
  return (
    <View>
      <Text>Image</Text>
      <Text>name: {name}</Text>
      <Text>Rating</Text>
      <Text>Description</Text>
      <TouchableOpacity>
        <Text>Add to Favorites</Text>
      </TouchableOpacity>
    </View>
  )
}

export default movieDetails