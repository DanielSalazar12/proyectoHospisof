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
  timeline,
} from "@material-tailwind/react";
import {
  ArchiveBoxIcon,
  ClipboardIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useApi } from "@/hooks/useApiMedicamentos";
import FormMedicamento from "@/components/FormMedicamento";
import ListMedicamentos from "@/components/ListMedicamentos";

export function Medicamentos() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Dialog open={open} size="lg" handler={handleOpen}>
        <DialogHeader>
          Registro Medicamento{" "}
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
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
            <Button variant="gradient" color="blue"  className="mr-1">
              Finalizar
            </Button>
          ) : (
            <Button variant="gradient" className="mr-1" onClick={handleNext}>
              Siguiente
            </Button>
          )}
        </DialogFooter>
      </Dialog>
      <div className="flex justify-between items-center mb-2 mt-4">
        <Typography variant="h4" className="text-light-blue-800 font-bold">
          Dispensario de Medicamentos
        </Typography>
        <Tooltip
          content="Registrar Medicamento"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          placement="left"
        >
          <IconButton
            color="blue"
            className="rounded-full"
            onClick={handleOpen}
          >
            <i className="fa-solid fa-plus"></i>
          </IconButton>
        </Tooltip>
      </div>
      <ListMedicamentos></ListMedicamentos>
    </>
  );
}

export default Medicamentos;
