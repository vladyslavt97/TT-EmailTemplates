"use client";

import { useStore } from "./State";
import { IoMdAdd } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

export default function EnglishTableEditor() {
  // Extract the functions and englishTables state from the store
  const { englishTables, addEnglishTable, addRowToEnglishTable, updateEnglishTable, removeEnglishTable, removeRowFromEnglishTable } = useStore();

  console.log("***", englishTables); // To see the English tables in the console

  return (
    <div className="mb-5">
      {!englishTables.length && (
        <button
          className="bg-blue-900 text-white p-2 rounded-full hover:bg-blue-800 text-sm shadow-xl flex justify-center items-center gap-2 cursor-pointer"
          onClick={() => {
            addEnglishTable();
          }}
        >
          <IoMdAdd /> Add a table
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
                      className="bg-red-800 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                      onClick={() => removeRowFromEnglishTable(0, rowIndex)}
                    >
                      Remove Row
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 flex justify-end gap-2 pr-2">
            <button
              className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
              onClick={() => addRowToEnglishTable(0)}
            >
              Add Row
            </button>
          </div>
          <button
              className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-800 text-xs w-full mt-5 flex justify-center items-center gap-2"
              onClick={() => removeEnglishTable(0)}>
            Remove Table <FaTrashAlt size={15}/>
          </button>
        </div>
      )}
    </div>
  );
}
