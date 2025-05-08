import { useState, useCallback } from "react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Input,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Textarea,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  ClipboardDocumentListIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

import axios from "axios";
import Swal from "sweetalert2";
import ListaMedicamentos from "./ListaMedicamentos";
import BuscadorMedicamento from "./BuscarMedicamento";

export default function FormDiagnostico({ dataPaciente }) {
  const urlApi = "http://127.0.0.1:3000/api/diagnostico/";
  const [type, setType] = useState("Informacion");
  const [medicamentos, setMedicamentos] = useState([]);
  const [propExamen, setPropiedaes] = useState({
    presionArterial: "",
    frecuenciaCardiaca: "",
    frecuenciaRespiratoria: "",
    temperatura: "",
    observaciones: "",
  });
  const [formulario, setFormulario] = useState({
    medicoId: "681a25e50db1d08e1f470876",
    pacienteId: "",
    fecha: "",
    motivoConsulta: "",
    diagPrincipal: "",
    diagSecundario: "",
    historia: "",
    examenFisico: [],
    evoClinica: "",
    medicamentos: [
      {
        _id: "",
        codigo: "",
        dosis: "",
        frecuencia: "",
        duracion: "",
        nombre: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeExam = (e) => {
    const { name, value } = e.target;
    setPropiedaes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const agregarMedicamento = (medicamento) => {
    if (!medicamentos.some((m) => m._id === medicamento.id)) {
      setMedicamentos([
        ...medicamentos,
        { ...medicamento, dosis: "", frecuencia: "" },
      ]);
    }
  };

  const eliminarMedicamento = (id) => {
    setMedicamentos(medicamentos.filter((m) => m._id !== id));
  };

  const actualizarMedicamento = (id, campo, valor) => {
    setMedicamentos(
      medicamentos.map((med) =>
        med._id === id ? { ...med, [campo]: valor } : med,
      ),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      fecha: formulario.fecha,
      medicoId: formulario.medicoId,
      pacienteId: dataPaciente._id,
      motivoConsulta: formulario.motivoConsulta,
      diagPrincipal: formulario.diagPrincipal,
      diagSecundario: formulario.diagSecundario,
      historia: formulario.historia,
      examenFisico: propExamen,
      evoClinica: formulario.evoClinica,
      medicamentos: medicamentos,
    };

    hanlseInsert(data);
  };

  const hanlseInsert = useCallback(
    async (data) => {
      if (typeof data === "object") {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          if (key === "medicamentos" && Array.isArray(value)) {
            // Iterar sobre cada medicamento y enviarlo como un array
            value.forEach((item, index) => {
              formData.append(`medicamentos[${index}]`, JSON.stringify(item));
            });
          } else if (key === "examenFisico" && typeof value === "object") {
            // Convertir `examenFisico` a JSON string
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });
        try {
          const response = await axios.post(urlApi + "create/", formData, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.data.estado === true) {
            Swal.fire({
              title: "Registrado",
              text: response.data.mensaje,
              icon: "success",
              showConfirmButton: false,
              timer: 1900,
            });
            setFormulario({
              medicoId: "",
              pacienteId: "",
              fecha: "",
              motivoConsulta: "",
              diagPrincipal: "",
              diagSecundario: "",
              historia: "",
              examenFisico: {},
              evoClinica: "",
              medicamentos: [
                {
                  _id: "",
                  codigo: "",
                  dosis: "",
                  frecuencia: "",
                  duracion: "",
                  nombre: "",
                },
              ],
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo Registrar el dianostico",
              icon: "error",
              showConfirmButton: false,
              timer: 1800,
            });
          }
        } catch (error) {
          Swal.fire("Error", "Ocurrió un problema", "error");
          console.error("Update error:", error);
        }
      } else {
        console.log("No es un Object :", data);
      }
    },
    [urlApi],
  );
  return (
    <>
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
          <form onSubmit={handleSubmit}>
            <Tabs value={type} className="overflow-visible">
              <TabsHeader className="relative z-0 ">
                <Tab value="Informacion" onClick={() => setType("Informacion")}>
                  Informacion
                </Tab>
                <Tab value="Examen" onClick={() => setType("Examen")}>
                  Examen Fisico
                </Tab>
                <Tab value="Medicacion" onClick={() => setType("Medicacion")}>
                  Medicacion
                </Tab>
              </TabsHeader>
              <TabsBody
                className="!overflow-x-hidden !overflow-y-visible"
                animate={{
                  initial: {
                    x: type === "Informacion" ? 400 : -400,
                  },
                  mount: {
                    x: 0,
                  },
                  unmount: {
                    x: type === "Informacion" ? 400 : -400,
                  },
                }}
              >
                <TabPanel value="Informacion" className="p-0">
                  <div className="mt-9 flex flex-col gap-4">
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
                              name="fecha"
                              value={formulario.fecha}
                              onChange={handleChange}
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
                              value={dataPaciente.nombrePaciente}
                              readOnly
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
                              value={dataPaciente.documento}
                              readOnly
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
                              name="motivoConsulta"
                              value={formulario.motivoConsulta}
                              onChange={handleChange}
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
                              value={formulario.diagPrincipal}
                              onChange={handleChange}
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
                              value={formulario.diagSecundario}
                              onChange={handleChange}
                              required
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
                      <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Modulo de
                      Informacion general.
                    </Typography>
                  </div>
                </TabPanel>
                <TabPanel value="Examen" className="p-0">
                  <div className="mt-8 flex flex-col gap-4">
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
                              placeholder="ej. Paciente refiere dolor epigástrico postprandial etc.."
                              name="historia"
                              className="placeholder:opacity-100 focus:!border-t-blue-600"
                              onChange={handleChange}
                              value={formulario.historia}
                              required
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
                                Presion Arterial.
                              </Typography>
                              <Input
                                type="text"
                                placeholder="ej. 120/80"
                                color="blue"
                                name="presionArterial"
                                value={propExamen.presionArterial}
                                onChange={handleChangeExam}
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
                              Frecuencia Cardiaca.
                            </Typography>
                            <Input
                              type="text"
                              color="blue"
                              placeholder="ej. 78"
                              name="frecuenciaCardiaca"
                              value={propExamen.frecuenciaCardiaca}
                              onChange={handleChangeExam}
                              required
                            ></Input>
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
                                Frecuencia Respiratoria.
                              </Typography>
                              <Input
                                type="text"
                                color="blue"
                                placeholder="ej. 16"
                                name="frecuenciaRespiratoria"
                                value={propExamen.frecuenciaRespiratoria}
                                onChange={handleChangeExam}
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
                              Temperatura.
                            </Typography>
                            <Input
                              type="text"
                              color="blue"
                              name="temperatura"
                              placeholder="ej. 38.6"
                              value={propExamen.temperatura}
                              onChange={handleChangeExam}
                              required
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
                              Observaciones.
                            </Typography>
                            <Textarea
                              color="blue"
                              size="lg"
                              placeholder="eg. Abdomen blando etc.."
                              name="observaciones"
                              value={propExamen.observaciones}
                              onChange={handleChangeExam}
                              required
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
                      <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Modulo de
                      Examen Fisico
                    </Typography>
                  </div>
                </TabPanel>
                <TabPanel value="Medicacion" className="p-0">
                  <div className="mt-8 flex flex-col gap-4">
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
                              name="evoClinica"
                              className="placeholder:opacity-100 focus:!border-t-blue-600"
                              value={formulario.evoClinica}
                              onChange={handleChange}
                              required
                              containerProps={{
                                className: "!min-w-full",
                              }}
                              labelProps={{
                                className: "hidden",
                              }}
                            />
                          </div>
                        </div>
                        <div className="gird-cols-1 mt-3 mb-8 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-1">
                          <div className="flex gap-4 mt-5">
                            <div className="relative w-full max-w-md">
                              <Tooltip
                                content="Buscar medicamento"
                                placement="right"
                              >
                                <BuscadorMedicamento
                                  onSeleccionar={agregarMedicamento}
                                />
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-3">
                          <div className="w-full">
                            <Card
                              className="w-ful"
                              floated={false}
                              shadow={false}
                            >
                              <CardHeader
                                color="blue-gray"
                                className="m-0 grid place-items-center px-4 py-5 text-center"
                              >
                                {" "}
                                <Typography variant="h5" color="white">
                                  Medicamentos Recetados
                                </Typography>
                              </CardHeader>
                              <CardBody className="border">
                                <ListaMedicamentos
                                  medicamentos={medicamentos}
                                  onEliminar={eliminarMedicamento}
                                  onActualizar={actualizarMedicamento}
                                />
                              </CardBody>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button size="lg" color="green" type="submit">
                      Guardar
                    </Button>
                    <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center justify-center gap-2 font-medium opacity-60"
                    >
                      <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Modulo de
                      Evolucion y Medicacion.
                    </Typography>
                  </div>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </form>
        </CardBody>
      </Card>
    </>
  );
}
