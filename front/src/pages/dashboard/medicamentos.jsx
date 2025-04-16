import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
  CardFooter,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Stepper,
  Step,
} from "@material-tailwind/react";

import { useMedicamentosData } from "@/hooks/useMedicamentosData";
import FormMedicamento from "@/components/FormMedicamento";
import { useState } from "react";
import {
  ArchiveBoxIcon,
  ClipboardIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

export function Medicamentos() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const medicamentosList = useMedicamentosData();
  return (
    <>
      <Button onClick={handleOpen} className="mb-5" color="green">
        <i className="fa-solid fa-plus"></i> Agregar Medicamento
      </Button>

      <Dialog open={open} size="lg" handler={handleOpen}>
        <DialogHeader>Registro Medicamento</DialogHeader>
        <DialogBody>
          <Stepper
            activeStep={activeStep}
            className="w-full mb-5"
            isFirstStep={(value) => setIsFirstStep(value)}
            isLastStep={(value) => setIsLastStep(value)}
          >
            <Step onClick={() => setActiveStep(0)}>
              {" "}
              <ClipboardIcon className="h-5 w-5 text-blue-gray" />{" "}
            </Step>
            <Step onClick={() => setActiveStep(1)}>
              <ArchiveBoxIcon className="h-5 w-5 text-blue-gray" />{" "}
            </Step>
            <Step onClick={() => setActiveStep(2)}>
              <PhoneIcon className="h-5 w-5 text-blue-gray" />{" "}
            </Step>
          </Stepper>
          <FormMedicamento activeStep={activeStep} />
        </DialogBody>
        <DialogFooter className="mt-10 flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          {activeStep === 2 ? (
            <Button variant="gradient" className="mr-1">
              Finalizar
            </Button>
          ) : (
            <Button variant="gradient" className="mr-1" onClick={handleNext}>
              Siguiente
            </Button>
          )}
        </DialogFooter>
      </Dialog>

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
