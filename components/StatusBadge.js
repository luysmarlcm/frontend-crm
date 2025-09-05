import React from "react"

const statusStyles = {
  Activo: "bg-green-100 text-green-700",
  Suspendido: "bg-orange-100 text-orange-700",
  Cancelado: "bg-red-100 text-red-700",
  Gratis: "bg-blue-100 text-blue-700",
  Default: "bg-gray-100 text-gray-700",
}

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        statusStyles[status] || statusStyles.Default
      }`}
    >
      {status || "—"}
    </span>
  )
}

export default StatusBadge
