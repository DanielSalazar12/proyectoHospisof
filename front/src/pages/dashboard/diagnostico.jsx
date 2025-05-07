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
  Switch,
  Tooltip,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  TabPanel,
  TabsBody,
  Select,
  Option,
  Textarea,
  List,
  ListItem,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
  NewspaperIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  LockClosedIcon,
  TrashIcon,
  ClipboardIcon,
  ClipboardDocumentIcon,
  UsersIcon,
  UserIcon,
  PhoneIcon,
  CalendarDaysIcon,
  EnvelopeIcon,
  IdentificationIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { useState, useCallback, useEffect } from "react";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import axios from "axios";
const urlApi = "http://127.0.0.1:3000/api/diagnostico/";
const urlApiPatients = "http://127.0.0.1:3000/api/patient/";

export function Diagnostico() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("Busqueda");
  const [type2, setType2] = useState("Informacion");
  const [refresh, setRefresh] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const [diagnosticos, setDiagnosticos] = useState([]); // Diagnosticos del pacientes
  const [diagnostico, setDiagnostico] = useState(null); // Diagnostico seleccionado para ver la informacion

  const [paciente, setPaciente] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [pacienteValido, setPacienteValido] = useState(false);
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
    } else {
      setPaciente(patient);
      handleBusqueda(busqueda);
      setPacienteValido(true);
    }
  };
  const handleBusqueda = async (documento) => {
    try {
      const response = await axios.get(urlApi + `list/${documento}`);
      if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        setDiagnosticos(response.data.data);
      } else {
        console.log("La respuesta de la API no es la qué se esperaba.");
        setDiagnosticos([]);
      }
    } catch (error) {
      console.log(
        "Error al obtener los diagnosticos del paciente: " + error.message,
      );
      setDiagnosticos([]);
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

  useEffect(() => {
    fetchPacientes();
  }, [fetchPacientes, refresh]);
  /*   const handleSeleccion = (paciente) => {
    onSeleccionar(paciente);
    setBusqueda("");
    setResultados([]);
  }; */

  /* const handleBusqueda = (e) => {
    const value = e.target.value;
    setBusqueda(value);
    setResultados(
      pacientes.filter(
        (p) =>
          p.nombrePaciente.toLowerCase().includes(value.toLowerCase()) ||
          p.documento.includes(value),
      ),
    );
  }; */
  const handleChange = () => {};
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
              <span className="font-semibold">Medicamentos Recetados:</span>{" "}
              {}
              <p>1. Omeprazol 20 mg – 1 cápsula en ayunas por 30 días.</p>
            </Typography>
          </DialogBody>
        </Dialog>
      )}

      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-300" />
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
                      src="/img/bruce-mars.jpeg"
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
                      <UserIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
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
                          /* onChange={(e) => setBusqueda(e.target.value)} */
                        />
                      </Tooltip>
                      {/*    {resultados.length > 0 && (
                        <List className="absolute z-10 w-full bg-white shadow-lg rounded-b-lg max-h-48 overflow-auto">
                          {resultados.map((p) => (
                            <ListItem
                              key={p.documento}
                              onClick={() => handleSeleccion(p)}
                              className="cursor-pointer"
                            >
                              {p.nombrePaciente} — {p.documento}
                            </ListItem>
                          ))}
                        </List>
                      )} */}
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
                      EPS: paciente.eps,
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
                      {conversationsData.map((props) => (
                        <MessageCard
                          key={props.name}
                          {...props}
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
                    {diagnosticos.map(
                      ({
                        img,
                        title,
                        _id,
                        diagPrincipal,
                        fecha,
                        eps,
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
                              src={img}
                              alt={title}
                              className="h-full w-full object-cover"
                            />
                          </CardHeader>
                          <CardBody className="py-0 px-1">
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="mt-1 mb-2"
                            >
                              {title}
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
                              <span className="font-semibold">Eps:</span> {eps}
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
                </div>
              </TabPanel>
              <TabPanel value="Diagnostico">
                <Card className="w-full ">
                  <CardHeader
                    color="blue"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center px-4 py-8 text-center"
                  >
                    <div className="mb-3 h-20 p-6 text-white">
                      <ClipboardDocumentListIcon className="h-10 w-10 text-white"></ClipboardDocumentListIcon>
                    </div>
                    <Typography variant="h5" color="white">
                      Formulario Diagnostico
                    </Typography>
                  </CardHeader>
                  <CardBody>
                    <Tabs value={type2} className="overflow-visible">
                      <TabsHeader className="relative z-0 ">
                        <Tab
                          value="Informacion"
                          onClick={() => setType2("Informacion")}
                        >
                          Informacion
                        </Tab>
                        <Tab value="Examen" onClick={() => setType2("Examen")}>
                          Examen Fisico
                        </Tab>
                        <Tab
                          value="Medicacion"
                          onClick={() => setType2("Medicacion")}
                        >
                          Medicacion
                        </Tab>
                      </TabsHeader>
                      <TabsBody
                        className="!overflow-x-hidden !overflow-y-visible"
                        animate={{
                          initial: {
                            x: type2 === "Informacion" ? 400 : -400,
                          },
                          mount: {
                            x: 0,
                          },
                          unmount: {
                            x: type2 === "Informacion" ? 400 : -400,
                          },
                        }}
                      >
                        <TabPanel value="Informacion" className="p-0">
                          <form className="mt-9 flex flex-col gap-4">
                            <div
                              className="mt-1 flex flex-col gap-4"
                              onSubmit={handleChange}
                            >
                              <div className="my-1">
                                <div className="flex gap-4 mt-3">
                                  <div className="w-full">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="mb-2 text-left font-medium"
                                    >
                                      Fecha Diagnostico
                                    </Typography>
                                    <Input
                                      type="date"
                                      color="blue"
                                      name="fechaDiagnostico"
                                      required
                                    ></Input>
                                  </div>
                                  <div className="w-full">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="mb-2 text-left font-medium"
                                    >
                                      Medico
                                    </Typography>
                                    <Input
                                      type="text"
                                      name="medico"
                                      color="gray"
                                      value={"Felipe Anotonio"}
                                      readOnly
                                    ></Input>
                                  </div>
                                </div>
                                <div className="flex gap-4 mt-5">
                                  <div className="w-full">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="mb-2 text-left font-medium"
                                    >
                                      Nombre Paciente
                                    </Typography>
                                    <Input
                                      type="text"
                                      color="blue"
                                      value={"Juan Daniel Salzar Fosforito"}
                                      readOnly
                                      required
                                    ></Input>
                                  </div>
                                  <div className="w-full">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="mb-2 text-left font-medium"
                                    >
                                      Documento
                                    </Typography>
                                    <Input
                                      min={0}
                                      type="number"
                                      color="blue"
                                      value={1146598322}
                                      readOnly
                                      required
                                    ></Input>
                                  </div>
                                </div>
                                <div className="flex gap-4 mt-6">
                                  <div className="w-full">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="mb-2 text-left font-medium"
                                    >
                                      Motivo Consulta
                                    </Typography>
                                    <Input
                                      type="text"
                                      color="blue"
                                      name="motivo"
                                      required
                                    ></Input>
                                  </div>
                                  <div className="w-full">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="mb-2 text-left font-medium"
                                    >
                                      Diagnostico pricipal
                                    </Typography>
                                    <Input
                                      type="text"
                                      name="diagPrincipal"
                                      color="blue"
                                      required
                                    ></Input>
                                  </div>
                                </div>
                                <div className="flex gap-4 mt-6">
                                  <div className="w-full">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="mb-2 text-left font-medium"
                                    >
                                      Diagnostico Secundario
                                    </Typography>
                                    <Textarea
                                      color="blue"
                                      size="lg"
                                      placeholder="eg. Tablestas | Capsulas"
                                      name="diagSecundario"
                                      className="placeholder:opacity-100 focus:!border-t-blue-600"
                                      value=""
                                      required
                                      onChange={handleChange}
                                      containerProps={{
                                        className: "!min-w-full",
                                      }}
                                      labelProps={{
                                        className: "hidden",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Typography
                              variant="small"
                              color="gray"
                              className="flex items-center justify-center gap-2 font-medium opacity-60"
                            >
                              <LockClosedIcon className="-mt-0.5 h-4 w-4" />{" "}
                              Modulo de Informacion general.
                            </Typography>
                          </form>
                        </TabPanel>
                        <TabPanel value="Examen" className="p-0">
                          <form className="mt-8 flex flex-col gap-4">
                            <div
                              className="mt-1 flex flex-col gap-4"
                              onSubmit={handleChange}
                            >
                              <div className="my-1">
                                <div className="flex gap-4 mt-5">
                                  <div className="w-full">
                                    <Typography
                                      variant="lg"
                                      color="blue-gray"
                                      className="mb-2 text-left font-medium"
                                    >
                                      Historia
                                    </Typography>
                                    <Textarea
                                      color="blue"
                                      size="lg"
                                      placeholder="eg. Tablestas | Capsulas"
                                      name="descripcion"
                                      className="placeholder:opacity-100 focus:!border-t-blue-600"
                                      required
                                      onChange={handleChange}
                                      containerProps={{
                                        className: "!min-w-full",
                                      }}
                                      labelProps={{
                                        className: "hidden",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="flex gap-4 mt-5">
                                  <div className="w-full">
                                    <div className="w-full">
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-2 text-left font-medium"
                                      >
                                        Signos Vitales.
                                      </Typography>
                                      <Input
                                        type="text"
                                        color="blue"
                                        name="signosVitales"
                                        required
                                      ></Input>
                                    </div>
                                  </div>
                                  <div className="w-full">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="mb-2 text-left font-medium"
                                    >
                                      Hallazgos.
                                    </Typography>
                                    <Textarea
                                      color="blue"
                                      size="lg"
                                      placeholder="eg. Tablestas | Capsulas"
                                      name="hallazgos"
                                      required
                                      onChange={handleChange}
                                      containerProps={{
                                        className: "!min-w-full",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Typography
                              variant="small"
                              color="gray"
                              className="flex items-center justify-center gap-2 font-medium opacity-60"
                            >
                              <LockClosedIcon className="-mt-0.5 h-4 w-4" />{" "}
                              Modulo de Examen Fisico
                            </Typography>
                          </form>
                        </TabPanel>
                        <TabPanel value="Medicacion" className="p-0">
                          <form className="mt-8 flex flex-col gap-4">
                            <div
                              className="mt-1 flex flex-col gap-4"
                              onSubmit={handleChange}
                            >
                              <div className="my-1">
                                <div className="flex gap-4 mt-5">
                                  <div className="w-full">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="mb-3 text-left font-medium"
                                    >
                                      Evolucion Clinica
                                    </Typography>
                                    <Textarea
                                      color="blue"
                                      size="lg"
                                      placeholder="eg. Tablestas | Capsulas"
                                      name="descripcion"
                                      className="placeholder:opacity-100 focus:!border-t-blue-600"
                                      value=""
                                      required
                                      onChange={handleChange}
                                      containerProps={{
                                        className: "!min-w-full",
                                      }}
                                      labelProps={{
                                        className: "hidden",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="flex gap-4 mt-5">
                                  <div className="w-full">
                                    <Typography
                                      variant="lg"
                                      color="blue-gray"
                                      className="mb-3 text-left font-medium"
                                    >
                                      Medicamentos
                                    </Typography>
                                    <Input
                                      type="text"
                                      color="blue"
                                      name="busqueda"
                                      placeholder="buscar..."
                                    ></Input>
                                  </div>
                                </div>
                                <div className="flex gap-4 mt-5">
                                  <div className="w-full">
                                    <Input
                                      type="text"
                                      color="blue"
                                      name="nombre"
                                      label="Medicamento"
                                      value={"Paracetamol"}
                                      readOnly={true}
                                    ></Input>
                                  </div>
                                  <div className="w-full">
                                    <Input
                                      type="text"
                                      name="dosis"
                                      color="blue"
                                      label="Dosis"
                                      required
                                    ></Input>
                                  </div>
                                  <div className="w-full">
                                    <Input
                                      type="text"
                                      color="blue"
                                      name="indicaciones"
                                      label="Indicaciones"
                                      required
                                    ></Input>
                                  </div>
                                  <div className="w-full">
                                    <IconButton color="red">
                                      <i className="fa-solid fa-ban fa-x2"></i>
                                    </IconButton>
                                  </div>
                                </div>
                                <div className="flex gap-4 mt-5">
                                  <div className="w-full">
                                    <Input
                                      type="text"
                                      color="blue"
                                      name="nombre"
                                      label="Medicamento"
                                      value={"Clonazepam"}
                                      readOnly={true}
                                    ></Input>
                                  </div>
                                  <div className="w-full">
                                    <Input
                                      type="text"
                                      name="dosis"
                                      color="blue"
                                      label="Dosis"
                                      required
                                    ></Input>
                                  </div>
                                  <div className="w-full">
                                    <Input
                                      type="text"
                                      color="blue"
                                      name="indicaciones"
                                      label="Indicaciones"
                                      required
                                    ></Input>
                                  </div>
                                  <div className="w-full">
                                    <IconButton color="red">
                                      <i className="fa-solid fa-trash"></i>
                                    </IconButton>
                                  </div>
                                </div>
                                <div className="flex gap-4 mt-5">
                                  <div className="w-full">
                                    <Input
                                      type="text"
                                      color="blue"
                                      name="nombre"
                                      label="Medicamento"
                                      value={"Omeprazol"}
                                      readOnly={true}
                                    ></Input>
                                  </div>
                                  <div className="w-full">
                                    <Input
                                      type="text"
                                      name="dosis"
                                      color="blue"
                                      label="Dosis"
                                      required
                                    ></Input>
                                  </div>
                                  <div className="w-full">
                                    <Input
                                      type="text"
                                      color="blue"
                                      name="indicaciones"
                                      label="Indicaciones"
                                      required
                                    ></Input>
                                  </div>
                                  <div className="w-full">
                                    <IconButton color="red">
                                      <i className="fa-solid fa-ban fa-x2"></i>
                                    </IconButton>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Button size="lg" color="green">
                              Guardar
                            </Button>
                            <Typography
                              variant="small"
                              color="gray"
                              className="flex items-center justify-center gap-2 font-medium opacity-60"
                            >
                              <LockClosedIcon className="-mt-0.5 h-4 w-4" />{" "}
                              Modulo de Evolucion y Medicacion.
                            </Typography>
                          </form>
                        </TabPanel>
                      </TabsBody>
                    </Tabs>
                  </CardBody>
                </Card>
              </TabPanel>
            </CardBody>
          </TabsBody>
        </Tabs>
      </Card>
    </>
  );
}

export default Diagnostico;
