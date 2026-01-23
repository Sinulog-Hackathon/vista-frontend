import { createContext, useState, type ReactNode } from "react";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface MarkAIContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addMessage: (text: string, sender: "user" | "bot") => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const MarkAIContext = createContext<MarkAIContextType | undefined>(
  undefined
);

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hi! I'm Mark AI. How can I help you find your perfect property today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

export function MarkAIProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isOpen, setIsOpen] = useState(false);

  const addMessage = (text: string, sender: "user" | "bot") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <MarkAIContext.Provider
      value={{ messages, setMessages, isOpen, setIsOpen, addMessage }}
    >
      {children}
    </MarkAIContext.Provider>
  );
}
