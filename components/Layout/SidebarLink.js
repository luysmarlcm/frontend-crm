'use client';
import Link from "next/link";

export default function SidebarLink({ children, text, isActive, href }) {
  const activeClasses = isActive 
    ? "bg-gray-700 text-gray-100" 
    : "text-gray-600 hover:bg-gray-200";

  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 p-2 rounded-md transition-colors duration-200 ${activeClasses}`}
    >
      {children}
      <span className="text-sm font-medium">{text}</span>
    </Link>
  );
}
