"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Page from "./pages/page";
import Onboarding from "./Onboarding/page";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div>
    {isSignedIn && <Page/>}
    <div>
    {!isSignedIn && <Onboarding/>}
    </div>
    </div>
  );
}
