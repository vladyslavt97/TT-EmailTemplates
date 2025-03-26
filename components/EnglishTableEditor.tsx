"use client";

import { useState } from "react";
import { useStore } from "./State";
import { IoMdAdd } from "react-icons/io";

export default function EnglishTableEditor() {
  // Extract the functions and englishTables state from the store
  const { englishTables, addEnglishTable, addRowToEnglishTable, updateEnglishTable, removeEnglishTable, removeRowFromEnglishTable } = useStore();
  const [showTable, setShowTable] = useState(false);

  console.log("***", englishTables); // To see the English tables in the console

  return (
    <div className="mb-5">
      {!englishTables.length && (
        <button
          className="bg-blue-900 text-white p-2 rounded-full hover:bg-blue-800 text-sm shadow-xl flex justify-center items-center gap-2"
          onClick={() => {
            addEnglishTable();
            setShowTable(true);
          }}
        >
          <IoMdAdd /> Add an Table
        </button>
      )}

      {englishTables.length > 0 && (
        <div className="bg-[#eff1fa] p-4 rounded-lg mt-4">
          <table className="w-full border-collapse">
            <tbody>
              {englishTables[0].map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-300">
                  <td className="p-2 bg-[#f0f8ff]">
                    <input
                      type="text"
                      value={row.key}
                      onChange={(e) =>
                        updateEnglishTable(0, rowIndex, e.target.value, row.value)
                      }
                      className="w-full p-2 border rounded bg-white"
                      placeholder="Key"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.value}
                      onChange={(e) =>
                        updateEnglishTable(0, rowIndex, row.key, e.target.value)
                      }
                      className="w-full p-2 border rounded bg-white"
                      placeholder="Value"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                      onClick={() => removeRowFromEnglishTable(0, rowIndex)}
                    >
                      Remove Row
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 flex gap-2">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
              onClick={() => addRowToEnglishTable(0)}
            >
              Add Row
            </button>

            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
              onClick={() => removeEnglishTable(0)}
            >
              Remove Table
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
