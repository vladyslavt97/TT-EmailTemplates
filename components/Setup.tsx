"use client";

import { useStore } from "./State";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { CiSaveUp2 } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";

export default function Setup() {
  const { templateName, setTemplateName, description, setDescription, argumentsObject, setArgumentsObject } = useStore();
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
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
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
    <div className="p-4 max-w-md mx-auto">
      {/* Template Name Input */}
      <div className="mb-4">
        <label className="block text-xs font-bold mb-1">Template Name</label>
        <div className="flex items-center">
          <span className="text-gray-500">STR-EmailTemplate-</span>
          <input
            type="text"
            value={templateName}
            onChange={handleTemplateNameChange}
            className="border rounded p-2 flex-grow ml-2 bg-white"
            placeholder="Enter template suffix..."
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold mb-1">Description</label>
        <div className="flex items-center">
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            className="border rounded p-2 flex-grow ml-2 bg-white"
            placeholder="Enter description"
          />
        </div>
      </div>

      {/* Arguments List */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">Arguments</h2>
        <ul>
          {Object.entries(argumentsObject).map(([key, value]) => (
            <li key={key} className="flex items-center justify-between border-b py-2">
              <div className="flex flex-row">
                {editingArg === key ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editedArgName}
                      onChange={handleArgumentNameChange}
                      className="border rounded p-1 mr-2 w-40"
                    />
                    <button
                      onClick={() => saveEditedArgumentName(key)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      <CiSaveUp2 />
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
                      className=" text-black px-2 py-1 rounded cursor-pointer"
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
                  <option value="string">String</option>
                  <option value="List">List</option>
                </select>
              </div>
              <button
                onClick={() => removeArgument(key)}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2 cursor-pointer"
              >
                <CiTrash />
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
          className="border rounded p-2 flex-grow"
        />
        <select value={newArgType} onChange={(e) => setNewArgType(e.target.value)} className="border rounded p-2">
          <option value="map">map</option>
          <option value="boolean">boolean</option>
          <option value="string">string</option>
          <option value="number">number</option>
        </select>
        <button onClick={addArgument} className="bg-blue-500 text-white px-3 py-2 rounded cursor-pointer">
            <IoMdAdd />
        </button>
      </div>
    </div>
  );
}
