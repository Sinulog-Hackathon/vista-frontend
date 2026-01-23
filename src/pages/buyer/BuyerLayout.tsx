import { Outlet } from "react-router-dom";
import { MarkAI } from "../../components/chatbot/MarkAI";
import { MarkAIProvider } from "../../context/MarkAIContext";

export function BuyerLayout() {
  return (
    <MarkAIProvider>
      <Outlet />
      <MarkAI />
    </MarkAIProvider>
  );
}
