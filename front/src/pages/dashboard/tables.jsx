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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { projectsTableData } from "@/data";
import { useUsersData, getRoles } from "@/hooks/useUsersData";
import { useState } from "react";

export function Tables() {
  const usuarios = useUsersData();
  const roles = getRoles();

  const [open, setOpen] = useState(false);

  const abrirModalUsuarios = () => setOpen(!open); // ! lo convierte en lo opuesto, si es false se vuelve true

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="flex justify-end px-6">
        <Button color="blue" onClick={abrirModalUsuarios}>
          Registrar Usuario
        </Button>
      </div>

      {/* Modal para registrar usuario */}
      <Dialog open={open} handler={abrirModalUsuarios}>
        <DialogHeader>Registrar nuevo usuario</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Input label="Nombre" name="nombre" />
          <Input label="Apellido" name="apellido" />
          <Input label="Email" name="email" />
          <Input label="Teléfono" name="telefono" />
          <Input label="Especialidad" name="especialidad" />
          <Select label="Rol" name="rol" id="rol">
            {roles.map((rol) => (
              <Option key={rol._id} value={rol._id}>
                {rol.nombreRol}
              </Option>
            ))}
          </Select>
          <Input label="Nombre de usuario" name="userName" />
          <Input label="Contraseña" name="passwordUser" />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={abrirModalUsuarios} className="mr-2">
            Cancelar
          </Button>
          <Button variant="gradient" type="submit" color="green" onClick={abrirModalUsuarios}>
            Guardar
          </Button>
        </DialogFooter>
      </Dialog>

      {/* ====================================================Mi tabla de usuarios ======================================== */}
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
                        <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600">
                          Editar
                        </Typography>
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
