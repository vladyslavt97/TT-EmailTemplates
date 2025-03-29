"use client";
import { useState } from "react";
import Image from "next/image";

export default function PreviewPage() {
  const [htmlInput, setHtmlInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Toggle between showing the textarea and the preview
  const handleToggleView = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg text-[#08204A] font-sans overflow-y-scroll h-screen">
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

      </div>

      {/* Button to toggle between textarea and preview */}
      {showPreview && htmlInput && (
        <button
          onClick={handleToggleView}
          className={`${showPreview ? "bg-red-500" : "bg-[#08204A]"} text-white py-2 px-4 rounded m-10 absolute top-0 left-0`}
          disabled={!htmlInput.trim()} // Disable the button if htmlInput is empty or only contains whitespace
        >
          {showPreview ? "Edit HTML" : "Preview"}
        </button>
      )}

      {/* Textarea or Preview Section */}
      <div className="">
        {!showPreview ? (
          <>
            {/* Textarea for HTML or text input */}
            <textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="Paste your HTML or text here"
              rows={10}
              className="w-full p-2 mb-4 border border-gray-300 rounded bg-white text-black"
            />
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
        <button
          onClick={handleToggleView}
          className={`${showPreview ? "bg-red-500" : "bg-[#08204A]"} text-white py-2 px-4 rounded m-10`}
          disabled={!htmlInput.trim()} // Disable the button if htmlInput is empty or only contains whitespace
        >
          {showPreview ? "Edit HTML" : "Preview"}
        </button>
        
      </div>

      {/* Footer */}
      <div className="bg-[#08204A] p-5 text-center text-white rounded-b-lg">
        <h1 className="text-lg font-bold">Ströer IT Compliance - IAM</h1>
      </div>
    </div>
  );
}
