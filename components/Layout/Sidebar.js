'use client';
import { ChevronLeft, ChevronRight, Gauge, Menu  } from 'lucide-react';
import SidebarLink from './SidebarLink';
import SidebarSection from './SidebarSection';
import Image from 'next/image';

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-lg 
      flex flex-col justify-between transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Header con logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
       

        {/* Botón colapsar */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          {collapsed ? <ChevronLeft  className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
         <div className="flex items-center space-x-2">
          <Image
            src="/image/logo.png"   
           width={180} 
            height={60} 
            priority
            alt="Logo CRM"
          />
          {/* {!collapsed && <h2 className="text-lg font-semibold text-black">CRM</h2>} */}
        </div>
      </div>

      {/* Links */}
      <nav className="flex-1 overflow-y-auto p-4">
        <SidebarSection>
          <SidebarLink text={!collapsed ? "Soporte Técnico" : ""} href="/soporte">
            <Gauge className="h-5 w-5" />
          </SidebarLink>
        </SidebarSection>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {!collapsed && <p className="text-xs text-gray-500">© 2025 Conet</p>}
      </div>
    </aside>
  );
}
