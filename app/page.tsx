"use client"
import EmailTemplate from "@/components/EmailTemplate";
import SaveXml from "@/components/SaveXml";
import Setup from "@/components/Setup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { PiSignOutBold } from "react-icons/pi";
import SaveToLocalStorage from "@/components/SaveToLocalStorage";
import ClearLocalStorage from "@/components/ClearLocalStorage";

export default function Home() {
  const { status } = useSession();
  const Router = useRouter();

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (status === "unauthenticated") {
      Router.push("/signin");
    } else {
      setLoading(false);
    }
  }, [status, Router]);

  if (loading) {
    return <div>Loading...</div>;
}

  return (
  <>
  {status === "authenticated" &&
    <div className="grid grid-rows-[40px_1fr] min-h-screen overflow-hidden bg-[#363636]">
      <header className="bg-[#333333] to-100% w-full flex items-center justify-between px-5 text-white">
        <Link href="/auditlogs">
          <span className="font-bold text-white"><i className="text-pink-800">Top Tech</i> production :)</span>
        </Link>
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
        <SaveToLocalStorage/>
        <ClearLocalStorage/>
        <Link
          href="/preview"
          className="bg-[#1e1e1e] !text-[#dcdcaa] font-mono px-4 py-1 rounded-lg shadow-md border border-[#3c3c3c] hover:bg-[#252526] hover:!text-cyan-500 transition duration-300 cursor-pointer"
        >
          HTML Editor
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
        <section className="flex justify-center overflow-y-auto rounded-lg transition-transform duration-500 ease-in-out scale-100 hover:scale-102 scrollbar-custom">
          <div className="w-full max-w-3xl">
            <EmailTemplate />
          </div>
        </section>

      </main>

      {/* <footer className="bg-blue-50 w-full flex items-center justify-center">
        All rights reserved!
      </footer> */}
    </div>}
  </>
  );
}
