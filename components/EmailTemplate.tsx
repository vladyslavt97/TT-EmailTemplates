"use client";

import { useState } from "react";
import { useStore } from "./State";
import Image from "next/image";
import GermanTableEditor from "./GermanTableEditor";
import EnglishTableEditor from "./EnglishTableEditor";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function EmailTemplate() {
  const { emailInfo, setGermanAddressee, setEnglishAddressee, setGermanText, setEnglishText, setTitle, germanTables, englishTables } = useStore();
  const { germanAddressee, englishAddressee, germanText, englishText, title } = emailInfo;
  
  // State to track if we're in preview mode
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg text-[#08204A] font-sans relative">
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
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <button onClick={togglePreview}>
            {isPreviewMode ? <FaEyeSlash size={30} className="scalingItems-hover text-gray-600 cursor-pointer"/> 
            : <FaEye size={30} className="scalingItems-hover cursor-pointer"/>}
          </button>
        </div>
        {!isPreviewMode && <h1 className="text-xs text-gray-500 my-3">e.g. Externe Mitarbeiter Antrag / External employee application</h1>}
        {!isPreviewMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Geben Sie den Title..."
            className="w-full p-1 mb-4 border border-gray-300 rounded bg-white text-black"
          />
        ):
          <p className="!mb-0 !text-xl">{title}</p>
        }
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
            className="absolute top-2 right-2 object-contain"
          />
          <div className="flex flex-row items-center gap-2 pt-2">Hallo
            <div className="flex flex-col w-full">
              {!isPreviewMode && <span className="text-xs text-gray-500">e.g. $identityInfo.addressee</span>}
              {!isPreviewMode ? (
                <input
                  type="text"
                  value={germanAddressee}
                  onChange={(e) => setGermanAddressee(e.target.value)}
                  placeholder="Geben Sie den Namen des Empfängers ein..."
                  className="w-full p-3 mb-4 border border-gray-300 rounded bg-white"
                />
              ) : (
                <p className="!mb-0">{germanAddressee}</p>
              )}
            </div>
          </div>
          {!isPreviewMode && <span className="text-xs text-gray-500">e.g. ein Antrag auf die Erstellung einer externen Identität...</span>}
          {!isPreviewMode ? (
            <textarea
              value={germanText}
              onChange={(e) => setGermanText(e.target.value)}
              className="w-full p-3 mb-3 border border-gray-300 rounded bg-white"
              placeholder="Geben Sie hier Ihren Text ein..." 
            />
          ) : (
            <p>{germanText}</p>
          )}
          {!isPreviewMode ? <GermanTableEditor /> : (
            <table>
              <tbody>
                {germanTables[0]?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <th scope="col">{row.key}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
            className="absolute top-2 right-2 object-contain"
          />
          <div className="flex flex-row items-center gap-2 pt-2">Hello
            <div className="flex flex-col w-full">
              {!isPreviewMode && <span className="text-xs text-gray-500">e.g. $identityInfo.addressee</span>}
              {!isPreviewMode ? (
                <input
                  type="text"
                  value={englishAddressee}
                  onChange={(e) => setEnglishAddressee(e.target.value)}
                  placeholder="Geben Sie den Namen des Empfängers ein..."
                  className="w-full p-3 mb-4 border border-gray-300 rounded bg-white"
                />
              ) : (
                <p className="!mb-0">{englishAddressee}</p>
              )}
            </div>
          </div>
          {!isPreviewMode && <span className="text-xs text-gray-500">e.g. an external identity creation request has been submitted...</span>}
          {!isPreviewMode ? (
            <textarea
              value={englishText}
              onChange={(e) => setEnglishText(e.target.value)}
              className="w-full p-3 mb-3 border border-gray-300 rounded bg-white"
              placeholder="Start writing your text..." 
            />
          ) : (
            <p>{englishText}</p>
          )}
          {!isPreviewMode ? <EnglishTableEditor /> : (
            <table>
              <tbody>
                {englishTables[0]?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <th scope="col">{row.key}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <p className="mt-3">If you have any questions, please contact the IAM team at <strong>iam@stroeer.de</strong>.</p>
          <p className="mt-4">Best regards,<br />Your Group IT - IT Compliance - IAM Team</p>
        </div>
      </div>
      
      <p className="!pl-[30px] text-[#555] !italic">
        Diese Nachricht wurde automatisch erstellt. Antworten auf diese E-Mail werden nicht gelesen.
      </p>
      <p className="underfooter-note">
        <a href="https://iam.stroeer.com/faq">Häufig gestellte Fragen (FAQ)</a>
      </p>

      {/* Footer */}
      <div className="bg-[#08204A] p-5 text-center text-white rounded-b-lg">
        <h1 className="text-lg font-bold">Ströer IT Compliance - IAM</h1>
      </div>
    </div>
  );
}
