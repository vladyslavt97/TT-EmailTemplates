import { create } from "zustand";

interface ArgumentsObject {
  [key: string]: string;
}

interface EmailInfo {
  germanText: string;
  englishText: string;
  germanAddressee: string;
  englishAddressee: string;
}

type TableRow = { key: string; value: string };
type Table = TableRow[];

export const useStore = create<{
  emailInfo: EmailInfo;
  argumentsObject: ArgumentsObject;
  templateName: string;
  description: string;
  subject: string;
  germanTables: Table[]; // Separate German tables
  englishTables: Table[]; // Separate English tables
  setEmailInfo: (emailInfo: EmailInfo) => void;
  setArgumentsObject: (argumentsObject: ArgumentsObject) => void;
  setTemplateName: (templateName: string) => void;
  setDescription: (description: string) => void;
  setSubject: (subject: string) => void;
  setGermanText: (germanText: string) => void;
  setEnglishText: (englishText: string) => void;
  setGermanAddressee: (germanAddressee: string) => void;
  setEnglishAddressee: (englishAddressee: string) => void;
  addGermanTable: () => void;
  addEnglishTable: () => void;
  addRowToGermanTable: (tableIndex: number) => void;
  addRowToEnglishTable: (tableIndex: number) => void;
  updateGermanTable: (tableIndex: number, rowIndex: number, key: string, value: string) => void;
  updateEnglishTable: (tableIndex: number, rowIndex: number, key: string, value: string) => void;
  removeGermanTable: (tableIndex: number) => void;
  removeEnglishTable: (tableIndex: number) => void;
  removeRowFromGermanTable: (tableIndex: number, rowIndex: number) => void;
  removeRowFromEnglishTable: (tableIndex: number, rowIndex: number) => void;
}>((set) => ({
  emailInfo: {
    germanText: "",
    englishText: "",
    germanAddressee: "",
    englishAddressee: "",
  },
  argumentsObject: {
    identityInfo: "map",
    isSecondNotification: "boolean",
    isManagerEmail: "boolean",
  },
  templateName: "",
  description: "",
  subject: "",
  germanTables: [], // Initialize separate German tables
  englishTables: [], // Initialize separate English tables

  setEmailInfo: (emailInfo) => set({ emailInfo }),
  setArgumentsObject: (argumentsObject) => set({ argumentsObject }),
  setTemplateName: (templateName) => set({ templateName }),
  setDescription: (description) => set({ description }),
  setSubject: (subject) => set({ subject }),
  setGermanText: (germanText) =>
    set((state) => ({ emailInfo: { ...state.emailInfo, germanText } })),
  setEnglishText: (englishText) =>
    set((state) => ({ emailInfo: { ...state.emailInfo, englishText } })),

  // Add a new German table
  addGermanTable: () =>
    set((state) =>
      state.germanTables.length === 0
        ? { germanTables: [[{ key: "", value: "" }]] }
        : { germanTables: [...state.germanTables, [{ key: "", value: "" }]] }
    ),
  setGermanAddressee: (germanAddressee) =>
    set((state) => ({
        emailInfo: { ...state.emailInfo, germanAddressee },
    })),
  setEnglishAddressee: (englishAddressee) =>
    set((state) => ({
        emailInfo: { ...state.emailInfo, englishAddressee },
    })),

  // Add a new English table
  addEnglishTable: () =>
    set((state) =>
      state.englishTables.length === 0
        ? { englishTables: [[{ key: "", value: "" }]] }
        : { englishTables: [...state.englishTables, [{ key: "", value: "" }]] }
    ),

  // Add a row to a specific German table
  addRowToGermanTable: (tableIndex) =>
    set((state) => {
      const newGermanTables = [...state.germanTables];
      if (newGermanTables[tableIndex]) {
        newGermanTables[tableIndex].push({ key: "", value: "" });
      }
      return { germanTables: newGermanTables };
    }),

  // Add a row to a specific English table
  addRowToEnglishTable: (tableIndex) =>
    set((state) => {
      const newEnglishTables = [...state.englishTables];
      if (newEnglishTables[tableIndex]) {
        newEnglishTables[tableIndex].push({ key: "", value: "" });
      }
      return { englishTables: newEnglishTables };
    }),

  // Update a specific row in the German table
  updateGermanTable: (tableIndex, rowIndex, key, value) =>
    set((state) => {
      const newGermanTables = [...state.germanTables];
      if (newGermanTables[tableIndex] && newGermanTables[tableIndex][rowIndex]) {
        newGermanTables[tableIndex][rowIndex] = { key, value };
      }
      return { germanTables: newGermanTables };
    }),

  // Update a specific row in the English table
  updateEnglishTable: (tableIndex, rowIndex, key, value) =>
    set((state) => {
      const newEnglishTables = [...state.englishTables];
      if (newEnglishTables[tableIndex] && newEnglishTables[tableIndex][rowIndex]) {
        newEnglishTables[tableIndex][rowIndex] = { key, value };
      }
      return { englishTables: newEnglishTables };
    }),

  // Remove a specific German table
  removeGermanTable: (tableIndex) =>
    set((state) => ({
      germanTables: state.germanTables.filter((_, i) => i !== tableIndex),
    })),

  // Remove a specific English table
  removeEnglishTable: (tableIndex) =>
    set((state) => ({
      englishTables: state.englishTables.filter((_, i) => i !== tableIndex),
    })),

  // Remove a row from a specific German table
  removeRowFromGermanTable: (tableIndex, rowIndex) =>
    set((state) => {
      const newGermanTables = [...state.germanTables];
      if (newGermanTables[tableIndex]) {
        newGermanTables[tableIndex] = newGermanTables[tableIndex].filter(
          (_, i) => i !== rowIndex
        );
      }
      return { germanTables: newGermanTables };
    }),

  // Remove a row from a specific English table
  removeRowFromEnglishTable: (tableIndex, rowIndex) =>
    set((state) => {
      const newEnglishTables = [...state.englishTables];
      if (newEnglishTables[tableIndex]) {
        newEnglishTables[tableIndex] = newEnglishTables[tableIndex].filter(
          (_, i) => i !== rowIndex
        );
      }
      return { englishTables: newEnglishTables };
    }),
}));
