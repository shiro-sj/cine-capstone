"use client"
import { useUser } from "@clerk/nextjs";
import Home from './home/page'
import Onboarding from "./onboarding/page";

export default function Page() {
  const { isSignedIn } = useUser();

  return (
    <div>
    {isSignedIn? <Home/>: <Onboarding/>}
    </div>
  );
}
