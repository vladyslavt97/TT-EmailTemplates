"use client";

import { useStore } from "./State";
import { IoMdAdd } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

export default function GermanTableEditor() {
  // Extract the functions and germanTables state from the store
  const { germanTables, addGermanTable, addRowToGermanTable, updateGermanTable, removeGermanTable, removeRowFromGermanTable } = useStore();

  return (
    <div className="mb-5">
      {!germanTables.length && (
        <button
          className="bg-blue-900 text-white p-2 rounded-full hover:bg-blue-800 text-sm shadow-xl flex justify-center items-center gap-2 cursor-pointer"
          onClick={() => {
            addGermanTable();
          }}
        >
          <IoMdAdd /> Add a table
        </button>
      )}

      {germanTables.length > 0 && (
        <div className="bg-[#eff1fa] p-4 rounded-lg mt-4 relative">
          <table className="w-full border-collapse">
            <tbody>
              {germanTables[0].map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-300">
                  <td className="p-2 bg-[#f0f8ff]">
                    <input
                      type="text"
                      value={row.key}
                      onChange={(e) =>
                        updateGermanTable(0, rowIndex, e.target.value, row.value)
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
                        updateGermanTable(0, rowIndex, row.key, e.target.value)
                      }
                      className="w-full p-2 border rounded bg-white"
                      placeholder="Value"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-red-800 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                      onClick={() => removeRowFromGermanTable(0, rowIndex)}
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
              onClick={() => addRowToGermanTable(0)}
            >
              Add Row
            </button>
          </div>
          <button
              className="text-red-500 hover:text-red-900 scalingItems-hover py-1 rounded text-xs cursor-pointer absolute top-2 right-2"
              onClick={() => removeGermanTable(0)}>
             <FaTrashAlt size={15}/>
          </button>
        </div>
      )}
    </div>
  );
}
