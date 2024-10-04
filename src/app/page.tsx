"use client"
import { useUser } from "@clerk/nextjs";
import Home from './pages/page'
import Onboarding from "./Onboarding/page";

export default function Page() {
  const { isSignedIn } = useUser();

  return (
    <div>
    {isSignedIn? <Home/>: <Onboarding/>}
    </div>
  );
}
