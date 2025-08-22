// components/CommentSection.jsx

export default function CommentSection() {
  return (
    <div className="bg-orange-100 border border-orange-400 p-4 rounded-md mb-6">
      <div className="flex justify-between items-center text-orange-800 font-semibold mb-2">
        <span>COMENTARIO</span>
        <span className="text-sm font-normal">Última actualización: Hoy</span>
      </div>
      <div className="relative">
        <textarea 
          placeholder="Agregar comentario del cliente..." 
          rows="3" 
          className="w-full p-2 border-2 border-orange-200 rounded-md bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-500 resize-none"
        ></textarea>
        <button className="absolute bottom-4 right-4 text-gray-400 text-xs font-medium flex items-center hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9V6a1 1 0 112 0v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3z" clipRule="evenodd" />
          </svg>
          Generate next screen
        </button>
      </div>
    </div>
  );
}