"use client";

import { useStore } from "./State";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";

export default function Setup() {
  const { templateName, setTemplateName, subject, setSubject, description, setDescription, argumentsObject, setArgumentsObject } = useStore();
  const [newArgName, setNewArgName] = useState("");
  const [newArgType, setNewArgType] = useState("map");

  const [editingArg, setEditingArg] = useState<string | null>(null);
  const [editedArgName, setEditedArgName] = useState<string>("");

  const handleTemplateNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSubject(e.target.value);
  };

  const handleArgumentChange = (key: string, value: string) => {
    setArgumentsObject({ ...argumentsObject, [key]: value });
  };

  const handleArgumentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedArgName(e.target.value);
  };

  const saveEditedArgumentName = (key: string) => {
    if (editedArgName.trim() && editedArgName !== key) {
      const updatedArguments = { ...argumentsObject };
      const value = updatedArguments[key];
      delete updatedArguments[key];
      updatedArguments[editedArgName] = value;
      setArgumentsObject(updatedArguments);
    }
    setEditingArg(null);
    setEditedArgName("");
  };

  const addArgument = () => {
    if (newArgName.trim()) {
      setArgumentsObject({ ...argumentsObject, [newArgName]: newArgType });
      setNewArgName("");
    }
  };

  const removeArgument = (key: string) => {
    const updatedArgs = { ...argumentsObject };
    delete updatedArgs[key];
    setArgumentsObject(updatedArgs);
  };

  return (
    <div className="p-4 mx-auto bg-[#1e1e1e] text-[#d4d4d4] rounded-lg shadow-lg max-w-2xl border border-[#3c3c3c] font-mono max-h-[calc(100vh-90px)] overflow-y-auto">
      {/* Template Name Input */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-[#dcdcaa]">Template Name</label>
        <p className="text-xs text-gray-400">e.g. STR-EmailTemplate-ExternalLeaver</p>
        <div className="flex items-center mt-2 bg-[#252526] border border-[#3c3c3c] p-2 rounded">
          <span className="text-[#6a9955] text-sm">STR-EmailTemplate-</span>
          <input
            type="text"
            value={templateName}
            onChange={handleTemplateNameChange}
            className="bg-transparent text-[#9cdcfe] border-none outline-none flex-grow text-sm"
            placeholder="Enter template suffix..."
          />
        </div>
      </div>

      {/* Subject Input */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-[#dcdcaa]">Subject</label>
        <p className="text-xs text-gray-400">e.g. Externe Mitarbeiter Antrag</p>
        <textarea
          value={subject}
          onChange={handleSubjectChange}
          className="w-full mt-2 bg-[#252526] border border-[#3c3c3c] p-2 rounded text-[#9cdcfe] text-sm outline-none resize-none"
          placeholder="Enter subject"
        />
      </div>

      {/* Description Input */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-[#dcdcaa]">Description</label>
        <p className="text-xs text-gray-400">e.g. Notification to the Manager for Reassigning Externals</p>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          className="w-full mt-2 bg-[#252526] border border-[#3c3c3c] p-2 rounded text-[#9cdcfe] text-sm outline-none resize-none"
          placeholder="Enter description"
        />
      </div>

      <hr className="border-[#3c3c3c] my-6" />

      {/* Arguments List */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-[#dcdcaa] sticky top-0 bg-[#1e1e1e] py-2">Arguments</h2>
        <ul className="text-sm max-h-[40vh] overflow-y-auto custom-scrollbar">
          {Object.entries(argumentsObject).map(([key, value]) => (
            <li key={key} className="flex items-center justify-between bg-[#252526] border border-[#3c3c3c] p-2 rounded my-2">
              <div className="flex items-center">
                {editingArg === key ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editedArgName}
                      onChange={handleArgumentNameChange}
                      className="bg-transparent border border-[#3c3c3c] p-1 rounded text-[#9cdcfe] w-40"
                    />
                    <button
                      onClick={() => saveEditedArgumentName(key)}
                      className="text-green-400 hover:text-green-300 hover:scale-110"
                    >
                      <IoIosSave size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="mr-2 text-[#9cdcfe]">{key}</span>
                    <button
                      onClick={() => {
                        setEditingArg(key);
                        setEditedArgName(key);
                      }}
                      className="text-[#c586c0] hover:text-white hover:scale-110"
                    >
                      <CiEdit />
                    </button>
                  </div>
                )}
                <select
                  value={value}
                  onChange={(e) => handleArgumentChange(key, e.target.value)}
                  className="bg-[#252526] border border-[#3c3c3c] p-1 rounded text-[#9cdcfe] ml-2"
                >
                  <option value="map">map</option>
                  <option value="boolean">boolean</option>
                  <option value="string">string</option>
                  <option value="list">list</option>
                </select>
              </div>
              <button
                onClick={() => removeArgument(key)}
                className="text-red-400 hover:text-red-300 hover:scale-110"
              >
                <FaTrashAlt size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add New Argument */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Argument name"
          value={newArgName}
          onChange={(e) => setNewArgName(e.target.value)}
          className="bg-[#252526] border border-[#3c3c3c] p-2 rounded text-[#9cdcfe] flex-grow outline-none"
        />
        <select
          value={newArgType}
          onChange={(e) => setNewArgType(e.target.value)}
          className="bg-[#252526] border border-[#3c3c3c] p-2 rounded text-[#9cdcfe]"
        >
          <option value="map">map</option>
          <option value="boolean">boolean</option>
          <option value="string">string</option>
          <option value="list">list</option>
        </select>
        <button
          onClick={addArgument}
          className="bg-[#007acc] hover:bg-[#005f99] text-white px-3 py-2 rounded cursor-pointer"
        >
          <IoMdAdd />
        </button>
      </div>
    </div>
  );
}
