import { create } from 'zustand';

interface ArgumentsObject {
  [key: string]: string;
}

interface EmailInfo {
  toptext: string;
}

interface EmailArgs {
  emailInfo: EmailInfo;
  argumentsObject: ArgumentsObject;
  templateName: string;
}

export const useStore = create<{
  emailInfo: EmailInfo;
  argumentsObject: ArgumentsObject;
  templateName: string;
  setEmailInfo: (emailInfo: EmailInfo) => void;
  setArgumentsObject: (argumentsObject: ArgumentsObject) => void;
  setTemplateName: (templateName: string) => void;
}>((set) => ({
  emailInfo: { toptext: "Default top text goes here..." },
  argumentsObject: {
    identityInfo: "map",
    isSecondNotification: "boolean",
    isManagerEmail: "boolean",
  },
  templateName: "InternalLeaverNotification",
  
  setEmailInfo: (emailInfo) => set({ emailInfo }),
  setArgumentsObject: (argumentsObject) => set({ argumentsObject }),
  setTemplateName: (templateName) => set({ templateName }),
}));
