"use client"
import EmailTemplate from "@/components/EmailTemplate";
import SaveXml from "@/components/SaveXml";
import Setup from "@/components/Setup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { PiSignOutBold } from "react-icons/pi";

export default function Home() {
  const { data: session, status } = useSession();
  const Router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      Router.push("/signin");
    }
  }, [status, Router]);
  return (
    // <div className="grid grid-rows-[35px_1fr_25px] min-h-screen overflow-hidden">
    <div className="grid grid-rows-[40px_1fr] min-h-screen overflow-hidden">
      <header className="bg-[#08204A] to-100% w-full flex items-center justify-between px-5 text-white">
        <span className="font-bold"><i className="text-pink-800">Top Tech</i> production :)</span>
        <div className="flex flex-row gap-2">
          <h2><span className="font-bold italic text-lg text-pink-800">Basic</span> EmailTemplate generator</h2>
          <Image
            src="/mailicon.png"
            alt="Ströer logo"
            width={25}
            height={25}
            className=" object-contain"
          />
        </div>
        <SaveXml/>
        <Link
          href="/preview"
          className="bg-[#1e1e1e] !text-[#dcdcaa] font-mono px-4 py-1 rounded-lg shadow-md border border-[#3c3c3c] hover:bg-[#252526] hover:!text-[#ffffff] transition duration-300 cursor-pointer"
        >
          Preview HTML
        </Link>
        <button
            onClick={() => signOut()}
            className="bg-[#1e1e1e] text-[#dcdcaa] font-mono px-4 py-1 rounded-lg shadow-md border border-[#3c3c3c] hover:bg-[#252526] hover:!text-[#ffffff] transition duration-300 cursor-pointer"
            title="Sign Out"
          >
            <PiSignOutBold size={20} />
        </button>

      </header>

      {/* <main className="grid grid-cols-[40%_60%] w-full max-h-[calc(100vh-35px-25px)] p-8 gap-4 overflow-hidden"> */}
      <main className="grid grid-cols-[40%_60%] w-full max-h-[calc(100vh-40px)] p-8 gap-4 overflow-hidden">
        <section className="flex flex-col items-center justify-center rounded-lg transition-transform duration-500 ease-in-out scale-100 hover:scale-102">
          {/* <h1 className="text-xl font-bold">Setup</h1> */}
          <Setup/>
        </section>

        {/* Right section should be scrollable */}
        <section className="flex justify-center overflow-y-auto rounded-lg transition-transform duration-500 ease-in-out scale-100 hover:scale-102">
          <div className="w-full max-w-3xl">
            <EmailTemplate />
          </div>
        </section>

      </main>

      {/* <footer className="bg-blue-50 w-full flex items-center justify-center">
        All rights reserved!
      </footer> */}
    </div>
  );
}
