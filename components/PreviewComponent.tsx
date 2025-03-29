"use client";
import { useState } from "react";
import Image from "next/image";

export default function PreviewPage() {
  const [htmlInput, setHtmlInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handlePreviewClick = () => {
    setShowPreview(true);
  };

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
        <h1 className="text-xs text-gray-500 mt-3">
          e.g. Externe Mitarbeiter Antrag/External employee application
        </h1>
      </div>

      {/* Textarea for HTML or text input */}
      <div className="p-5">
        <textarea
          value={htmlInput}
          onChange={(e) => setHtmlInput(e.target.value)}
          placeholder="Paste your HTML or text here"
          rows={10}
          className="w-full p-2 mb-4 border border-gray-300 rounded bg-white text-black"
        />
        <button
          onClick={handlePreviewClick}
          className="bg-[#08204A] text-white py-2 px-4 rounded"
        >
          Preview
        </button>
      </div>

      {/* Preview Section */}
      {showPreview && (
        <div className="p-5 bg-gray-100 mt-5 rounded">
          <h2 className="font-semibold mb-3">Preview</h2>
          <div
            className="preview-content text-[#08204A]"
            dangerouslySetInnerHTML={{
              __html: htmlInput,
            }}
          />
        </div>
      )}

      {/* Footer */}
      <div className="bg-[#08204A] p-5 text-center text-white rounded-b-lg">
        <h1 className="text-lg font-bold">Ströer IT Compliance - IAM</h1>
      </div>
    </div>
  );
}
