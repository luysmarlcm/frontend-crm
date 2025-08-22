// app/cliente/page.js

import ClientDashboard from "@/components/Clientes/ClientDashboard";

const ClientePage = () => {
  // Asegúrate de que el componente devuelva JSX
  return (
    <div>
      <h1>Página de Clientes</h1>
      <ClientDashboard />
    </div>
  );
};

// Paso 3: Exporta el componente por defecto
export default ClientePage;