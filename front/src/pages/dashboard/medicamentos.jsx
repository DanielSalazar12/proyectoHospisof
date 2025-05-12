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
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import FormMedicamento from "@/components/medicamentos/FormMedicamento";
import ListMedicamentos from "@/components/medicamentos/ListMedicamentos";

export function Medicamentos() {
  const urlApi = "http://127.0.0.1:3000/api/medicaments/";
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [medicamentos, setMedicamentos] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buscar, setBusqueda] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const handleOpen = () => setOpen(!open);
  const [paginacion, setPaginacion] = useState({
    paginaActual: 1,
    totalPaginas: 1,
    porPagina: 6,
    totalItems: 0,
    anteriorPageUrl: null,
    siguienteUrl: null,
    primeraUrl: `${urlApi}list/1/6`,
    ultimaUrl: null,
  });
  const handlePageChange = useCallback(
    async (target) => {
      try {
        setLoading(true);
        setError(null);
        let url;
        if (typeof target === "number") {
          url = `${urlApi}list/${target}/${paginacion.porPagina}`;
        } else if (typeof target === "string" && target.startsWith("http")) {
          url = target;
        } else {
          url = `${urlApi}list/1/${paginacion.porPagina}`;
        }
        const response = await axios.get(url);

        if (response.data && response.data.estado) {
          setMedicamentos(response.data.data);
          if (response.data.paginacion) {
            setPaginacion(response.data.paginacion);
          } else {
            const total = response.data.total || response.data.data.length;
            const limit = paginacion.porPagina;
            const page = new URL(url).searchParams.get("page") || 1;
            const currentPage = parseInt(page);
            const totalPages = Math.ceil(total / limit);

            setPaginacion({
              paginaActual: currentPage,
              totalPaginas: totalPages,
              porPagina: limit,
              totalItems: total,
              anteriorPageUrl:
                currentPage > 1
                  ? `${urlApi}list/${currentPage - 1}/${limit}`
                  : null,
              siguienteUrl:
                currentPage < totalPages
                  ? `${urlApi}list/${currentPage + 1}/${limit}`
                  : null,
              primeraUrl: `${urlApi}list/1/${limit}`,
              ultimaUrl: `${urlApi}list/${totalPages}/${limit}`,
            });
          }
        } else {
          throw new Error("Estructura de datos inesperada");
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
        console.error("Error en paginación:", error);
      } finally {
        setLoading(false);
      }
    },
    [paginacion.porPagina, urlApi],
  );
  const fetchInitialData = useCallback(async () => {
    await handlePageChange(1);
  }, [handlePageChange]);

  useEffect(() => {
    fetchInitialData();
  }, [refresh, fetchInitialData]);
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
          <FormMedicamento activeStep={activeStep} setRefresh={setRefresh} stateModal={setOpen} urlApi={urlApi}  />
        </DialogBody>
        <DialogFooter className="mt-10 flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          {activeStep === 2 ? (
            <Button variant="gradient" color="blue" className="mr-1">
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
      <ListMedicamentos
        urlApi={urlApi}
        medicamentos={medicamentos}
        loading={loading}
        error={error}
        buscar={buscar}
        paginacion={paginacion}
        setBusqueda={setBusqueda}
        handlePageChange={handlePageChange}
        onRefresh={setRefresh}
      ></ListMedicamentos>
    </>
  );
}

export default Medicamentos;
