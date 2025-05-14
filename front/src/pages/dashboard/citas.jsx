
import { useCitasLogic } from "@/hooks/citas/useCitasLogic";
//import citasForm from "@/components/citas/formCitas";
import CitasTable from "@/components/citas/tablaCitas";
import { Button } from "@material-tailwind/react";


export function Citas() {
    const {
        open,
        abrirModalCitas,
        formData,
        citas,
        handleChange,
        modoEdicion,
        handleUpdate,
        handleDelete,
        handleSubmit,
        handleEditClick,
    } = useCitasLogic();

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <div className="flex justify-end px-6">
                <Button color="blue" >
                    Registrar Cita
                </Button>
            </div>



            <CitasTable
                citas={citas}
            />

        </div>
    );
}

export default Citas;
