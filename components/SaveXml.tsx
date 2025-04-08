"use client";

import { BsGearWideConnected } from "react-icons/bs";
import { useStore } from "./State";

export default function SaveXml() {
  const { emailInfo, argumentsObject, templateName, subject, subject2, description, germanTables, englishTables } = useStore();

  const handleGenerateXML = async () => {
    try {
      // Make the POST request to the backend API route
      const response = await fetch('/api/generateXml', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailInfo,
          argumentsObject,
          templateName,
          description,
          germanTables,
          englishTables,
          subject,
          subject2
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate XML file");
      }

      // Convert response to a blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link and trigger a download
      const a = document.createElement("a");
      a.href = url;
      a.download = `STR-EmailTemplate-${templateName}.xml`; // Use dynamic template name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Error generating XML file: " + error);
    }
  };

  return (
    <div
      className="flex flex-row gap-2 items-center px-1 bg-[#252526] border border-[#3c3c3c] rounded hover:bg-[#3c3c3c] scalingItems-hover cursor-pointer text-[#d4d4d4] hover:text-yellow-500 transition-all"
      onClick={handleGenerateXML}
    >
      <BsGearWideConnected size={22} />
      <span className="text-sm">Generate .XML</span>
    </div>
  );
}
