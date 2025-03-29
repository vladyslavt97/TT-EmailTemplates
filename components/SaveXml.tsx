"use client";

import { useStore } from "./State";
import { FaRegSave } from "react-icons/fa";

export default function SaveXml() {
  const { emailInfo, argumentsObject, templateName, subject, description, germanTables, englishTables } = useStore();

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
          subject
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
    <div className="flex flex-col items-center hover:scale-110 cursor-pointer text-white hover:text-yellow-500" onClick={handleGenerateXML}>
      <FaRegSave size={22}/>
      <span className=" text-xs">save</span>
    </div>
  );
}
