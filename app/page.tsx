import EmailTemplate from "@/components/EmailTemplate";
import SaveXml from "@/components/SaveXml";
import Setup from "@/components/Setup";
import Image from "next/image";

export default function Home() {
  return (
    // <div className="grid grid-rows-[35px_1fr_25px] min-h-screen overflow-hidden">
    <div className="grid grid-rows-[35px_1fr] min-h-screen overflow-hidden">
      <header className="bg-gradient-to-tr from-pink-200 from-0% to-indigo-900 to-100% w-full flex items-center justify-between px-5">
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
      </header>

      {/* <main className="grid grid-cols-[40%_60%] w-full max-h-[calc(100vh-35px-25px)] p-8 gap-4 overflow-hidden"> */}
      <main className="grid grid-cols-[40%_60%] w-full max-h-[calc(100vh-35px)] p-8 gap-4 overflow-hidden">
        <section className="bg-blue-50 flex flex-col items-center justify-center gap-10 rounded-lg shadow-2xl">
          <h1 className="text-2xl font-bold">Setup</h1>
          <Setup/>
        </section>

        {/* Right section should be scrollable */}
        <section className="flex justify-center overflow-y-auto rounded-lg">
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
