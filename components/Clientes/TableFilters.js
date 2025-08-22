// components/TableFilters.jsx

export default function TableFilters() {
  const commonInputClasses = "w-full border-b border-gray-300 p-2 text-sm text-gray-700 focus:outline-none";

  return (
    <thead className="bg-white">
      <tr>
        <td className="px-6 py-3"></td>
        <td className="px-6 py-3"><input type="text" placeholder="Filter" className={commonInputClasses} /></td>
        <td className="px-6 py-3"><input type="text" placeholder="Filter" className={commonInputClasses} /></td>
        <td className="px-6 py-3"><input type="text" placeholder="Filter" className={commonInputClasses} /></td>
        <td className="px-6 py-3"><input type="text" placeholder="Filter" className={commonInputClasses} /></td>
        <td className="px-6 py-3">
          <select className="w-full border-b border-gray-300 p-2 text-sm text-gray-700 focus:outline-none">
            <option>Any</option>
          </select>
        </td>
        <td className="px-6 py-3"><input type="text" placeholder="Filter" className={commonInputClasses} /></td>
        <td className="px-6 py-3"><input type="text" placeholder="Filter" className={commonInputClasses} /></td>
        <td className="px-6 py-3"><input type="text" placeholder="Filter" className={commonInputClasses} /></td>
        <td className="px-6 py-3"></td>
      </tr>
    </thead>
  );
}