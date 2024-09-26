"use client";
import ConnectPage from './API/connect';
import Connect from '@gandalf-network/connect'
import { Platform } from "@gandalf-network/connect/components";

async function connectUrl() {
    // Initialize Connect
    const connect = new Connect({
      publicKey: "0x02015e78df7470d4236cfa05f684c56796886a172e7612db33e2e06258f895ed3d",
      redirectURL: "http://google.com",
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

    const connectUrl = await connect.generateURL();
    console.log("Generated Connect URL:", connectUrl);
}

connectUrl();

export default function title_page() {
  return(
    <div>
      <h1 className="text-white" >title_page</h1>
      <ConnectPage/>
      <button href = "/profile">go to profile page</button>
    </div>

  )
}