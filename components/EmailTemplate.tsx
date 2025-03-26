"use client";

import { useStore } from "./State";
import Image from "next/image";
import GermanTableEditor from "./GermanTableEditor";
import EnglishTableEditor from "./EnglishTableEditor";

export default function EmailTemplate() {
  const { emailInfo, setGermanText, setEnglishText } = useStore();
  const { germanText, englishText } = emailInfo;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg text-[#08204A] font-sans">
      {/* Header */}
      <div className="bg-[#08204A] p-5 text-center text-white rounded-t-lg">
        <div className="inline-block bg-white p-2 rounded">
          <Image
            src="/loginLogo.png"
            alt="Ströer logo"
            width={150}
            height={50}
          />
        </div>
        <h1 className="text-lg font-bold mt-3">Externe Mitarbeiter Antrag</h1>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="font-bold text-xs mb-4">Group IT - IT Compliance - IAM Team</div>

        {/* German Section */}
        <div className="relative bg-[#f8f9fc] p-5 rounded-lg mb-5">
          <Image
            src="https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg"
            alt="German Flag"
            width={20}
            height={15}
            className="absolute top-2 right-2"
          />
          <p>Hello $identityInfo.addressee,</p>
          <textarea
            value={germanText}
            onChange={(e) => setGermanText(e.target.value)}
            className="w-full p-3 mb-3 border border-gray-300 rounded bg-white"
            placeholder="Geben Sie hier Ihren Text ein..." 
          />
          <GermanTableEditor/>
          {/* <table className="w-full border-collapse mt-3 bg-[#eff1fa]">
            <tbody>
              <tr className="border-b border-gray-300">
                <th className="text-left p-3 bg-[#f0f8ff]">Display Name:</th>
                <td className="p-3">nevermind</td>
              </tr>
              <tr>
                <th className="text-left p-3 bg-[#f0f8ff]">Leaver Date:</th>
                <td className="p-3">ndvermind</td>
              </tr>
            </tbody>
          </table> */}
          <p className="mt-3">Wenn Du Fragen hast, wende Dich bitte an das IAM-Team unter <strong>iam@stroeer.de</strong>.</p>
          <p className="mt-4">Mit freundlichen Grüßen,<br />Ihr Group IT - IT Compliance - IAM Team</p>
        </div>

        {/* English Section */}
        <div className="relative bg-[#dde4eb] p-5 rounded-lg">
          <Image
            src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
            alt="UK Flag"
            width={20}
            height={15}
            className="absolute top-2 right-2"
          />
          <p>Hello $identityInfo.addressee,</p>
          <textarea
            value={englishText}
            onChange={(e) => setEnglishText(e.target.value)}
            className="w-full p-3 mb-3 border border-gray-300 rounded bg-white"
            placeholder="Start writing your text..." 
          />
          <EnglishTableEditor/>
          {/* <table className="w-full border-collapse mt-3 bg-[#eff1fa]">
            <tbody>
              <tr className="border-b border-gray-300">
                <th className="text-left p-3 bg-[#f0f8ff]">Display Name:</th>
                <td className="p-3">nevermind</td>
              </tr>
              <tr>
                <th className="text-left p-3 bg-[#f0f8ff]">Leaver Date:</th>
                <td className="p-3">nevermind</td>
              </tr>
            </tbody>
          </table> */}
          <p className="mt-3">If you have any questions, please contact the IAM team at <strong>iam@stroeer.de</strong>.</p>
          <p className="mt-4">Best regards,<br />Your Group IT - IT Compliance - IAM Team</p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#08204A] p-5 text-center text-white rounded-b-lg">
        <h1 className="text-lg font-bold">Ströer IT Compliance - IAM</h1>
      </div>
    </div>
  );
}
