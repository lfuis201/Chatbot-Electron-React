import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatbotPage from "../features/chatbot/pages/chatbot";
import GalleryPage from "../features/chatbotGallery/pages/chatbotGallery";
import { JSX } from "react";
import MainLayout from "@renderer/shared/layouts/MainLayout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // El layout envuelve a las páginas
    children: [
      { path: "/", element: <ChatbotPage /> },
      { path: "/gallery", element: <GalleryPage /> },
    ],
  },
]);

export default function AppRouter(): JSX.Element {
  return <RouterProvider router={router} />;
}
