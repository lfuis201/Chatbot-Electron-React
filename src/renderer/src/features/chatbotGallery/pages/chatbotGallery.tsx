import { JSX } from "react";

export default function chatbotGallery(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-900 text-white">
      <h1 className="text-3xl font-bold mb-4">🖼️ Galería de Cartas</h1>
      <p className="mb-4">Aquí podrás ver las cartas creadas.</p>
    </div>
  );
}
