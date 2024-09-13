import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeWidget = ({ widgetName }) => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.text}>{widgetName}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default HomeWidget

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        backgroundColor: 'grey',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    }
});