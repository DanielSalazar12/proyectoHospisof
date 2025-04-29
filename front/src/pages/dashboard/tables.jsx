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
  fetchPacientes,
  createUser,
  createPaciente,
  updatePaciente,
  epsList,
  fetchRoles,
} from "@/hooks/usePacientesData";

import { useEffect, useState } from "react";

export function Tables() {
  const [usuarios, setUsuarios] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);// Esto es de la modal (false cerrada, true abierta)


  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
    eps: "",
    userName: "",
    passwordUser: "",
    rol: "",
  });

  const cargarDatos = async () => {
    //const usuariosData = await fetchUsers();
    const pacientesData = await fetchPacientes();
    console.log(pacientesData);
    const rolesData = await fetchRoles();
    //setUsuarios(usuariosData);
    setPacientes(pacientesData);
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
    console.log(formData);

    if (!formData.nombre || !formData.documento || !formData.telefono || !formData.email || !formData.fechaNacimiento || !formData.eps || !formData.userName || !formData.passwordUser) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de continuar.",
      });
      return;
    }

    try {
      // Crear Usuario
      const nuevoUsuario = {
        nombreUsuario: formData.userName,
        passwordUser: formData.passwordUser,
        emailUser: formData.email,
        rol: formData.rol,
        status: 1,
      };

      console.log('Nuevo usuario:', nuevoUsuario);
      const usuarioCreado = await createUser(nuevoUsuario);


      console.log('Usuario creado:', usuarioCreado.usuario._id);



      if (!usuarioCreado || !usuarioCreado.usuario._id) {
        Swal.fire({
          icon: "error",
          title: "Error al crear usuario",
          text: "No se pudo obtener el ID del usuario creado.",
        });
        return;
      }

      // Crear Paciente
      const nuevoPaciente = {
        nombre: formData.nombre,
        fecha: formData.fechaNacimiento,
        documento: Number(formData.documento),
        telefono: Number(formData.telefono),
        eps: formData.eps,
        idUsuario: usuarioCreado.usuario._id,
      };

      console.log('Nuevo paciente:', nuevoPaciente);
      await createPaciente(nuevoPaciente);

      Swal.fire({
        icon: "success",
        title: "Paciente registrado",
        text: "El paciente fue creado exitosamente.",
        confirmButtonColor: "#3085d6",
      });

      abrirModalUsuarios();
      setFormData({
        nombre: "",
        documento: "",
        email: "",
        telefono: "",
        fechaNacimiento: "",
        eps: "",
        userName: "",
        passwordUser: "",
        rol: "",
      });

      await cargarDatos();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error al insertar!",
      });
    }
  };



  const handleDelete = async (id) => {

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto eliminará el paciente.",
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
          title: "Paciente eliminado",
          text: "El paciente fue eliminado correctamente.",
        });
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el paciente.",
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
          <Input label="Documento" type="number" name="documento" value={formData.documento} onChange={handleChange} />
          <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
          <Input label="Telefono" type="number" name="telefono" value={formData.telefono} onChange={handleChange} />
          <Input label="Fecha de naciemiento" type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
          <Select
            label="EPS"
            name="eps"
            value={formData.eps}
            onChange={(val) => setFormData({ ...formData, eps: val })}
          >
            {epsList.map((eps) => (
              <Option key={eps.id} value={eps.nombre}>
                {eps.nombre}
              </Option>
            ))}
          </Select>
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
            Tabla de Pacientes
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nombre", "Función", "Status", "Contacto", "EPS", ""].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pacientes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    <Typography variant="small" color="blue-gray">
                      Cargando pacientes...
                    </Typography>
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
                            alt={`${paciente.nombrePaciente}`}
                            size="sm"
                            variant="rounded"
                          />
                          <div>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                              {paciente.nombrePaciente}
                            </Typography>

                            <Typography className="text-xs font-normal text-blue-gray-500">
                              <a href={`mailto:${paciente.idUsuario?.email}`} className="text-blue-500 underline">
                                {paciente.idUsuario?.email || 'Sin correo'}
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
                        {paciente.status === 1 ? (
                          <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                            Activo
                          </span>
                        ) : (
                          <span className="bg-red-200 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                            Inactivo
                          </span>
                        )}
                      </td>

                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {paciente.telefonoPaciente}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {paciente.epsPaciente}
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
