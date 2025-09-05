"use client";
import { useState } from "react";
import { Menu } from "lucide-react"; // icono hamburguesa
import Sidebar from "./Sidebar";
import Image from "next/image";

export default function NavbarLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between shadow-sm">
          {/* Lado izquierdo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>

            {/* Search input */}
            <div className="relative w-72">
              <input
                type="text"
                placeholder="Search help articles, tickets"
                className="w-full border rounded-md pl-3 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Lado derecho */}
          <div className="flex items-center gap-6">
            {/* Fecha */}
            {/* <span className="text-sm text-gray-500">Tue, Aug 19</span> */}

            {/* Notificación */}
            {/* <button className="relative p-2 rounded-full hover:bg-gray-100">
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-9.33-4.955"
                />
              </svg>
            </button> */}

            {/* Perfil */}
          /
          </div>
        </header>

        {/* Contenido */}
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
