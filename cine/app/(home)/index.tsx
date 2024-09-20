import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import Connect, { Platform } from '@gandalf-network/connect';
import * as Linking from 'expo-linking';
import { useUser } from '@clerk/clerk-expo';

const gandalf = () => {
    const [url, seturl] = useState('');
    const {user} = useUser();

    useEffect(() => {

        //Initialize Connect
        const connect = new Connect({
            publicKey: "0x02015e78df7470d4236cfa05f684c56796886a172e7612db33e2e06258f895ed3d",
            redirectURL: "http://localhost:8081",
            // The platform defaults to IOS but could be ANDROID or UNIVERSAL
            platform: Platform.IOS,
            services:
            {
                netflix: {
                    traits: ["Plan"],
                    activities: ["Watch"],
                }
            }
        });

        const generateUrl = async () => {
            const Url = await connect.generateURL();
            seturl(Url);
        }
        generateUrl();
    })

    const handleClick = () => {
        Linking.openURL(url)
        console.log(url);
    }

    return (
        <View>
          <Text>Hello, {user?.username} </Text>
            <Button
                onPress={handleClick}
                title='connect to gandalf' />
        </View>
    )
}
export default gandalf;