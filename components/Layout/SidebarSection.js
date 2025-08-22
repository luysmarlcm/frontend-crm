// components/SidebarSection.jsx

export default function SidebarSection({ title, children }) {
  return (
    <div>
      {title && (
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}