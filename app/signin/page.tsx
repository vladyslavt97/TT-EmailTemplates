"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-2xl mb-6 text-gray-800">Sign in with Microsoft</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleSignIn}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700"
      >
        Sign in with Microsoft
      </button>
    </div>
  );
};

export default SignIn;
