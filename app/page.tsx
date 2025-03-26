import EmailTemplate from "@/components/EmailTemplate";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[35px_1fr_25px] min-h-screen overflow-hidden">
      <header className="bg-gray-200 w-full flex items-center justify-around">
        <span className="font-bold"><i>Top Tech</i> production :)</span>
        <div className="flex flex-row gap-5">
          <span>EmailTemplates generator</span>
          <Image
            src="/mailicon.png"
            alt="Ströer logo"
            width={25}
            height={25}
            className=" object-contain"
          />
        </div>
      </header>

      <main className="grid grid-cols-[40%_60%] w-full max-h-[calc(100vh-35px-25px)] p-8 gap-4 overflow-hidden">
        <section className="bg-blue-100 flex flex-col items-center justify-center gap-10 rounded-lg">
          <h1 className="text-lg font-bold">Setup</h1>
          <div>
            <h2>Arguments:</h2>
            <ul>
              <li></li>
            </ul>
          </div>
        </section>

        {/* Right section should be scrollable */}
        <section className="bg-green-100 flex justify-center overflow-y-auto p-4 rounded-lg">
          <div className="w-full max-w-3xl">
            <EmailTemplate name="tom" identityInfo={{ fullName: "Ext", leaverDate: "27" }} />
          </div>
        </section>
      </main>

      <footer className="bg-gray-200 w-full flex items-center justify-center">
        All rights reserved!
      </footer>
    </div>
  );
}
