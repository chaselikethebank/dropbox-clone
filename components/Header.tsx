import Link from "next/link";
import React from "react";
import Image from "next/image";
import { SignIn, SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggler";

function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <div className="bg-[#0160FE] w-fit p-2">
          <Image
            src="https://www.shareicon.net/data/512x512/2015/11/08/668675_box_512x512.png"
            alt="logo"
            className="invert"
            height={50}
            width={50}
          />
        </div>
        <h1 className="font-bold text-xl">Hold Assets</h1>
      </Link>
      <div className="px-5 flex space-x-2 items-center">
        <ThemeToggle />
        <div className="p-2">
          <UserButton afterSignOutUrl="/" />
          <SignedOut>
            <SignInButton afterSignInUrl="/dashboard" mode="modal" />
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

export default Header;
