import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeHeader = ({TitleName}) => {
    return (
            <View style = {styles.container}>
                <Text style = {styles.text}>{TitleName}</Text>
            </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },

    text:{
        color:'white',
        fontFamily: 'Inter',
        fontSize: 20
    }
})