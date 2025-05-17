import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Tooltip,
  Button,
  IconButton,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  TabPanel,
  TabsBody,
} from "@material-tailwind/react";
import {
  HomeIcon,
  PencilIcon,
  ClipboardDocumentListIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import FormDiagnostico from "@/components/diagnosticos/FormDiagnostico";

const urlApi = "http://127.0.0.1:3000/api/diagnostic/";
const urlApiPatients = "http://127.0.0.1:3000/api/patient/";
const urlApiMedicals = "http://127.0.0.1:3000/api/diagnostic/";

export function Diagnostico() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("Busqueda");
  const [refresh, setRefresh] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [documento, setDocumento] = useState("");

  const [diagnosticos, setDiagnosticos] = useState([]); // Diagnosticos del pacientes
  const [diagnostico, setDiagnostico] = useState(null); // Diagnostico seleccionado para ver la informacion

  const [medicos, setMedicos] = useState([]);
  const [paciente, setPaciente] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [pacienteValido, setPacienteValido] = useState(false);
  const [paginacion, setPaginacion] = useState({
    paginaActual: 1,
    totalPaginas: 1,
    porPagina: 3,
    totalItems: 0,
    anteriorPageUrl: null,
    siguienteUrl: null,
    primeraUrl: `${urlApi}list/${documento}/1/3`,
    ultimaUrl: null,
  });
  const handleOpen = (diagnosticoId) => {
    let info = diagnosticos.find((d) => d._id == diagnosticoId);
    setOpen(true);
    setDiagnostico(info);
  };
  const handleClose = () => {
    setOpen(false);
    setDiagnostico([]);
  };
  const handleReadInput = (e) => {
    const value = e.target.value;
    setBusqueda(value);
  };

  const validPaciente = () => {
    const patient = pacientes.find((p) => p.documento == busqueda);

    if (!patient) {
      Swal.fire({
        title: "Documento Invalido",
        text: "¡El usuario no existe en el sistema!",
        icon: "error",
        showConfirmButton: false,
        timer: 2400,
      });
      setPacienteValido(false);
      setPaciente([]);
      setDocumento("");
    } else {
      console.log(patient.documento);
      setRefresh(!refresh);
      setPaciente(patient);
      setDocumento(patient.documento);
      medicosList(patient.documento);
      setPacienteValido(true);
    }
  };
  const fetchPacientes = useCallback(async () => {
    try {
      const response = await axios.get(urlApiPatients + "list");
      if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        setPacientes(response.data.data);
      } else {
        console.log("La respuesta de la API no es la qué se esperaba.");
        setPacientes([]);
      }
    } catch (error) {
      console.log(
        "Error al obtener los pacientes del sistema: " + error.message,
      );
      setPacientes([]);
    }
  }, [urlApiPatients]);

  const handlePageChange = useCallback(
    async (target) => {
      try {
        setLoading(true);
        setError(null);
        let url;
        if (typeof target === "number") {
          url = `${urlApi}list/${documento}/${target}/${paginacion.porPagina}`;
          console.log(" if:", documento, " ulr", url);
        } else if (typeof target === "string" && target.startsWith("http")) {
          url = target;
          console.log("else if:", documento, " ulr", url);
        } else {
          url = `${urlApi}list/${documento}/1/${paginacion.porPagina}`;
          console.log("else ", documento, " ulr", url);
        }
        const response = await axios.get(url);

        if (response.data && response.data.estado) {
          setDiagnosticos(response.data.data);
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
              primeraUrl: `${urlApi}list/${documento}/1/${limit}`,
              ultimaUrl: `${urlApi}list/${documento}/${totalPages}/${limit}`,
            });
          }
        } else {
          setLoading(false);
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
    fetchPacientes();
  }, [fetchPacientes]);

  useEffect(() => {
    fetchInitialData();
  }, [refresh, fetchInitialData]);

  const renderPaginationControls = () => (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {/* Primera Página */}
      <Button
        disabled={paginacion.paginaActual === 1}
        onClick={() => handlePageChange(paginacion.primeraUrl)}
        className="flex items-center gap-1 px-3 py-1 rounded-full"
        color={paginacion.paginaActual === 1 ? "gray" : "blue"}
      >
        « Primera
      </Button>

      {/* Anterior */}
      <Button
        disabled={!paginacion.anteriorPageUrl}
        onClick={() => handlePageChange(paginacion.anteriorPageUrl)}
        className="flex items-center gap-1 px-3 py-1 rounded-full"
        color={paginacion.anteriorPageUrl ? "blue" : "gray"}
      >
        ‹ Anterior
      </Button>

      {/* Paginas */}
      {Array.from({ length: paginacion.totalPaginas }, (_, i) => i + 1).map(
        (page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 p-0 rounded-full mx-1 ${
              page === paginacion.paginaActual
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </Button>
        ),
      )}

      {/* Siguiente */}
      <Button
        disabled={!paginacion.siguienteUrl}
        onClick={() => handlePageChange(paginacion.siguienteUrl)}
        className="flex items-center gap-1 px-3 py-1 rounded-full"
        color={paginacion.siguienteUrl ? "blue" : "gray"}
      >
        Siguiente ›
      </Button>

      {/* Última Página */}
      <Button
        disabled={paginacion.paginaActual === paginacion.totalPaginas}
        onClick={() => handlePageChange(paginacion.ultimaUrl)}
        className="flex items-center gap-1 px-3 py-1 rounded-full"
        color={
          paginacion.paginaActual === paginacion.totalPaginas ? "gray" : "blue"
        }
      >
        Última »
      </Button>
    </div>
  );

  const medicosList = useCallback(async (documento) => {
    const response = await axios.get(
      urlApiMedicals + `infoMedicals/${documento}`,
    );
    setMedicos(response.data.data);
  });
  return (
    <>
      {diagnostico && (
        <Dialog
          size="lg"
          open={open}
          handler={handleClose}
          key={diagnostico._id}
        >
          <DialogHeader className="flex items-center gap-2">
            Información Detallada
          </DialogHeader>
          <DialogBody
            divider
            className="flex flex-col gap-3 text-sm text-gray-700"
          >
            <Typography>
              <span className="font-semibold">
                {" "}
                Historia de la Enfermedad Actual:
              </span>{" "}
              {diagnostico.historia}
            </Typography>
            <Typography>
              <span className="font-semibold"> Examen Físico:</span>
              <p> - Signos vitales dentro de parámetros normales.</p>
              <p>
                {" "}
                - Dolor a la palpación en epigastrio sin rebote ni defensa.
              </p>
              <p>-Ruidos hidroaéreos presentes.</p>
              <p> - No hay signos de deshidratación ni ictericia.</p>
            </Typography>
            <Typography>
              <span className="font-semibold">📈 Evolución Clínica: </span>
              {diagnostico.evoClinica}
            </Typography>
            <Typography>
              <span className="font-semibold">Medicamentos Recetados:</span> {}
              <p>1. Omeprazol 20 mg – 1 cápsula en ayunas por 30 días.</p>
            </Typography>
          </DialogBody>
        </Dialog>
      )}

      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/fondo3.jpg')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <Tabs value={type}>
          <TabsBody>
            <CardBody className="p-4">
              <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                {type === "Busqueda" ? (
                  <div className="flex items-center gap-6">
                    <Avatar
                      src="/img/hospital.png"
                      alt="bruce-mars"
                      size="xl"
                      variant="rounded"
                      className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                    />
                    <div>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-1"
                      >
                        Hospi Soft
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-600"
                      >
                        Hospital Santa Teresa
                      </Typography>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-6">
                    <Avatar
                      src="/img/paciente.png"
                      alt="bruce-mars"
                      size="xl"
                      variant="rounded"
                      className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                    />
                    <div>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-1"
                      >
                        {paciente.nombrePaciente}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-600"
                      >
                        Paciente / {paciente.epsPaciente}
                      </Typography>
                    </div>
                  </div>
                )}

                <div className="w-96">
                  <TabsHeader>
                    <Tab value="Busqueda" onClick={() => setType("Busqueda")}>
                      <UserIcon
                        color={pacienteValido ? "green" : "red"}
                        className="-mt-1 mr-2 inline-block h-5 w-5"
                      />
                      Paciente
                    </Tab>

                    <Tab
                      value="Historial"
                      onClick={() => {
                        if (pacienteValido) setType("Historial");
                      }}
                      disabled={!pacienteValido}
                    >
                      <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      Historial
                    </Tab>
                    <Tab
                      value="Diagnostico"
                      onClick={() => {
                        if (pacienteValido) setType("Diagnostico");
                      }}
                      disabled={!pacienteValido}
                    >
                      <ClipboardDocumentListIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                      Nuevo
                    </Tab>
                  </TabsHeader>
                </div>
              </div>
              <TabPanel value="Busqueda">
                <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-1">
                  <div className="flex gap-4 mt-4 mb-3">
                    <div className="relative w-full max-w-md">
                      <Tooltip content="Buscar paciente">
                        <Input
                          size="lg"
                          type="number"
                          name="search"
                          label="Buscar"
                          value={busqueda}
                          onChange={handleReadInput}
                          icon={<i className="fa-solid fa-user-tie"></i>}
                        />
                      </Tooltip>
                    </div>
                    <div className="w-full">
                      <Tooltip content="Buscar">
                        <IconButton color="blue" onClick={validPaciente}>
                          {" "}
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="Historial">
                <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-2">
                  <ProfileInfoCard
                    title="Informacion del paciente"
                    details={{
                      Nombre: paciente.nombrePaciente,
                      Documento: paciente.documento,
                      Sexo: paciente.sexo,
                      "Estado Civil": paciente.estadoCivil,
                      "Fecha Nacimiento": paciente.fecha,
                      EPS: paciente.epsPaciente,
                      Telefono: paciente.telefonoPaciente,
                      email: "elvergas@mail.com",
                    }}
                    action={
                      <Tooltip content="Edit Profile">
                        <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                      </Tooltip>
                    }
                  />
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                      Historial Medicos
                    </Typography>
                    <ul className="flex flex-col gap-6">
                      {medicos.map((medico) => (
                        <MessageCard
                          key={medico._id}
                          name={medico.medicalId.nombreMedico}
                          message={medico.medicalId.especialidad}
                          img={`http://127.0.0.1:3000/api/medical/image/${medico.medicalId.foto}`}
                          action={
                            <IconButton color="blue" className="rounded-full">
                              <i className="fa-solid fa-info"></i>
                            </IconButton>
                          }
                        />
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Historial Clinico
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    Diagnosticos Anteriores
                  </Typography>

                  <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
                    {loading && (
                      <Typography>Cargando diagnosticos...</Typography>
                    )}
                    {diagnosticos.map(
                      ({
                        _id,
                        diagPrincipal,
                        fecha,
                        epsPaciente,
                        motivoConsulta,
                        medico,
                      }) => (
                        <Card key={_id} color="transparent" shadow={false}>
                          <CardHeader
                            floated={false}
                            color="gray"
                            className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                          >
                            <img
                              src={"/img/fondoDiagnostico.jpg"}
                              alt={`Diagnosticos -  ${fecha}`}
                              className="h-full w-full object-cover"
                            />
                          </CardHeader>
                          <CardBody className="py-0 px-1">
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mt-1 mb-2"
                            >
                              {`Diagnostico -  ${fecha}`}
                            </Typography>
                            <Typography
                              variant="small"
                              className="font-normal text-blue-gray-500"
                            >
                              <span className="font-semibold">Doctor: </span>
                              {medico}
                            </Typography>
                            <Typography
                              variant="small"
                              className="font-normal text-blue-gray-500"
                            >
                              <span className="font-semibold">Eps:</span>{" "}
                              {epsPaciente}
                            </Typography>
                            <Typography
                              variant="small"
                              className="font-normal text-blue-gray-500"
                            >
                              <span className="font-semibold">Fecha:</span>{" "}
                              {fecha}
                            </Typography>
                            <Typography
                              variant="small"
                              className="font-normal text-blue-gray-500"
                            >
                              <span className="font-semibold">Dianostico:</span>{" "}
                              {diagPrincipal}
                            </Typography>
                            <Typography
                              variant="small"
                              className="font-normal text-blue-gray-500"
                            >
                              <span className="font-semibold">Motivo:</span>{" "}
                              {motivoConsulta}
                            </Typography>
                          </CardBody>
                          <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                            <Link to={""}>
                              <Button
                                variant="outlined"
                                onClick={() => handleOpen(_id)}
                                size="sm"
                              >
                                ver completo
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ),
                    )}
                  </div>
                  {renderPaginationControls()}
                </div>
              </TabPanel>
              <TabPanel value="Diagnostico">
                <FormDiagnostico dataPaciente={paciente}></FormDiagnostico>
              </TabPanel>
            </CardBody>
          </TabsBody>
        </Tabs>
      </Card>
    </>
  );
}

export default Diagnostico;
