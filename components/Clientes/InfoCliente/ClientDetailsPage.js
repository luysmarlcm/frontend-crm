// components/ClientDetailsPage.jsx

import ClientTabs from './ClientTabs';
import CommentSection from './CommentSection';
import IdentificationForm from './IdentificationForm';
import FooterButtons from './FooterButtons';

export default function ClientDetailsPage() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Client Details</h1>
          {/* El número de cliente podría ser dinámico */}
          <span className="text-gray-500">Número de cliente</span>
        </div>
        
        <ClientTabs />
        
        <div className="mt-6">
          <IdentificationForm />
          <CommentSection />

        </div>

        <FooterButtons />
      </div>
    </div>
  );
}