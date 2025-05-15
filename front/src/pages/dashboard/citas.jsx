import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { ModalCita } from "@/components/citas/formCitas";
import { useCitasLogic } from "@/hooks/citas/useCitasLogic";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export function Citas() {
    const {
        open,
        citas,
        pacientes,
        medicos,
        cargarDatos,
        handleEventClick,
        getInitialDate,
        abrirModal,
        cerrarModal,
        formData,
        handleChange,
        handleSubmit,
    } = useCitasLogic();

    const [events, setEvents] = useState([]);

    useEffect(() => {
        cargarDatos();
    }, []);

    useEffect(() => {
        const citasEventos = citas.map(cita => ({
            title: `${cita.horaCita}-${cita.pacienteId.nombrePaciente} - ${cita.tipoConsulta}`,
            date: new Date(cita.fechaCita).toISOString().split("T")[0],
            description: `Hora: ${cita.horaCita}, Médico: ${cita.medicoId.nombreMedico}`,
            extendedProps: {
                id: cita._id,
                medicoId: cita.medicoId,
                pacienteId: cita.pacienteId,
            },
        }));
        setEvents(citasEventos);
    }, [citas]);

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <div className="flex justify-end px-6">
                <Button color="blue" onClick={abrirModal}>
                    Registrar Cita
                </Button>
            </div>
            <div className="px-6">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    initialDate={getInitialDate()}
                    events={events}
                    eventClick={handleEventClick}
                />
            </div>
            <ModalCita
                open={open}
                onClose={cerrarModal}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                medicos={medicos}
                pacientes={pacientes}
            />
        </div>
    );
}

