"use client"
import Image from "next/image";

export default function SaveXml() {
    // Handle the API call to generate the XML file
    const handleGenerateXML = async () => {
        const identityInfo = {
          addressee: "John Doe",
          fullName: "John Doe",
          leaverDate: "2025-03-25", // Add appropriate values here
        };
      
        const response = await fetch("/api/generatexml", { // Ensure the URL matches the API route
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identityInfo,
            secondNotification: false,
            managerEmailBoolean: true,
            templateName: "STR-EmailTemplate-ExternalLeaverOrManagerNotification",
          }),
        });
        console.log(response)
        if (response.ok) {
          const result = await response.json();
          alert(`XML file created successfully: ${result.filePath}`);
        } else {
          alert("Error generating XML file.");
        }
      };
      
    return (
    <div className="text-center mt-4">
        <div className="flex flex-row gap-5" onClick={handleGenerateXML}>
          <Image
            src="/savebutton.png"
            alt="Ströer logo"
            width={30}
            height={30}
            className=" object-contain hover:scale-110 cursor-pointer"
          />
        </div>
      </div>
    );
  }