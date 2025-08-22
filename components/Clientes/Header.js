import { CircleUser ,  } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5 text-gray-600 cursor-pointer">
          BRMNORTE1
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <button className="bg-green-500 text-white px-4 py-1.5 rounded-3xl font-medium flex items-center shadow-sm hover:bg-green-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar Cliente
        </button>
      </div>
      <p className="text-sm text-gray-500">Manage, filter, and act on clients</p>
    </div>
  );
}