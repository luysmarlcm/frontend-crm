// components/ClientTabs.jsx

export default function ClientTabs() {
  return (
    <div className="flex space-x-2 border-b border-gray-200">
      <button className="flex items-center space-x-2 py-2 px-4 border-b-2 border-green-500 text-green-500 font-medium -mb-px">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        <span>General</span>
      </button>
      <button className="flex items-center space-x-2 py-2 px-4 text-gray-500 font-medium hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <span>Geolocalización</span>
      </button>
      <button className="flex items-center space-x-2 py-2 px-4 text-gray-500 font-medium hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 4a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H5z" />
        </svg>
        <span>Conexiones Asociadas</span>
        <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full ml-1">3</span>
      </button>
    </div>
  );
}