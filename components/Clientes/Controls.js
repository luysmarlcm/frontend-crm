// components/Controls.jsx

export default function Controls() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-2">
        <div className="flex items-center border border-gray-300 rounded-md">
          <select className="bg-white text-gray-600 px-3 py-1.5 rounded-l-md outline-none appearance-none">
            <option>Action:</option>
          </select>
          <button className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-r-md border-l border-gray-300 hover:bg-gray-300 transition-colors">
            Execute
          </button>
        </div>

        <div className="flex space-x-2 text-gray-500">
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2" />
            </svg>
          </button>
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search: Type a name, IP, plan..." 
          className="border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm text-gray-700 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}