import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Logo from "../public/1.jpg";
import Image from "next/image";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, loading] = useAuthState(auth);

  return (
    <div>
      <nav className="bg-[#375fbe]  fixed w-full top-0 z-10">
        <div className="flex justify-around h-[60px] items-center">
          <div>
            <Link href="/">
              <Image
                width={30}
                height={30}
                className="w-12 rounded-full cursor-pointer"
                src={Logo}
              />
            </Link>
          </div>
          <div className="">
            {!user && (
              <Link href={"/auth/login"}>
                <div className="py-2 cursor-pointer px-4 text-sm text-white rounded-lg font-medium ml-5">
                  Join Now
                </div>
              </Link>
            )}
            {user && (
              <div className="flex items-center cursor-pointer  gap-6">
                <Link href="/post">
                  <button className="font-medium text-white py-2 px-4 rounded-mg textx-sm">
                    Post
                  </button>
                </Link>
                <Link href="/dashboard">
                  <div className="flex items-center gap-2 text-white">
                    <Image
                      width={30}
                      height={30}
                      className="w-12 rounded-full cursor-pointer"
                      src={user.photoURL}
                    />
                    Edit
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
