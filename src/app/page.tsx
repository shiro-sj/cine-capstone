"use client"
import { useUser } from "@clerk/nextjs";
import Home from "./protected/page";
import Landing from "./landing/page";

export default function Page() {
  const { isSignedIn } = useUser();

  return (
    <div>
    {isSignedIn? <Home/>: <Landing/>}
    </div>
  );
}