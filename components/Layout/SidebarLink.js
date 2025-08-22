// components/SidebarLink.jsx
'use client'; // <-- Marca este componente como Client Component
import Link from "next/link";

export default function SidebarLink({ children, text, isActive, href }) {
  const activeClasses = isActive 
    ? "bg-gray-700 text-gray-100" 
    : "text-gray-400 hover:bg-gray-700 hover:text-gray-100";

  return (
    <Link href={href} className={`flex items-center space-x-3 p-2 rounded-md transition-colors duration-200 ${activeClasses}`}>
      <span className="">
        {/* Renderiza los children aquí */}
        {children}
      </span>
      <span className="text-sm font-medium">{text}</span>
    </Link>
  );
}