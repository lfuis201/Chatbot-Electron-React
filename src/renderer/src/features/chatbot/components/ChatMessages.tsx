import { ScrollShadow } from "@heroui/react";
import ReactMarkdown from "react-markdown";

interface ChatMessagesProps {
  messages: { sender: "user" | "bot"; text?: string; image?: string }[];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <ScrollShadow className="flex-1 p-4 space-y-3 overflow-y-auto">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`prose max-w-[75%] p-3 rounded-2xl text-sm prose-p:my-1 prose-pre:my-1 prose-pre:p-2 prose-pre:bg-gray-800 prose-pre:text-white ${
            msg.sender === "user"
              ? "ml-auto bg-blue-500 text-white rounded-br-none prose-headings:text-white prose-strong:text-white prose-a:text-white"
              : "mr-auto bg-gray-200 text-gray-800 rounded-bl-none"
          }`}
        >
          {/* Mostrar texto si existe */}
          {msg.text && <ReactMarkdown>{msg.text}</ReactMarkdown>}

          {/* Mostrar imagen si existe */}
          {msg.image && (
            <img
              src={msg.image}
              alt="Carta generada"
              className="mt-2 rounded-xl shadow-lg border border-gray-300"
            />
          )}
        </div>
      ))}
    </ScrollShadow>
  );
}
