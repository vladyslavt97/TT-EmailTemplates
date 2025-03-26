import { create } from 'zustand';

interface ArgumentsObject {
  [key: string]: string;
}

interface EmailInfo {
  germanText: string;
  englishText: string;
}

export const useStore = create<{
  emailInfo: EmailInfo;
  argumentsObject: ArgumentsObject;
  templateName: string;
  description: string;
  setEmailInfo: (emailInfo: EmailInfo) => void;
  setArgumentsObject: (argumentsObject: ArgumentsObject) => void;
  setTemplateName: (templateName: string) => void;
  setDescription: (templateName: string) => void;
  setGermanText: (germanText: string) => void;
  setEnglishText: (englishText: string) => void;
}>((set) => ({
  emailInfo: {
    germanText: "Bei der unten genannten externen Identität...",
    englishText: "For the external identity below..."
  },
  argumentsObject: {
    identityInfo: "map",
    isSecondNotification: "boolean",
    isManagerEmail: "boolean",
  },
  templateName: "InternalLeaverNotification",
  description: "",
  
  setEmailInfo: (emailInfo) => set({ emailInfo }),
  setArgumentsObject: (argumentsObject) => set({ argumentsObject }),
  setTemplateName: (templateName) => set({ templateName }),
  setDescription: (description) => set({ description }),
  setGermanText: (germanText) => set((state) => ({ emailInfo: { ...state.emailInfo, germanText } })),
  setEnglishText: (englishText) => set((state) => ({ emailInfo: { ...state.emailInfo, englishText } })),
}));
