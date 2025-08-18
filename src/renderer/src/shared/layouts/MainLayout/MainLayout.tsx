/* eslint-disable @typescript-eslint/explicit-function-return-type */
import AppNavbar from "@renderer/shared/components/AppNavbar/AppNavbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
