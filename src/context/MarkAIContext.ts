import { createContext } from "react";

// Define a minimal Property interface for the card display
export interface PropertyCardData {
  propertyId: string;
  name: string;
  price: number;
  address: string;
  bedrooms?: number;
  bathrooms?: number;
  floorArea?: number;
  propertyType: string;
  image?: { url: string };
}

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  properties?: PropertyCardData[]; // <--- ADD THIS
}

export interface MarkAIContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addMessage: (
    text: string,
    sender: "user" | "bot",
    properties?: PropertyCardData[]
  ) => void; // <--- UPDATE THIS
}

export const MarkAIContext = createContext<MarkAIContextType | undefined>(
  undefined
);
