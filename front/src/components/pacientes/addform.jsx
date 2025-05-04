import {
    Dialog, DialogHeader, DialogBody, DialogFooter,
    Input, Select, Option, Button,
} from "@material-tailwind/react";

export default function PacientesForm({
    open,
    formData,
    handleChange,
    handleSubmit,
    abrirModalUsuarios,
    roles,
    epsList,
    modoEdicion,
    handleUpdate
}) {
    return (
        <Dialog open={open} handler={abrirModalUsuarios}>
            <DialogHeader>Registrar nuevo usuario</DialogHeader>
            <DialogBody className="flex flex-col gap-4">
                <Input label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                <Input label="Documento" type="number" name="documento" value={formData.documento} onChange={handleChange} />
                <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
                <Input label="Telefono" type="number" name="telefono" value={formData.telefono} onChange={handleChange} />
                <Input label="Fecha de nacimiento" type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />

                <Select label="EPS" name="eps" value={formData.eps} onChange={(val) => handleChange({ target: { name: "eps", value: val } })}>
                    {epsList.map((eps) => (
                        <Option key={eps.id} value={eps.id}>{eps.nombre}</Option>
                    ))}
                </Select>

                <Select label="Rol" name="rol" value={formData.rol} onChange={(val) => handleChange({ target: { name: "rol", value: val } })}>
                    {roles.map((rol) => (
                        <Option key={rol._id} value={rol._id}>{rol.nombreRol}</Option>
                    ))}
                </Select>

                <Select label="Sexo" name="sexo" value={formData.sexo} onChange={(val) => handleChange({ target: { name: "sexo", value: val } })}>
                    <Option value="masculino">Masculino</Option>
                    <Option value="femenino">Femenino</Option>
                    <Option value="otros">Otros</Option>
                </Select>

                <Input label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} />
                <Input label="Estado civil" name="estadoCivil" value={formData.estadoCivil} onChange={handleChange} />
                {!modoEdicion && (
                    <>
                        <Input
                            label="Nombre de Usuario"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                        />
                        <Input
                            label="Contraseña"
                            name="passwordUser"
                            type="password"
                            value={formData.passwordUser}
                            onChange={handleChange}
                        />
                    </>
                )}

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
