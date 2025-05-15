import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { epsList } from "@/hooks/usePacientesData";


export default function PacientesTable({ pacientes, roles, handleDelete, handleEditClick }) {
    return (
        <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                <Typography variant="h6" color="white">Tabla de Pacientes</Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        <tr>
                            {["Nombre", "Función", "Status", "Contacto", "EPS", ""].map((el) => (
                                <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{el}</Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-4">
                                    <Typography variant="small" color="blue-gray">Cargando pacientes...</Typography>
                                </td>
                            </tr>
                        ) : (
                            pacientes.map((paciente, key) => {
                                const className = `py-3 px-5 ${key === pacientes.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                                return (
                                    <tr key={paciente._id}>
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <Avatar
                                                    src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg"
                                                    alt={paciente.nombrePaciente}
                                                    size="sm"
                                                    variant="rounded"
                                                />
                                                <div>
                                                    <Typography variant="small" color="blue-gray" className="font-semibold">{paciente.nombrePaciente}</Typography>
                                                    <Typography className="text-xs font-normal text-blue-gray-500">
                                                        <a href={`mailto:${paciente.idUsuario?.emailUser}`} className="text-blue-500 underline">
                                                            {paciente.idUsuario?.emailUser || 'Sin correo'}
                                                        </a>
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {roles.find(r => r._id === paciente.idUsuario?.rol)?.nombreRol || 'Sin rol'}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${paciente.status === 1 ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                                                {paciente.status === 1 ? "Activo" : "Inactivo"}
                                            </span>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-normal text-blue-gray-500">{paciente.telefonoPaciente}</Typography>
                                        </td>
                                        <td>
                                            <Typography className="text-xs font-normal text-blue-gray-500">
                                                {epsList.find(eps => eps.id === paciente.epsPaciente)?.nombre || "Sin EPS"}
                                            </Typography>

                                        </td>

                    <td className={className}>
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95, rotate: -5 }}
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleEditClick(paciente._id)}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95, rotate: -5 }}
                          onClick={() => handleDelete(paciente._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
