"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignIn = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    const res = await signIn("azure-ad", { redirect: false });
    if (res?.error) {
      setError("Authentication failed. Please use a @traxion.com account.");
    } else {
      router.push("/");
    }
  };
  const { data: session, status } = useSession();
  const Router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      Router.push("/");
    }
  }, [status, Router]);
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleSignIn}
        className="bg-[#1e1e1e] text-[#dcdcaa] font-mono px-4 py-1 rounded-lg shadow-md border border-[#3c3c3c] hover:bg-[#252526] hover:!text-[#ffffff] transition duration-300 cursor-pointer"
      >
        Sign in with Microsoft
      </button>
    </div>
  );
};

export default SignIn;
