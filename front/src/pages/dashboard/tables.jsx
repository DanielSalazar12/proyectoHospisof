import {
  Card,
  Option,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  Select,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import Swal from 'sweetalert2';

import {
  fetchUsers,
  fetchRoles,
  createUser,
  deleteUser,
} from "@/hooks/useUsersData";
import { useEffect, useState } from "react";

export function Tables() {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);// Esto es de la modal (false cerrada, true abierta)

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    especialidad: "",
    rol: "",
    userName: "",
    passwordUser: "",
  });

  const cargarDatos = async () => {
    const usuariosData = await fetchUsers();
    const rolesData = await fetchRoles();
    setUsuarios(usuariosData);
    setRoles(rolesData);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const abrirModalUsuarios = () => setOpen(!open);

  // Cada que hay un campo cambaido, el lo identifica

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createUser(formData);
      Swal.fire({
        icon: "success",
        title: "Usuario registrado",
        text: "El usuario fue creado exitosamente.",
        confirmButtonColor: "#3085d6",
      });
      abrirModalUsuarios();
      // Blanqueo el formulario
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        especialidad: "",
        rol: "",
        userName: "",
        passwordUser: "",
      });
      await cargarDatos(); //Para volver a cargar todos los datos
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un erro al insertar!",

      });
    }
  };

  const handleDelete = async (id) => {

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto eliminará el usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "swal2-confirm-button",
        cancelButton: "swal2-cancel-button",
      },
    });


    if (result.isConfirmed) {
      try {
        await deleteUser(id);
        await cargarDatos(); // Para volver a cargar los datos 
        Swal.fire({
          icon: "success",
          title: "Usuario eliminado",
          text: "El usuario fue eliminado correctamente.",
        });
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el usuario.",
        });
      }
    }
  };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="flex justify-end px-6">
        <Button color="blue" onClick={abrirModalUsuarios}>
          Registrar Usuario
        </Button>
      </div>

      <Dialog open={open} handler={abrirModalUsuarios}>
        <DialogHeader>Registrar nuevo usuario</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Input label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
          <Input label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
          <Input label="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} />
          <Input label="Especialidad" name="especialidad" value={formData.especialidad} onChange={handleChange} />
          <Select
            label="Rol"
            name="rol"
            value={formData.rol}
            onChange={(val) => setFormData({ ...formData, rol: val })}
          >
            {roles.map((rol) => (
              <Option key={rol._id} value={rol._id}>
                {rol.nombreRol}
              </Option>
            ))}
          </Select>
          <Input label="Nombre de usuario" name="userName" value={formData.userName} onChange={handleChange} />
          <Input label="Contraseña" name="passwordUser" type="password" value={formData.passwordUser} onChange={handleChange} />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={abrirModalUsuarios} className="mr-2">
            Cancelar
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            Guardar
          </Button>
        </DialogFooter>
      </Dialog>

      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Tabla de usuarios
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nombre", "Función", "Status", "Contacto", ""].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    <Typography variant="small" color="blue-gray">
                      Cargando usuarios...
                    </Typography>
                  </td>
                </tr>
              ) : (
                usuarios.map((usuario, key) => {
                  const className = `py-3 px-5 ${key === usuarios.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                  return (
                    <tr key={usuario._id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar
                            src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg"
                            alt={`${usuario.nombre} ${usuario.apellido}`}
                            size="sm"
                            variant="rounded"
                          />
                          <div>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                              {usuario.nombre} {usuario.apellido}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {usuario.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {usuario.especialidad}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          Melo
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {usuario.telefono}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95, rotate: -5 }}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95, rotate: -5 }}
                            onClick={() => handleDelete(usuario._id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
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
    </div>
  );
}

export default Tables;
