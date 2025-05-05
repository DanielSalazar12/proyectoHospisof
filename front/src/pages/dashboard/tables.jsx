import { usePacientesLogic } from "@/hooks/usePacientesLogic";
import PacientesForm from "@/components/pacientes/addform";
import PacientesTable from "@/components/pacientes/pacientesTable";
import { Button } from "@material-tailwind/react";
import { epsList } from "@/hooks/usePacientesData";

export default function Tables() {
  const {
    open,
    abrirModalUsuarios,
    formData,
    handleChange,
    handleSubmit,
    pacientes,
    roles,
    handleDelete,
    handleEditClick,
    modoEdicion,
    handleUpdate,
  } = usePacientesLogic();

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="flex justify-end px-6">
        <Button color="blue" onClick={abrirModalUsuarios}>
          Registrar Usuario
        </Button>
      </div>

      <PacientesForm
        open={open}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        abrirModalUsuarios={abrirModalUsuarios}
        roles={roles}
        epsList={epsList}
        modoEdicion={modoEdicion}
        handleUpdate={handleUpdate}
      />

      <PacientesTable
        pacientes={pacientes}
        roles={roles}
        handleDelete={handleDelete}
        handleEditClick={handleEditClick}
        epsList={epsList}
      />
    </div>
  );
}
