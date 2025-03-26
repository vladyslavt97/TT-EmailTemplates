"use client";

import Image from "next/image";

export default function SaveXml() {
  const handleGenerateXML = async () => {
    const identityInfo = {
      addressee: "John Doe",
      fullName: "John Doe",
      leaverDate: "2025-03-25",
    };

    try {
      // Make the POST request to the backend API route
      const response = await fetch('/api/generateXml', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identityInfo,
          secondNotification: false,
          managerEmailBoolean: true,
          templateName: "STR-EmailTemplate-ExternalLeaverOrManagerNotification",
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
      a.download = "STR-EmailTemplate-ExternalLeaverOrManagerNotification.xml"; // Default name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      alert("Error generating XML file: " + error);
    }
  };

  return (
      <div className="flex flex-row gap-5" onClick={handleGenerateXML}>
        <Image
          src="/savebutton.png"
          alt="Save XML"
          width={30}
          height={30}
          className="object-contain hover:scale-110 cursor-pointer"
        />
      </div>
  );
}
