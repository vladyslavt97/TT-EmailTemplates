import EmailTemplate from "@/components/EmailTemplate";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[35px_1fr_25px] min-h-screen overflow-hidden">
      <header className="bg-gray-200 w-full flex items-center justify-around">
        <span>Top Tech production</span>
        <span>Email Templates generator</span>
      </header>

      <main className="grid grid-cols-[40%_60%] w-full h-full p-8 gap-4">
        <section className="bg-blue-100 flex flex-col items-center justify-center gap-10">
          <h1 className="text-lg font-bold">Setup</h1>
          <div>
            <h2>Argumnets:</h2>
            <ul>
              <li></li>
            </ul>
          </div>
        </section>
        <section className="bg-green-100 flex items-center justify-center overflow-scroll">
          <EmailTemplate name="tom" identityInfo={{ fullName: "Ext", leaverDate: "27" }} />
        </section>
      </main>

      <footer className="bg-gray-200 w-full flex items-center justify-center">
        All rights reserved!
      </footer>
    </div>
  );
}
