// components/common/Tabs.jsx
'use client';

import { useState } from 'react';

export default function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const activeContent = tabs.find(tab => tab.id === activeTab).content;

  return (
    <div>
      {/* Tab bar */}
      <div className="flex space-x-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              py-2 px-4 text-sm font-medium
              ${activeTab === tab.id
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
              }
              transition-colors duration-200
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-white">
        {activeContent}
      </div>
    </div>
  );
}