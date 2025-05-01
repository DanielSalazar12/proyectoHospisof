import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import {
  ArchiveBoxIcon,
  ClipboardIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import ListMedicos from "@/components/medicos/ListMedicos";
import FormMedico from "@/components/medicos/FormMedico";
export function Medicos() {
  const urlApi = "http://127.0.0.1:3000/api/medical/";
  const [open, setOpen] = useState(false);
  const [medicos, setMedicos] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buscar, setBusqueda] = useState("");
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
  /*   console.log(medicos);
  console.log(paginacion); */
  console.log("refresco form: " + refresh);
  const handleOpen = () => setOpen(true);

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
          setMedicos(response.data.data);
          if (response.data.paginacion) {
            setPaginacion(response.data.paginacion);
          } else {
            // Construimos información de paginación si no viene en la respuesta
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

  /*  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]); */

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData, refresh]);
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Modal
      </Button>
      <Dialog open={open} handler={handleOpen} size="md">
        <DialogHeader className="flex items-center bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-lg px-6 py-4 justify-center text-white">
          {" "}
          <div className="flex flex-col items-center">
            <i className="material-icons text-4xl mb-2">icono</i>
            <span className="text-xl font-bold">Registro de Medicos</span>
          </div>
        </DialogHeader>
        <DialogBody>
          <FormMedico setRefresh={setRefresh} urlApi={urlApi}></FormMedico>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="gray" onClick={handleOpen}>
            <span>Cerrar</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <ListMedicos
        medicos={medicos}
        loading={loading}
        error={error}
        buscar={buscar}
        paginacion={paginacion}
        setBusqueda={setBusqueda}
        handlePageChange={handlePageChange}
        urlApi={urlApi}
      />
    </>
  );
}
export default Medicos;
