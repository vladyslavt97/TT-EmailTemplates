"use client"
import PreviewComponent from "@/components/PreviewComponent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function preview() {
  const { status } = useSession();
  const Router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      Router.push("/signin");
    }
  }, [status, Router]);
  return (
    // <div className="grid grid-rows-[35px_1fr_25px] min-h-screen overflow-hidden">
    <div className="grid grid-rows-[40px_1fr] min-h-screen overflow-hidden">
      <PreviewComponent/>
    </div>
  );
}
