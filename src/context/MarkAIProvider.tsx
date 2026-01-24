import { useState, useEffect, type ReactNode } from "react";
import {
  MarkAIContext,
  type Message,
  type PropertyCardData,
} from "./MarkAIContext";

// Type Guard
function isMessageArray(data: unknown): data is Message[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        "id" in item &&
        "text" in item &&
        "sender" in item &&
        (item.sender === "user" || item.sender === "bot")
    )
  );
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hi! I'm Mark AI. How can I help you find your perfect property today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

export function MarkAIProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("vista_chat_history");
    if (!saved) return initialMessages;

    try {
      const parsed: unknown = JSON.parse(saved);
      if (isMessageArray(parsed)) {
        return parsed.map((m) => ({
          ...m,
          timestamp: new Date(m.timestamp),
          properties: m.properties || undefined, // Explicitly restore properties
        }));
      }
    } catch (e) {
      console.error("Failed to parse chat history", e);
    }
    return initialMessages;
  });

  const [isOpen, setIsOpen] = useState(false);

  // Persistence logic
  useEffect(() => {
    localStorage.setItem("vista_chat_history", JSON.stringify(messages));
  }, [messages]);

  const addMessage = (
    text: string,
    sender: "user" | "bot",
    properties?: PropertyCardData[]
  ) => {
    // DEBUG LOG: Check if properties are actually arriving here
    if (properties) {
      console.log("Saving Message with Properties:", properties);
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      properties: properties, // <--- Ensure this is assigned
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
