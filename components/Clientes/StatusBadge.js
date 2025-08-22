// components/StatusBadge.jsx

export default function StatusBadge({ status }) {

  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white";  
  const colorClasses = status === 'Activo' ? 'bg-green-500' : 'bg-red-500';
  const badgeClasses = `${baseClasses} ${colorClasses}`;

  return (
    <span className={badgeClasses}>
      {status}
    </span>
  );
}