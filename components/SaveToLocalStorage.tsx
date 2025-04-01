"use client";

import { BsSave } from "react-icons/bs";
import { useStore } from "./State";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SaveToLocalStorage() {
  const { emailInfo, argumentsObject, templateName, subject, description, germanTables, englishTables } = useStore();
  const { setTemplateName, setSubject, setDescription, setArgumentsObject, setGermanAddressee, setEnglishAddressee, setGermanText, setEnglishText, setTitle } = useStore();

  const [beingSaved, setBeingSaved] = useState(false);
  const handleSaveToLocalStorage = () => {
    setBeingSaved(true);
    try {
      const data = {
        emailInfo,
        argumentsObject,
        templateName,
        description,
        germanTables,
        englishTables,
        subject,
      };
      
      localStorage.setItem("emailTemplateData", JSON.stringify(data));
      console.log("Data saved successfully to local storage!");
      setTimeout(()=>{
        setBeingSaved(false);
      },3000)
    } catch (error) {
      console.log("Error saving data: " + error);
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem("emailTemplateData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);

        // Update Zustand store with saved values
        setTemplateName(parsedData.templateName || "");
        setSubject(parsedData.subject || "");
        setDescription(parsedData.description || "");
        setArgumentsObject(parsedData.argumentsObject || {});
        
        if (parsedData.emailInfo) {
          setGermanAddressee(parsedData.emailInfo.germanAddressee || "");
          setEnglishAddressee(parsedData.emailInfo.englishAddressee || "");
          setGermanText(parsedData.emailInfo.germanText || "");
          setEnglishText(parsedData.emailInfo.englishText || "");
          setTitle(parsedData.emailInfo.title || "");
        }

      } catch (error) {
        console.error("Error parsing local storage data:", error);
      }
    }
  }, []);

  return (
    <div
      className="flex flex-row gap-2 items-center justify-center px-1 bg-[#252526] border border-[#3c3c3c] rounded hover:bg-[#3c3c3c] scalingItems-hover cursor-pointer text-[#d4d4d4] hover:text-green-500 transition-all w-[75px]"
      onClick={handleSaveToLocalStorage}
    >
      {!beingSaved ? 
        <>
          <BsSave size={22} />
          <span className="text-sm">Save</span>
        </>
        :
        <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={beingSaved ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <CheckCircle size={20} className="text-green-500" />
      </motion.div>
      }
    </div>
  );
}
