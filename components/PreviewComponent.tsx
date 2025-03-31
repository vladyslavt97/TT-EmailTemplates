"use client";
import { useState } from "react";
import Image from "next/image";
import { useCodeMirror } from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import Link from "next/link";

export default function PreviewPage() {
  const [htmlInput, setHtmlInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isValidHTML, setIsValidHTML] = useState(true);
  const [validationErrors, setValidationErrors] = useState<Array<{ message: string, line: number }>>([]);

  const handleToggleView = () => {
    setShowPreview(!showPreview);
  };

  const validateHTML = async (html: string) => {
    try {
      const response = await fetch("/api/validator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ htmlInput: html }),
      });
  
      const result = await response.json();
      let errors = result.isValid ? [] : result.errors[0].messages;
  
      // Check for lowercase "du", "dein", "dir"
      const forbiddenWords = [
        "du", "dich", "dir", "dein", "deine", "deiner", "deines", "deinen", "deinem"
      ];
      
      const newErrors: { message: string; line: number }[] = [];
  
      const lines = html.split("\n");
      lines.forEach((line, index) => {
        forbiddenWords.forEach((word) => {
          const regex = new RegExp(`\\b${word}\\b`, "g");
          let match;
          while ((match = regex.exec(line)) !== null) {
            newErrors.push({
              message: `Incorrect lowercase usage of "${word}". Should be capitalized.`,
              line: index + 1,
            });
          }
        });
      });
  
      if (newErrors.length > 0) {
        setIsValidHTML(false);
        setValidationErrors([...errors, ...newErrors]);
      } else {
        setIsValidHTML(result.isValid);
        setValidationErrors(errors);
      }
    } catch (error) {
      console.error("Validation error:", error);
      setIsValidHTML(false);
      setValidationErrors([{ message: "Failed to validate HTML.", line: 0 }]);
    }
  };
  

  // Use the `useCodeMirror` hook for the CodeMirror editor
  const { setContainer } = useCodeMirror({
    value: htmlInput,
    theme: oneDark, // You can choose another theme
    extensions: [html()],
    onChange: (value) => {
      setHtmlInput(value);
      validateHTML(value);
    },
  });

  return (
    <div className="mx-auto bg-black rounded-lg text-[#08204A] font-sans h-screen w-[700px] my-auto">
      <div className="absolute top-1 right-5 flex flex-col justify-center">
        <Link
            href="/"
            className="bg-[#1e1e1e] !text-[#dcdcaa] font-mono px-4 py-1 rounded-lg shadow-md border border-[#3c3c3c] hover:bg-[#252526] hover:!text-[#ffffff] transition duration-300 cursor-pointer "
          >
          Back To Main
        </Link>
        {/* Button to toggle between textarea and preview */}
        <button
          onClick={handleToggleView}
          className={`text-sm font-bold py-2 px-4 rounded-lg shadow-xl transition duration-300 cursor-pointer
            ${showPreview ? 
              "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white" :
              validationErrors.length === 0 ? 
                "bg-[#08204A] text-white" : 
                "bg-[#636363] text-gray-400 opacity-30 cursor-not-allowed"
            }`}
          disabled={!htmlInput.trim() || !isValidHTML}
        >
          {showPreview ? "Edit HTML" : "Preview"}
        </button>
      </div>


      {/* Header */}
      <div className="bg-[#08204A] p-5 text-center text-white rounded-t-lg h-[15vh] ">
        <div className="inline-block bg-white px-2 pt-2 rounded">
          <Image src="/loginLogo.png" alt="Ströer logo" width={150} height={50} />
        </div>
        <p className="bg-[#08204A] !text-white !-mb-0">{!showPreview && "Write your html here:"}</p>
      </div>


      {/* Textarea or Preview Section */}
      {!showPreview ? (
        <>
          {/* Render CodeMirror editor */}
          <div ref={setContainer} className="w-full text-black h-[60vh] bg-[#282c34] overflow-y-scroll" />
          {validationErrors && (validationErrors.length > 0) && (
            <ol className="text-red-500 p-4 h-[19vh] bg-[#000000] overflow-y-auto">
              <h2>Errors</h2>
              {validationErrors.map((el, index) => (
                <li key={index}>
                  {index + 1}. {el.message} {" (line: "+el.line+")"}
                </li>
              ))}
            </ol>
          )}
        </>
      ) : (
        <div
          className="preview-content text-[#08204A] h-[79vh] overflow-y-scroll bg-white"
          dangerouslySetInnerHTML={{
            __html: htmlInput,
          }}
        />
      )}
      

      {/* FOOTER  */}
      <div className="bg-[#08204A] py-5 text-center text-white rounded-b-lg h-[6vh] flex justify-center items-center absolute bottom-0 w-[700px]">
        <h1 className="text-lg font-bold">Ströer IT Compliance - IAM</h1>
      </div>
    </div>
  );
}
