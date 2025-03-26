"use client";
import { useStore } from "./State";
import { useState } from "react";

export default function Setup() {
  const { templateName, setTemplateName, argumentsObject, setArgumentsObject } = useStore();
  const [newArgName, setNewArgName] = useState("");
  const [newArgType, setNewArgType] = useState("map");

  // Handle template name change
  const handleTemplateNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateName(e.target.value);
  };

  // Handle argument change
  const handleArgumentChange = (key: string, value: string) => {
    setArgumentsObject({ ...argumentsObject, [key]: value });
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
        <label className="block text-sm font-bold mb-1">Template Name</label>
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

      {/* Arguments List */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">Arguments</h2>
        <ul>
          {Object.entries(argumentsObject).map(([key, value]) => (
            <li key={key} className="flex items-center justify-between border-b py-2">
              <div className="flex-grow">
                <input
                  type="text"
                  value={key}
                  readOnly
                  className="border rounded p-1 mr-2 w-40 bg-gray-100"
                />
                <select
                  value={value}
                  onChange={(e) => handleArgumentChange(key, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="map" className="bg-pink-500">map</option>
                  <option value="boolean" className="bg-amber-500">boolean</option>
                  <option value="string" className="bg-blue-500">String</option>
                  <option value="List" className="bg-green-500">List</option>
                </select>
              </div>
              <button
                onClick={() => removeArgument(key)}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              >
                Remove
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
        <button onClick={addArgument} className="bg-blue-500 text-white px-3 py-2 rounded">
          Add
        </button>
      </div>
    </div>
  );
}
