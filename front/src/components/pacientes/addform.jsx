import {
    Dialog, DialogHeader, DialogBody, DialogFooter,
    Input, Select, Option, Button, Typography,
    Tabs, TabsHeader, TabsBody, Tab, TabPanel,
} from "@material-tailwind/react";

import { useState } from "react";
import {
    UserCircleIcon,
    LockClosedIcon,
} from "@heroicons/react/24/solid";

export default function PacientesForm({
    open,
    formData,
    handleChange,
    handleSubmit,
    abrirModalUsuarios,
    roles,
    epsList,
    modoEdicion,
    handleUpdate,
}) {
    const [activeTab, setActiveTab] = useState("datos");

    return (
        <Dialog open={open} handler={abrirModalUsuarios} size="xl">
            <DialogHeader>
                {modoEdicion ? "Editar Paciente" : "Registrar Nuevo Paciente"}
            </DialogHeader>

            <Tabs value={activeTab} className="px-6">
                <TabsHeader className="mb-4">
                    <Tab
                        value="datos"
                        onClick={() => setActiveTab("datos")}
                        icon={<UserCircleIcon className="w-5 h-5" />}
                    >
                        Datos Personales
                    </Tab>
                    <Tab
                        value="usuario"
                        onClick={() => setActiveTab("usuario")}
                        icon={<LockClosedIcon className="w-5 h-5" />}
                    >
                        Usuario
                    </Tab>
                </TabsHeader>

                <TabsBody>
                    <TabPanel value="datos">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Nombre completo" name="nombre" value={formData.nombre} onChange={handleChange} />
                            <Input label="Documento" type="number" name="documento" value={formData.documento} onChange={handleChange} />
                            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
                            <Input label="Teléfono" type="number" name="telefono" value={formData.telefono} onChange={handleChange} />
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

                            <Select
                                label="Estado Civil"
                                name="estadoCivil"
                                value={formData.estadoCivil}
                                onChange={(val) => handleChange({ target: { name: "estadoCivil", value: val } })}
                            >
                                <Option value="soltero">Soltero</Option>
                                <Option value="casado">Casado</Option>
                                <Option value="unionLibre">Unión Libre</Option>
                                <Option value="divorciado">Divorciado</Option>
                                <Option value="viudo">Viudo</Option>
                            </Select>
                        </div>
                    </TabPanel>

                    <TabPanel value="usuario">
                        {modoEdicion ? (
                            <Typography variant="small" color="gray">
                                Las credenciales solo se modifican al registrar un nuevo paciente.
                            </Typography>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            </div>
                        )}
                    </TabPanel>
                </TabsBody>
            </Tabs>

            <DialogFooter>
                <Button variant="text" color="red" onClick={abrirModalUsuarios} className="mr-2">
                    Cancelar
                </Button>
                <Button onClick={modoEdicion ? handleUpdate : handleSubmit} color="green">
                    {modoEdicion ? "Actualizar" : "Registrar"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
