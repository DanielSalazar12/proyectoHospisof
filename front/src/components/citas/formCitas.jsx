import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
    Button,
    Typography,
    Card,
    CardHeader,
    CardBody,
} from "@material-tailwind/react";

import {BuscarPacienteInput} from "../citas/buscarPaciente";

export function ModalCita({
    open,
    onClose,
    formData,
    handleChange,
    handleSubmit,
    pacientes,
    medicos ,
    modoEdicion = false,
  
}) {
    return (
        <Dialog open={open} handler={onClose} size="md" className="rounded-t-xl">
            <Card className="w-full">
                <CardHeader color="blue" className="m-0 grid place-items-center px-4 py-8 text-center">
                    {modoEdicion ? "Editar Cita" : "Registrar Nueva Cita"}
                </CardHeader>
                <CardBody>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <BuscarPacienteInput
    value={formData.pacienteId}
    onChange={(val) =>
        handleChange({ target: { name: "pacienteId", value: val } })
    }
/>

                        <Select
                            label="Médico"
                            name="medicoId"
                            value={formData.medicoId}
                            onChange={(val) => handleChange({ target: { name: "medicoId", value: val } })}
                        >
                            {medicos.map((m) => (
                                <Option key={m._id} value={m._id}>
                                    {m.nombreMedico}
                                </Option>
                            ))}
                        </Select>

                        <Input
                            label="Fecha"
                            type="date"
                            name="fechaCita"
                            value={formData.fechaCita}
                            onChange={handleChange}
                        />
                        <Input
                            label="Hora"
                            type="time"
                            name="horaCita"
                            value={formData.horaCita}
                            onChange={handleChange}
                        />
                        <Input
                            label="Motivo"
                            name="motivo"
                            value={formData.motivo}
                            onChange={handleChange}
                        />
                        <Input
                            label="Notas"
                            name="notas"
                            value={formData.notas}
                            onChange={handleChange}
                        />
                        <Select
                            label="Tipo de Consulta"
                            name="tipoConsulta"
                            value={formData.tipoConsulta}
                            onChange={(val) => handleChange({ target: { name: "tipoConsulta", value: val } })}
                        >
                            <Option value="general">General</Option>
                            <Option value="especialista">Especialista</Option>
                            <Option value="control">Control</Option>
                        </Select>
                    </div>
                </CardBody>
            </Card>

            <DialogFooter>
                <Button variant="text" color="red" onClick={onClose} className="mr-2">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="green">
                    {modoEdicion ? "Actualizar" : "Registrar"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
