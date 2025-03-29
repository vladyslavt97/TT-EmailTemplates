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
  const [validationErrors, setValidationErrors] = useState<Array<{ message: string }>>([]);

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

      if (!result.isValid) {
        console.log("Validation failed");

        setIsValidHTML(false);
        setValidationErrors(result.errors[0].messages);
      } else {
        setIsValidHTML(true);
        setValidationErrors([]);
      }
    } catch (error) {
      console.error("Validation error:", error);
      setIsValidHTML(false);
      setValidationErrors([{message: "Failed to validate HTML."}]);
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
    <div className="max-w-2xl mx-auto bg-white rounded-lg text-[#08204A] font-sans overflow-y-scroll h-screen w-600 my-auto">
      <Link
          href="/"
          className="bg-[#1e1e1e] !text-[#dcdcaa] font-mono px-4 py-1 rounded-lg shadow-md border border-[#3c3c3c] hover:bg-[#252526] hover:!text-[#ffffff] transition duration-300 cursor-pointer absolute top-1 right-5"
        >
        Back To Main
      </Link>

      {/* Header */}
      <div className="bg-[#08204A] p-5 text-center text-white rounded-t-lg">
        <div className="inline-block bg-white p-2 rounded">
          <Image src="/loginLogo.png" alt="Ströer logo" width={150} height={50} />
        </div>
      </div>

      {/* Button to toggle between textarea and preview */}
      {showPreview && htmlInput && (
        <button
          onClick={handleToggleView}
          className={`${showPreview ? "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-4 rounded-lg shadow-xl transition duration-300" : "bg-[#08204A]"} text-white py-2 px-4 rounded m-10 absolute top-0 left-0 cursor-pointer`}
          disabled={!htmlInput.trim() || !isValidHTML}
        >
          {showPreview ? "Edit HTML" : "Preview"}
        </button>
      )}

      {/* Textarea or Preview Section */}
      {!showPreview ? (
        <>
          {/* Render CodeMirror editor */}
          <div ref={setContainer} className="w-full mb-4 border border-gray-300 rounded bg-[#282c34] text-black min-h-[50vh]" />
          {validationErrors && (validationErrors.length > 0) && (
            <ol className="text-red-500 mt-4">
              {validationErrors.map((el, index) => (
                <li key={index}>
                  {index + 1}. {el.message}
                </li>
              ))}
            </ol>
          )}
        </>
      ) : (
        <div
          className="preview-content text-[#08204A]"
          dangerouslySetInnerHTML={{
            __html: htmlInput,
          }}
        />
      )}

      {/* Button to toggle between textarea and preview */}
      {!showPreview && htmlInput && (
        <button
          onClick={handleToggleView}
          className={`${!showPreview && "bg-[#08204A]"} text-white py-2 px-4 rounded m-10 cursor-pointer`}
          disabled={!htmlInput.trim() || !isValidHTML}
        >
          {showPreview ? "Edit HTML" : "Preview"}
        </button>
      )}

      {/* Footer */}
      <div className="bg-[#08204A] p-5 text-center text-white rounded-b-lg">
        <h1 className="text-lg font-bold">Ströer IT Compliance - IAM</h1>
      </div>
    </div>
  );
}
