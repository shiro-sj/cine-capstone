"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Page from "./pages/page";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div>
      {isSignedIn && <Page />}
      <div>
        {!isSignedIn ? (
          <div>
            <Link href="/sign-up">Signup</Link>
            <Link href="/sign-in">Login</Link>
          </div>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
}
