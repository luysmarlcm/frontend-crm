// components/FormGroup.jsx

export default function FormGroup({ label, placeholder, icon, isSelect, isReadOnly, value, checkbox, checked, subtext }) {
  const inputClasses = "w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-x-2 text-gray-600 font-medium">
        {icon}
        <span>{label}</span>
      </div>
      
      {checkbox ? (
        <div className="flex items-center space-x-2 mt-1">
          <input 
            type="checkbox" 
            checked={checked} 
            readOnly={isReadOnly}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
          />
          <span className="text-sm text-gray-700">{checked ? 'Activo' : 'Inactivo'}</span>
          {subtext && <span className="text-xs text-gray-500 ml-2">{subtext}</span>}
        </div>
      ) : (
        isSelect ? (
          <select className={inputClasses}>
            <option disabled selected>{placeholder}</option>
            {/* Opciones dinámicas aquí */}
          </select>
        ) : (
          <input 
            type="text"
            placeholder={placeholder}
            className={`${inputClasses} ${isReadOnly ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            readOnly={isReadOnly}
            defaultValue={value}
          />
        )
      )}
    </div>
  );
}