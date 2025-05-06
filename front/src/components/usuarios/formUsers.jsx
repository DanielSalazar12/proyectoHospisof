import {
    Dialog, DialogHeader, DialogBody, DialogFooter,
    Input, Select, Option, Button,
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
        <Dialog open={open} handler={abrirModalUsuarios}>
            <DialogHeader>Registrar nuevo usuario</DialogHeader>
            <DialogBody className="flex flex-col gap-4">
                <Input label="Nombre de usuario" name="nombreUsuario" value={formData.nombreUsuario || ""} onChange={handleChange} />
                <Input label="Contraseña" type="password" name="passwordUser" value={formData.passwordUser || ""} onChange={handleChange} />
                <Input label="Email" type="email" name="emailUser" value={formData.emailUser || ""} onChange={handleChange} />

                <Select label="Rol" name="rol" value={formData.rol || ""} onChange={(val) => handleChange({ target: { name: "rol", value: val } })}>
                    {roles.map((rol) => (
                        <Option key={rol._id} value={rol._id}>{rol.nombreRol}</Option>
                    ))}
                </Select>
            </DialogBody>

            <DialogFooter>
                <Button variant="text" color="red" onClick={abrirModalUsuarios} className="mr-2">Cancelar</Button>
                <Button onClick={modoEdicion ? handleUpdate : handleSubmit} color="green">
                    {modoEdicion ? "Actualizar" : "Registrar"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
