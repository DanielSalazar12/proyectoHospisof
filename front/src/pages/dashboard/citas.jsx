
import { useCitasLogic } from "@/hooks/citas/useCitasLogic";
//import citasForm from "@/components/citas/formCitas";
import citasTable from "@/components/citas/tablaCitas";
import { Button } from "@material-tailwind/react";
import { use } from "react";


export function Citas() {
    const {
        citas,
    } = useCitasLogic();

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <div className="flex justify-end px-6">
                <Button color="blue" >
                    Registrar Cita
                </Button>
            </div>
            <citasTable
                citas={citas}
            />

        </div>
    );
}

export default Citas;
