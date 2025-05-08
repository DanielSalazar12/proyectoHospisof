import {
    Dialog,
    DialogBody,
    DialogFooter,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Input,
    Select,
    Option,
    Button,
    Typography,
  } from "@material-tailwind/react";
  
  export default function UsuariosForm({
    open,
    formData = {},
    abrirModalUsuarios,
    roles = [],
    handleChange,
    handleSubmit,
    handleUpdate,
    modoEdicion,
  }) {
    return (
      <Dialog
        open={open}
        handler={abrirModalUsuarios}
        size="md" className="rounded-t-xl"
      >
        <Card className="w-full">
        <CardHeader color="gray" className="m-0 grid place-items-center px-4 py-8 text-center" >
            {modoEdicion ? "Editar Usuario" : "Registrar Nuevo Usuario"}
            </CardHeader>
          <CardBody >
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <Input
              label="Nombre de usuario"
              name="nombreUsuario"
              value={formData.nombreUsuario || ""}
              onChange={handleChange}
              color="blue"
              size="lg"
            />
            <Input
              label="Contraseña"
              type="password"
              name="passwordUser"
              value={formData.passwordUser || ""}
              onChange={handleChange}
              color="blue"
              size="lg"
            />
            <Input
              label="Email"
              type="email"
              name="emailUser"
              value={formData.emailUser || ""}
              onChange={handleChange}
              color="blue"
              size="lg"
            />
            <Select
              label="Rol"
              name="rol"
              value={formData.rol || ""}
              onChange={(val) =>
                handleChange({ target: { name: "rol", value: val } })
              }
              size="lg"
              color="blue"
            >
              {roles.map((rol) => (
                <Option key={rol._id} value={rol._id}>
                  {rol.nombreRol}
                </Option>
              ))}
            </Select>
            </div>
          
          </CardBody>
  
          <CardFooter className="flex justify-end gap-3 px-6 pb-4">
            <Button variant="text" color="red" onClick={abrirModalUsuarios}>
              Cancelar
            </Button>
            <Button
              color="green"
              onClick={modoEdicion ? handleUpdate : handleSubmit}
            >
              {modoEdicion ? "Actualizar" : "Registrar"}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    );
  }
  