// components/Sidebar.jsx

import SidebarLink from './SidebarLink';
import SidebarSection from './SidebarSection';
// Importa los iconos de Lucide que necesitas
import { CircleUser , Gauge , Clipboard, PiggyBank, Info, Map, ServerCog, LayoutDashboard , Users, Router,   } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white flex-shrink-0 min-h-screen p-4">
      <div className="flex items-center space-x-2 mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <h2 className="text-xl font-semibold text-black">CRM </h2>
      </div>

      <nav className="space-y-4">
        <SidebarSection>
         
          <SidebarLink text="Dashboard" isActive={true} href="/">
              <LayoutDashboard className="h-5 w-5" />
            </SidebarLink>
          <SidebarLink text="Clientes" href="/clientes">
            <CircleUser className="h-5 w-5" />
          </SidebarLink>
          <SidebarLink text="Soporte Técnico" href="/soporte">
            <Gauge  className="h-5 w-5" />
          </SidebarLink>
          {/* <SidebarLink text="User Administration" href="/cliente">
            <Users  className="h-5 w-5" />
          </SidebarLink>        
          <SidebarLink text="Finances" href="/cliente" >
            <PiggyBank className="h-5 w-5" />
          </SidebarLink>
          <SidebarLink text="Zona" href="/cliente">
            <Map   className="h-5 w-5" /> 
          </SidebarLink>
           
          <SidebarLink text="Sector/Node/NAP" href="/sector">
           <Router  className="h-5 w-5" /> 
          </SidebarLink> */}
  
        </SidebarSection>
      </nav>
    </aside>
  );
}