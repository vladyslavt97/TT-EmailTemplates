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

  // For editing existing arguments
  const [editingArg, setEditingArg] = useState<string | null>(null);
  const [editedArgName, setEditedArgName] = useState<string>("");

  // Handle template name change
  const handleTemplateNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateName(e.target.value);
  };

  // Handle template name change
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  // Handle template name change
  const handleSubjectChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSubject(e.target.value);
  };

  // Handle argument type change
  const handleArgumentChange = (key: string, value: string) => {
    setArgumentsObject({ ...argumentsObject, [key]: value });
  };

  // Handle argument name change (for editing existing arguments)
  const handleArgumentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedArgName(e.target.value);
  };

  // Save edited argument name
  const saveEditedArgumentName = (key: string) => {
    if (editedArgName.trim() && editedArgName !== key) {
      const updatedArguments = { ...argumentsObject };
      delete updatedArguments[key]; // Remove old key
      updatedArguments[editedArgName] = updatedArguments[key]; // Add new key with the same value
      setArgumentsObject(updatedArguments);
    }
    setEditingArg(null); // Reset the editing state
    setEditedArgName(""); // Clear the edited name field
  };

  // Add a new argument
  const addArgument = () => {
    if (newArgName.trim()) {
      setArgumentsObject({ ...argumentsObject, [newArgName]: newArgType });
      setNewArgName(""); // Clear input after adding
    }
  };

  // Remove an argument
  const removeArgument = (key: string) => {
    const updatedArgs = { ...argumentsObject };
    delete updatedArgs[key];
    setArgumentsObject(updatedArgs);
  };

  return (
    <div className="p-2 mx-auto">
      {/* Template Name Input */}
      <div className="mb-4">
        <label className="block text-xs font-bold mb-1">Template Name</label>
        <p className="text-xs text-gray-400">e.g. STR-EmailTemplate-ExternalLeaver</p>
        <div className="flex items-center pt-2">
          <span className="text-gray-500 text-sm">STR-EmailTemplate-</span>
          <input
            type="text"
            value={templateName}
            onChange={handleTemplateNameChange}
            className="border rounded p-2 flex-grow ml-2 bg-white text-xs"
            placeholder="Enter template suffix..."
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold mb-1">Subject</label>
        <p className="text-xs text-gray-400">e.g. Externe Mitarbeiter Antrag</p>
        <div className="flex items-center pt-2">
            <textarea
            value={subject}
            onChange={handleSubjectChange}
            className="border rounded p-2 flex-grow ml-2 bg-white text-xs resize-none"
            placeholder="Enter subject"
            />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-bold mb-1">Description</label>
        <p className="text-xs text-gray-400">e.g. Notification to the Manager for Reassigning Externals</p>
        <div className="flex items-center pt-2">
            <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="border rounded p-2 flex-grow ml-2 bg-white text-xs resize-none"
            placeholder="Enter description"
            />
        </div>
      </div>

      <hr/>

      {/* Arguments List */}
      <div className="mb-4">
        <h2 className="text-md font-bold">Arguments</h2>
        <ul className="text-sm">
          {Object.entries(argumentsObject).map(([key, value]) => (
            <li key={key} className="flex items-center justify-between border-b py-2">
              <div className="flex flex-row">
                {editingArg === key ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editedArgName}
                      onChange={handleArgumentNameChange}
                      className="border rounded p-1 mr-2 w-40 bg-white"
                    />
                    <button
                      onClick={() => saveEditedArgumentName(key)}
                      className="text-green-800 hover:text-green-700 hover:scale-110 px-2 rounded cursor-pointer"
                    >
                      <IoIosSave size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="mr-2">{key}</span>
                    <button
                      onClick={() => {
                        setEditingArg(key);
                        setEditedArgName(key); // Pre-fill with the current key
                      }}
                      className="hover:scale-110 text-black px-2 py-1 rounded cursor-pointer"
                    >
                      <CiEdit />
                    </button>
                  </div>
                )}
                <select
                  value={value}
                  onChange={(e) => handleArgumentChange(key, e.target.value)}
                  className="border rounded p-1 ml-2"
                >
                  <option value="map">map</option>
                  <option value="boolean">boolean</option>
                  <option value="string">string</option>
                  <option value="list">list</option>
                </select>
              </div>
              <button
                onClick={() => removeArgument(key)}
                className="text-red-700 hover:text-red-500 hover:scale-105 px-2 py-1 rounded ml-2 cursor-pointer"
              >
                <FaTrashAlt size={20}/>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add New Argument */}
      <div className="flex gap-2 text-sm w-full">
        <input
          type="text"
          placeholder="Argument name"
          value={newArgName}
          onChange={(e) => setNewArgName(e.target.value)}
          className="border rounded p-2 flex-grow bg-white"
        />
        <select value={newArgType} onChange={(e) => setNewArgType(e.target.value)} className="border rounded p-2">
          <option value="map">map</option>
          <option value="boolean">boolean</option>
          <option value="string">string</option>
          <option value="list">list</option>
        </select>
        <button onClick={addArgument} className="bg-blue-900 hover:bg-blue-800 text-white px-3 py-2 rounded cursor-pointer">
            <IoMdAdd />
        </button>
      </div>
    </div>
  );
}
