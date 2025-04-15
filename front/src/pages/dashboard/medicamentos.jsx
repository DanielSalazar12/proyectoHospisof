import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
  CardFooter,
  IconButton,
} from "@material-tailwind/react";

import { useMedicamentosData } from "@/hooks/useMedicamentosData";
import ModalForm from "@/components/modalForm";

export function Medicamentos() {
  const medicamentosList = useMedicamentosData();
  return (
    <>
      <ModalForm />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-10">
        {medicamentosList.map((medicamento) => (
          <Card className="w-96 shadow-lg" key={medicamento.codigo}>
            <CardHeader floated={false} className="h-60 overflow-hidden">
              <img
                src=""
                alt={`img-medicamento ${medicamento.nombre}`}
                className="h-full w-full object-cover"
              />
            </CardHeader>

            <CardBody className="px-4 pt-4 pb-2 space-y-3 text-gray-700">
              <div>
                <Typography
                  variant="h6"
                  className="text-lg font-bold text-blue-800"
                >
                  {medicamento.nombre}
                </Typography>
                <Typography className="text-sm">
                  <span className="font-semibold">Código:</span>{" "}
                  {medicamento.codigo}
                </Typography>
              </div>
              <div className="border-t pt-2">
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i class="fa-solid fa-syringe"></i> Administración:
                  </span>{" "}
                  {medicamento.administracion}
                </Typography>
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i class="fa-solid fa-prescription-bottle"></i>{" "}
                    Presentación:
                  </span>{" "}
                  {medicamento.presentacion}
                </Typography>
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i class="fa-solid fa-clipboard"></i> Descripción:
                  </span>{" "}
                  {medicamento.descripcion}
                </Typography>
              </div>
              <div className="border-t pt-2">
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i class="fa-solid fa-calendar-days"></i> Vencimiento:
                  </span>{" "}
                  {medicamento.vencimiento}
                </Typography>
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i class="fa-solid fa-box-archive"></i> Stock:
                  </span>{" "}
                  <span
                    className={`font-bold px-2 py-1 rounded ${
                      medicamento.stock < 10
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {medicamento.stock}
                  </span>
                </Typography>
              </div>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
              <Tooltip content="Edit" placement="top">
                <IconButton color="amber" className="rounded-full">
                  {" "}
                  <i class="fa-regular fa-pen-to-square"></i>
                </IconButton>
              </Tooltip>
              <Tooltip content="Ver">
                <IconButton color="blue" className="rounded-full">
                  {" "}
                  <i class="fa-regular fa-eye"></i>
                </IconButton>
              </Tooltip>
              <Tooltip content="Eliminar">
                <IconButton color="red" className="rounded-full">
                  {" "}
                  <i class="fa-regular fa-trash-can"></i>
                </IconButton>
              </Tooltip>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Medicamentos;
