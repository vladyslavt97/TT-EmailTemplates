import { create } from "zustand";

interface ArgumentsObject {
  [key: string]: string;
}

interface EmailInfo {
  germanText: string;
  englishText: string;
}

type TableRow = { key: string; value: string };
type Table = TableRow[];

export const useStore = create<{
  emailInfo: EmailInfo;
  argumentsObject: ArgumentsObject;
  templateName: string;
  description: string;
  tables: Table[];
  setEmailInfo: (emailInfo: EmailInfo) => void;
  setArgumentsObject: (argumentsObject: ArgumentsObject) => void;
  setTemplateName: (templateName: string) => void;
  setDescription: (description: string) => void;
  setGermanText: (germanText: string) => void;
  setEnglishText: (englishText: string) => void;
  addTable: () => void;
  addRow: (tableIndex: number) => void;
  updateTable: (tableIndex: number, rowIndex: number, key: string, value: string) => void;
  removeTable: (tableIndex: number) => void;
  removeRow: (tableIndex: number, rowIndex: number) => void;
}>((set) => ({
  emailInfo: {
    germanText: "Bei der unten genannten externen Identität...",
    englishText: "For the external identity below...",
  },
  argumentsObject: {
    identityInfo: "map",
    isSecondNotification: "boolean",
    isManagerEmail: "boolean",
  },
  templateName: "InternalLeaverNotification",
  description: "",
  tables: [],

  setEmailInfo: (emailInfo) => set({ emailInfo }),
  setArgumentsObject: (argumentsObject) => set({ argumentsObject }),
  setTemplateName: (templateName) => set({ templateName }),
  setDescription: (description) => set({ description }),
  setGermanText: (germanText) =>
    set((state) => ({ emailInfo: { ...state.emailInfo, germanText } })),
  setEnglishText: (englishText) =>
    set((state) => ({ emailInfo: { ...state.emailInfo, englishText } })),

  addTable: () =>
    set((state) =>
      state.tables.length === 0
        ? { tables: [[{ key: "", value: "" }]] }
        : state
    ),

  addRow: (tableIndex) =>
    set((state) => {
      const newTables = [...state.tables];
      if (newTables[tableIndex]) {
        newTables[tableIndex].push({ key: "", value: "" });
      }
      return { tables: newTables };
    }),

  updateTable: (tableIndex, rowIndex, key, value) =>
    set((state) => {
      const newTables = [...state.tables];
      if (newTables[tableIndex] && newTables[tableIndex][rowIndex]) {
        newTables[tableIndex][rowIndex] = { key, value };
      }
      return { tables: newTables };
    }),

  removeTable: (tableIndex) =>
    set(() => ({
      tables: [],
    })),

  removeRow: (tableIndex, rowIndex) =>
    set((state) => {
      const newTables = [...state.tables];
      if (newTables[tableIndex]) {
        newTables[tableIndex] = newTables[tableIndex].filter((_, i) => i !== rowIndex);
      }
      return { tables: newTables };
    }),
}));
