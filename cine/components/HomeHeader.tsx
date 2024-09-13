import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeHeader = ({TitleName}) => {
    return (
            <View style = {styles.container}>
                <Text>{TitleName}</Text>
            </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    container:{
    }
})