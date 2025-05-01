import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState, useCallback } from "react";
import { especialidades } from "@/data";
import Swal from "sweetalert2";
import axios from "axios";
const FormMedico = ({ setRefresh, urlApi }) => {
  const [imagen, setImagen] = useState(null);
  const [type, setType] = useState("Informacion");
  const [especialidad, setEspecialidad] = useState([]);
  const [formulario, setFormData] = useState({
    nombre: "",
    apellido: "",
    documento: 0,
    fechaNacimiento: "",
    email: "",
    telefono: "",
    especialidad: "",
    foto: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectEsp = (grupo) => {
    let data = especialidades.find((esp) => esp.grupo === grupo).especialidades;
    setEspecialidad(data);
  };
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    formulario.foto = file;

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagen(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", formulario.nombre);
    formData.append("apellido", formulario.apellido);
    formData.append("documento", formulario.documento);
    formData.append("fechaNacimiento", formulario.fechaNacimiento);
    formData.append("telefono", formulario.telefono);
    formData.append("email", formulario.email);
    formData.append("especialidad", formulario.especialidad);
    formData.append("foto", formulario.foto);

    hanlseInsert(formData);
    console.log("Formulario enviado");
  };
  const hanlseInsert = useCallback(
    async (data) => {
      if (typeof data === "object") {
        try {
          const response = await axios.post(urlApi + "create/", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.data.estado === true) {
            setRefresh(true);
            Swal.fire({
              title: "Registrado",
              text: response.data.mensaje,
              icon: "success",
              showConfirmButton: false,
              timer: 1700,
            });
            setFormData({
              nombre: "",
              apellido: "",
              documento: 0,
              fechaNacimiento: "",
              email: "",
              telefono: "",
              especialidad: "",
              foto: "",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo Registrar el medico",
              icon: "error",
              showConfirmButton: false,
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
    [setRefresh, urlApi],
  );
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Tabs value={type} className="overflow-visible">
          <TabsHeader className="relative z-0">
            <Tab
              value="Informacion"
              className="mt-2"
              onClick={() => setType("Informacion")}
            >
              Informacion
            </Tab>
            <Tab value="Foto" onClick={() => setType("Foto")}>
              Foto
            </Tab>
          </TabsHeader>
          <TabsBody
            className="!overflow-x-hidden !overflow-y-visible"
            animate={{
              initial: { x: type === "Informacion" ? 400 : -400 },
              mount: {
                x: 0,
              },
              unmount: {
                x: type === "Informacion" ? 400 : -400,
              },
            }}
          >
            <TabPanel value="Informacion" className="p-2">
              <div className="mt-1 flex flex-col gap-4" onSubmit={handleChange}>
                <div className="my-1">
                  <div className="flex gap-4">
                    <div className="w-full">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Nombre
                      </Typography>

                      <Input
                        type="text"
                        name="nombre"
                        value={formulario.nombre}
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={handleChange}
                      ></Input>
                    </div>
                    <div className="w-full">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Apellido
                      </Typography>

                      <Input
                        type="text"
                        name="apellido"
                        value={formulario.apellido}
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={handleChange}
                      ></Input>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <div className="w-full">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Documento
                      </Typography>

                      <Input
                        type="number"
                        name="documento"
                        value={formulario.documento}
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={handleChange}
                      ></Input>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <div className="w-full">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Telefono
                      </Typography>

                      <Input
                        min={0}
                        type="number"
                        name="telefono"
                        value={formulario.telefono}
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={handleChange}
                      ></Input>
                    </div>
                    <div className="w-full">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Email
                      </Typography>

                      <Input
                        type="email"
                        name="email"
                        value={formulario.email}
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={handleChange}
                      ></Input>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <div className="w-full">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Fecha Nacimiento
                      </Typography>

                      <Input
                        type="date"
                        name="fechaNacimiento"
                        value={formulario.fechaNacimiento}
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={handleChange}
                      ></Input>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <div className="w-full">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Especialidades
                      </Typography>
                      <Select
                        size="lg"
                        color="blue"
                        variant="outlined"
                        className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-dark-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                        animate={{
                          mount: { y: 0 },
                          unmount: { y: 25 },
                        }}
                        onChange={(option) => handleSelectEsp(option)}
                      >
                        <Option value="clínicas">
                          Especialidades clínicas
                        </Option>
                        <Option value="quirúrgicas">
                          Especialidades quirúrgicas
                        </Option>
                        <Option value="apoyo">
                          Especialidades de apoyo diagnóstico y terapéutico
                        </Option>
                      </Select>
                    </div>
                    <div className="w-full">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Especialidad
                      </Typography>
                      <Select
                        size="lg"
                        color="blue"
                        name="especialidad"
                        variant="outlined"
                        value={formulario.especialidad}
                        className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-dark-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                        animate={{
                          mount: { y: 0 },
                          unmount: { y: 25 },
                        }}
                        onChange={(option) =>
                          handleSelectChange("especialidad", option)
                        }
                      >
                        {Array.isArray(especialidad) &&
                        especialidad.length > 0 ? (
                          especialidad.map((espe) => (
                            <Option key={espe.value} value={espe.value}>
                              {espe.nombre}
                            </Option>
                          ))
                        ) : (
                          <Option disabled>
                            No hay especialidades disponibles
                          </Option>
                        )}
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="Foto" className="p-2">
              <div className="mt-7 flex flex-col gap-4">
                {" "}
                <div className="my-1">
                  <div className="flex gap-4">
                    <div className="w-ful">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 text-left font-medium"
                      >
                        Imagen
                      </Typography>
                      <Input
                        type="file"
                        name="foto"
                        accept="image/.png, image/jpeg, image/jpg"
                        className="placeholder:opacity-100 focus:!border-t-gray-900  "
                        icon={<i className="fa-solid fa-image text-gray-500" />}
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-9">
                    <div className="w-full">
                      {imagen && (
                        <>
                          <div className="w-full">
                            {" "}
                            <Card
                              shadow={false}
                              className="flex flex-row w-full max-w-4xl h-64 overflow-hidden rounded-lg bg-white shadow-md"
                            >
                              <div
                                className="w-1/2 h-full bg-cover bg-center transition-all duration-500 ease-in-out"
                                style={{
                                  backgroundImage: `url(${imagen})`,
                                }}
                              >
                                <div className="h-full w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                              </div>
                              <div className="w-1/2 p-4 flex flex-col justify-between">
                                <div>
                                  <Typography
                                    variant="h6"
                                    className="text-lg font-bold text-blue-800"
                                  >
                                    {formulario.nombre} {formulario.apellido}
                                  </Typography>
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      Documento:
                                    </span>{" "}
                                    {formulario.documento}
                                  </Typography>
                                </div>
                                <div className="border-t pt-2">
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      <i className="fa-solid fa-clipboard"></i>{" "}
                                      Telefono:
                                    </span>{" "}
                                    {formulario.telefono}
                                  </Typography>{" "}
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      <i className="fa-solid fa-clipboard"></i>{" "}
                                      Email:
                                    </span>{" "}
                                    {formulario.email}
                                  </Typography>
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      <i className="fa-solid fa-clipboard"></i>{" "}
                                      Especialidad:
                                    </span>{" "}
                                    {formulario.especialidad}
                                  </Typography>
                                </div>
                                <div className="border-t pt-2">
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      <i className="fa-solid fa-calendar-days"></i>{" "}
                                      Fecha Nacimiento:
                                    </span>{" "}
                                    {formulario.fechaNacimiento}
                                  </Typography>
                                </div>
                              </div>
                            </Card>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            {type === "Foto" ? (
              <Button color="green" type="submit" fullWidth>
                Registrar
              </Button>
            ) : null}
          </TabsBody>
        </Tabs>
      </form>
    </>
  );
};

export default FormMedico;
