"use client";

import { BsTrash } from "react-icons/bs";
import { useStore } from "./State";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ClearLocalStorage() {
  const {
    setTemplateName,
    setSubject,
    setDescription,
    setArgumentsObject,
    setGermanAddressee,
    setEnglishAddressee,
    setGermanText,
    setEnglishText,
    setTitle,
  } = useStore();

  const [cleared, setCleared] = useState(false);

  const handleClearLocalStorage = () => {
    localStorage.removeItem("emailTemplateData");

    // Reset Zustand store values
    setTemplateName("");
    setSubject("");
    setDescription("");
    setArgumentsObject({});
    setGermanAddressee("");
    setEnglishAddressee("");
    setGermanText("");
    setEnglishText("");
    setTitle("");

    setCleared(true);

    setTimeout(() => {
      setCleared(false);
    }, 3000);
  };

  return (
    <div
      className="flex flex-row gap-2 items-center justify-center px-1 bg-[#252526] border border-[#3c3c3c] rounded hover:bg-[#3c3c3c] scalingItems-hover cursor-pointer text-[#d4d4d4] hover:text-red-500 transition-all w-[85px]"
      onClick={handleClearLocalStorage}
    >
      {!cleared ? (
        <>
          <BsTrash size={22} />
          <span className="text-sm">Clear</span>
        </>
      ) : (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={cleared ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <CheckCircle size={20} className="text-red-500" />
        </motion.div>
      )}
    </div>
  );
}
