"use client";

import { useState } from "react";
import { useStore } from "./State";

export default function TableEditor() {
  const { tables, addTable, addRow, updateTable, removeTable, removeRow } = useStore();
  const [showTable, setShowTable] = useState(false);
console.log("***",tables)
  return (
    <div className="mb-5">
      {!tables.length && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            addTable();
            setShowTable(true);
          }}
        >
          Add a Table
        </button>
      )}

      {tables.length > 0 && (
        <div className="bg-[#eff1fa] p-4 rounded-lg mt-4">
          <table className="w-full border-collapse">
            <tbody>
              {tables[0].map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-300">
                  <td className="p-2 bg-[#f0f8ff]">
                    <input
                      type="text"
                      value={row.key}
                      onChange={(e) =>
                        updateTable(0, rowIndex, e.target.value, row.value)
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Key"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.value}
                      onChange={(e) =>
                        updateTable(0, rowIndex, row.key, e.target.value)
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Value"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => removeRow(0, rowIndex)}
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
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              onClick={() => addRow(0)}
            >
              Add Row
            </button>

            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => removeTable(0)}
            >
              Remove Table
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
