import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import Connect, { Platform } from '@gandalf-network/connect';
import * as Linking from 'expo-linking';

const gandalf = () => {
    const [url, seturl] = useState('');

    useEffect(() => {
        const connect = new Connect({
            publicKey: "0x02015e78df7470d4236cfa05f684c56796886a172e7612db33e2e06258f895ed3d",
            redirectURL: "http://localhost:8081/",
            // The platform defaults to IOS but could be ANDROID or UNIVERSAL
            platform: Platform.ANDROID,
            services:
            {
                uber: {
                    traits: ["rating"],
                    activities: ["trip"],
                },
                gandalf: {
                    traits: ["email"]
                }
            }
        })

        const generateUrl = async () => {
            const Url = await connect.generateURL();
            seturl(Url);
            
        }

        generateUrl();
    })

    const handleClick = () => {
        Linking.openURL(url)
    }


    return (
        <View>
            <Button
                onPress={handleClick}
                title='connect to gandalf' />
        </View>
    )

}
export default gandalf