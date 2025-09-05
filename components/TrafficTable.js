import React from "react"

const TrafficTable = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-700 font-medium">Día</th>
            <th className="px-4 py-2 text-left text-gray-700 font-medium">Subida</th>
            <th className="px-4 py-2 text-left text-gray-700 font-medium">Bajada</th>
          </tr>
        </thead>
        <tbody>
          {data.map(([dia, subida, bajada], index) => (
            <tr
              key={index}
              className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className="px-4 py-2 text-black">{dia}</td>
              <td className="px-4 py-2 text-green-500 font-semibold">{subida}</td>
              <td className="px-4 py-2 text-red-500 font-semibold">{bajada}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TrafficTable

