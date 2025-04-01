"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

const SignIn = () => {
  const [error, setError] = useState("");
  const [hello, setHello] = useState(false);
  const router = useRouter();
  const {data: session, status } = useSession();
  const Router = useRouter();
  console.log("st: ", status);
  console.log("session: ", session);
  
  useEffect(() => {
    if (status === "authenticated" || session) {
      setHello(true)
      Router.push("/");
    }
  }, [status, Router, session]);

  const handleSignIn = async () => {
    const res = await signIn("azure-ad", { redirect: false });
    if (res?.error) {
      setError("Authentication failed. Please use a @traxion.com account.");
    } else {
      router.push("/signin");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {status === "loading" || hello ? <FadeLoader color="#08204A"/> :
      <button
        onClick={handleSignIn}
        className="bg-[#1e1e1e] text-[#dcdcaa] font-mono px-4 py-1 rounded-lg shadow-md border border-[#3c3c3c] hover:bg-[#252526] hover:!text-[#ffffff] transition duration-300 cursor-pointer"
      >
        Sign in with Microsoft
      </button>}
    </div>
  );
};

export default SignIn;
