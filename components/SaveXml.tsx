"use client";

import Image from "next/image";
import { useStore } from "./State";
import { FaRegSave } from "react-icons/fa";

export default function SaveXml() {
  const { emailInfo, argumentsObject, templateName, description, germanTables, englishTables } = useStore();

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
          englishTables
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
    <div className="flex flex-row gap-5 hover:scale-110 cursor-pointer" onClick={handleGenerateXML}>
      <FaRegSave color="white" size={25}/>
    </div>
  );
}
