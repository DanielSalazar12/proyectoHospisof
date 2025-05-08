import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";

function ListaMedicamentos({ medicamentos, onEliminar, onActualizar }) {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {medicamentos.map((med) => (
        <div
          key={med.codigo}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
        >
          <div className="flex flex-col w-full space-y-2">
            <h4 className="text-lg font-semibold" value={med.nombre}>
              {med.nombre}
            </h4>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Dosis"
                value={med.dosis}
                onChange={(e) => onActualizar(med._id, "dosis", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Frecuencia"
                value={med.frecuencia}
                onChange={(e) =>
                  onActualizar(med._id, "frecuencia", e.target.value)
                }
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Duracion"
                value={med.duracion}
                onChange={(e) =>
                  onActualizar(med._id, "duracion", e.target.value)
                }
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>
          </div>

          <button
            onClick={() => onEliminar(med._id)}
            className="text-red-500 hover:text-red-700 ml-2"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ListaMedicamentos;
