/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import { Link } from "react-router-dom";

export const DragonBallLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <circle cx="16" cy="16" r="14" fill="orange" stroke="red" strokeWidth="2" />
      <polygon points="16,8 18,14 24,14 19,18 21,24 16,20 11,24 13,18 8,14 14,14" fill="red" />
    </svg>
  );
};

export default function AppNavbar() {
  return (
    <Navbar isBordered className="bg-white">
      {/* Logo + Nombre */}
      <NavbarBrand>
        <DragonBallLogo />
        <p className="ml-2 font-bold text-inherit">Dragon Ball Cards</p>
      </NavbarBrand>

      {/* Links de navegación */}
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Link to="/" className="hover:text-yellow-400">
            Chatbot
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/gallery" className="hover:text-yellow-400">
            Galería
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Acciones a la derecha */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} to="/" color="primary" variant="flat">
            Crear Carta
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
