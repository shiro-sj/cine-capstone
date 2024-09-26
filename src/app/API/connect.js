"use client";

// https://docs.gandalf.network/
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


import Connect from '@gandalf-network/connect';
import { Platform } from "@gandalf-network/connect/components";

// Create a new Connect instance
const connect = new Connect({
    publicKey: "0x02015e78df7470d4236cfa05f684c56796886a172e7612db33e2e06258f895ed3d",
    redirectURL: "https://docs.gandalf.network",
    platform: Platform.IOS,
    services: {
        netflix: {
            traits: ["plan"],
            activities: ["watch"]
        }
    }
});

const ConnectPage = () => {
    const [qrCode, setQrCode] = useState(null);
    const [connectUrl, setConnectUrl] = useState("");

    const router = useRouter();

    const navigateToFile = () => {
        router.push('/profile');
    };

    useEffect(() => {
        const fetchQR = async () => {
            try {
                const generatedURL = await connect.generateURL();
                const qrCodeUrl = await connect.generateQRCode();

                setConnectUrl(generatedURL);
                setQrCode(qrCodeUrl);
            } catch (error) {
                console.error('Error generating Connect: ', error);
            }
        };

        fetchQR();
    }, []);

    if (!qrCode) {
        return <h1>Loading QR Code...</h1>;
    }
    return (
        <div>
            <p>Connect URL: <a href={connectUrl}>{connectUrl}</a></p>
            <h1>QR Code:</h1>
            <img src={qrCode} alt="Generated QR Code" />

            <button 
            onClick={navigateToFile} 
        >
            Go to File Path
        </button>
        </div>

        
    );
};

export default ConnectPage;
