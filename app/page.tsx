import EmailTemplate from "@/components/EmailTemplate";
import SaveXml from "@/components/SaveXml";
import Setup from "@/components/Setup";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[35px_1fr_25px] min-h-screen overflow-hidden">
      <header className="bg-blue-100 w-full flex items-center justify-between px-5">
        <span className="font-bold"><i className="text-orange-500">Top Tech</i> production :)</span>
        <div className="flex flex-row gap-5">
          <h2><span className="font-bold italic text-lg text-orange-500">Basic</span> EmailTemplate generator</h2>
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

      <main className="grid grid-cols-[40%_60%] w-full max-h-[calc(100vh-35px-25px)] p-8 gap-4 overflow-hidden">
        <section className="bg-blue-100 flex flex-col items-center justify-center gap-10 rounded-lg shadow-2xl">
          <h1 className="text-lg font-bold">Setup</h1>
          <Setup/>
        </section>

        {/* Right section should be scrollable */}
        <section className="bg-green-100 flex justify-center overflow-y-auto p-4 rounded-lg shadow-2xl">
          <div className="w-full max-w-3xl">
            <EmailTemplate name="tom" identityInfo={{ fullName: "Ext", leaverDate: "27" }} />
          </div>
        </section>
      </main>

      <footer className="bg-blue-50 w-full flex items-center justify-center">
        All rights reserved!
      </footer>
    </div>
  );
}
