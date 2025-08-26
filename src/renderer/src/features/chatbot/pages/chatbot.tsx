/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { Card, CardBody } from "@heroui/react";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import axios from "axios";

type Message = {
  sender: "user" | "bot";
  text?: string;
  image?: string;
};

// pasos de conversación
type Step = "askRarity" | "askRace" | "generateCard";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "¡Hola! Soy tu asistente virtual 🤖. ¿Qué rareza de carta quieres crear? (Común, Rara, Super Rara)",
    },
  ]);
  const [step, setStep] = useState<Step>("askRarity");
  const [rarity, setRarity] = useState("");
  const [race, setRace] = useState("");

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // agregamos mensaje del usuario
    setMessages((prev) => [...prev, { sender: "user", text: message }]);

    if (step === "askRarity") {
      setRarity(message);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Perfecto 👍, elegiste la rareza: ${message}. Ahora dime, ¿qué raza es el personaje? (Saiyajin, Humano, Namekiano)`,
        },
      ]);
      setStep("askRace");
      return;
    }

    if (step === "askRace") {
      setRace(message);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Genial 🙌, la raza elegida es: ${message}. Dame un segundo para crear tu carta...`,
        },
      ]);
      setStep("generateCard");

      try {
        // --- 1. pedir carta al backend ---
        const res = await axios.post("http://localhost:3001/api/chat", {
          rarity,
          race: message,
        });

        const reply = res.data.reply; // JSON con los datos del personaje

        // --- 2. mostrar JSON como texto ---
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Aquí tienes tu carta en JSON:" },
          { sender: "bot", text: JSON.stringify(reply, null, 2) }, // 👈 JSON bonito
        ]);

        // --- 3. pedir imagen al backend ---
        const imgRes = await axios.post(
          "http://localhost:3001/api/generate-image",
          {
            character: reply, // 👈 mandamos todo el JSON del personaje
          }
        );

        const image = imgRes.data.image;

        // --- 4. mostrar la imagen en el chat ---
        setMessages((prev) => [...prev, { sender: "bot", image }]);
      } catch (error) {
        console.error("Error al generar carta:", error);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Error al conectar con el servidor 😞" },
        ]);
      }
      return;
    }

    if (step === "generateCard") {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Ya generé tu carta 🎴. Si quieres otra, reinicia la conversación.",
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg h-[600px] flex flex-col">
        <CardBody className="flex flex-col flex-1 p-0">
          <ChatMessages messages={messages} />
          <ChatInput onSend={handleSendMessage} />
        </CardBody>
      </Card>
    </div>
  );
}
