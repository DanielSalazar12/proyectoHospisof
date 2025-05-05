import {
    Card, CardHeader, CardBody, Typography, Avatar,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";


export default function UsersTable({ users, roles, handleDelete }) {
    return (
        <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                <Typography variant="h6" color="white">Tabla de Usuarios</Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        <tr>
                            {["Nombre usuario", "Rol", "Status", "Acciones"].map((el) => (
                                <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">{el}</Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-4">
                                    <Typography variant="small" color="blue-gray">Cargando Usarios...</Typography>
                                </td>
                            </tr>
                        ) : (
                            users.map((user, key) => {
                                const className = `py-3 px-5 ${key === users.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                                return (
                                    <tr key={user._id}>
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <Avatar
                                                    src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg"
                                                    alt={user.nombreUsuario}
                                                    size="sm"
                                                    variant="rounded"
                                                />
                                                <div>
                                                    <Typography variant="small" color="blue-gray" className="font-semibold">{user.nombreUsuario}</Typography>
                                                    <Typography className="text-xs font-normal text-blue-gray-500">
                                                        <a className="text-blue-500 underline">
                                                            {user?.emailUser || 'Sin correo'}
                                                        </a>
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {roles.find(r => r._id === user.rol)?.nombreRol || 'Sin rol'}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${user.status === 1 ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                                                {user.status === 1 ? "Activo" : "Inactivo"}
                                            </span>
                                        </td>

                                        <td className={className}>
                                            <div className="flex gap-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95, rotate: -5 }}
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => handleEditClick(user._id)} // Llama a handleEditClick para cargar los datos
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95, rotate: -5 }}
                                                    onClick={() => handleDelete(user._id)}
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
