// components/IdentificationForm.jsx

import FormGroup from './FormGroup';

export default function IdentificationForm() {
  return (
    <div className="border border-gray-200 rounded-md p-6">
      <div className="flex items-center space-x-2 text-gray-600 font-semibold mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <span>IDENTIFICACIÓN</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FormGroup 
          label="Nombre" 
          placeholder="Nombre y Apellido, Razón Social, etc." 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>} 
        />
        <FormGroup 
          label="Ciudad" 
          placeholder="Seleccionar o escribir ciudad" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>}
          isSelect={true}
        />
        <FormGroup 
          label="Domicilio" 
          placeholder="Calle, número, piso..." 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>} 
        />
        <FormGroup 
          label="Teléfono" 
          placeholder="Ej: +54 9 11 5555-5555" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.011 11.011 0 006.103 6.103l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>}
        />
        <FormGroup 
          label="Email" 
          placeholder="nombre@empresa.com" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>}
        />
        <FormGroup 
          label="Fecha de alta" 
          placeholder="YYYY-MM-DD" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>}
          isReadOnly={true}
          value="Hoy"
        />
        <FormGroup 
          label="Cliente Activo"
          checkbox={true}
          checked={true}
          subtext="Marcado el 2025-08-19 14:22"
        />
        <FormGroup 
          label="Conector"
          placeholder="READONLY-XYZ-123"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.3-.85-3.04.3-2.352 1.635.385.727.091 1.631-.72 2.054a1.532 1.532 0 010 2.98c.81.423 1.105 1.327.72 2.054-.688 1.335 1.033 2.5 2.352 1.635a1.532 1.532 0 012.286.947c.379 1.56 2.6 1.56 2.981 0 .385-1.56 2.6-1.56 2.981 0a1.532 1.532 0 012.286-.947c1.3-.865 3.04.3 2.352 1.635-.385.727-.09 1.631.72 2.054a1.532 1.532 0 010 2.98c-.81.423-1.105 1.327-.72 2.054.688 1.335-1.032 2.5-2.352 1.635a1.532 1.532 0 01-2.286.947c-.379 1.56-2.6 1.56-2.981 0a1.532 1.532 0 01-2.286-.947c-1.3.865-3.04-.3-2.352-1.635-.385-.727-.09-1.631-.72-2.054a1.532 1.532 0 010-2.98c.81-.423 1.105-1.327.72-2.054-.688-1.335 1.032-2.5 2.352-1.635a1.532 1.532 0 012.286-.947zM10 11a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>}
          isReadOnly={true}
          subtext="Solo lectura"
        />
      </div>
    </div>
  );
}