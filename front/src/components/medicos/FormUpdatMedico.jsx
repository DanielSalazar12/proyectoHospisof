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
import { useState, useEffect, useCallback } from "react";
import { especialidades } from "@/data";
import axios from "axios";
import Swal from "sweetalert2";
export default function FormUpdatMedico({
  dataForm,
  setRefresh,
  stateModal,
  urlApi,
}) {
  const [type, setType] = useState("Informacion");
  const [form, setForm] = useState(dataForm);
  const [imagen, setImagen] = useState(null);
  const [update, setUpdate] = useState([]);
  const [especialidad, setEspecialidad] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectEsp = (grupo) => {
    let data = especialidades.find((esp) => esp.grupo === grupo).especialidades;
    setEspecialidad(data);
  };
  const handleSelectChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    form.foto = file;

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagen(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datos = {
      id: form._id,
      nombre: form.nombreMedico,
      apellido: form.apellidoMedico,
      documento: form.documento,
      fechaNacimiento: form.fechaNacimiento,
      telefono: form.telefono,
      email: form.emailMedico,
      especialidad: form.especialidad,
      foto: form.foto,
    };
    handleEdit(datos);
    console.log("Formulario enviado");
  };

  const handleEdit = useCallback(
    async (data) => {
      if (typeof data === "object") {
        const { id, ...formUpdate } = data;
        const formData = new FormData();
        Object.entries(formUpdate).forEach(([key, value]) => {
          formData.append(key, value);
        });

        try {
          const response = await axios.put(
            urlApi + "update/" + data.id,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );
          if (response.data.estado === true) {
            setRefresh(true);
            stateModal(false);
            Swal.fire({
              title: "Actualizado",
              text: "El Medico se ha actualizado",
              icon: "success",
              showConfirmButton: false,
              timer: 1900,
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo actualizar el medico",
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
    [urlApi],
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
                  <div className="flex gap-4 m-t2">
                    <div className="w-full">
                      <Input
                        type="text"
                        name="nombreMedico"
                        color="blue"
                        required
                        value={form.nombreMedico}
                        label="Nombre"
                        onChange={handleChange}
                      ></Input>
                    </div>
                    <div className="w-full">
                      <Input
                        type="text"
                        size="lg"
                        color="blue"
                        name="apellidoMedico"
                        label="Apellido"
                        variant="outlined"
                        value={form.apellidoMedico}
                        required
                        onChange={handleChange}
                      ></Input>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-5">
                    <div className="w-full">
                      <Input
                        type="number"
                        color="blue"
                        name="documento"
                        label="Documento"
                        value={form.documento}
                        required
                        onChange={handleChange}
                      ></Input>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-5">
                    <div className="w-full">
                      <Input
                        min={0}
                        type="number"
                        color="blue"
                        name="telefono"
                        label="Telefono"
                        value={form.telefono}
                        required
                        onChange={handleChange}
                      ></Input>
                    </div>
                    <div className="w-full">
                      <Input
                        type="email"
                        name="emailMedico"
                        color="blue"
                        label="Email"
                        value={form.emailMedico}
                        required
                        onChange={handleChange}
                      ></Input>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-5">
                    <div className="w-full">
                      <Input
                        type="date"
                        name="fechaNacimiento"
                        color="blue"
                        label="Fecha Nacimiento"
                        value={form.fechaNacimiento}
                        required
                        onChange={handleChange}
                      ></Input>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-5">
                    <div className="w-full">
                      <Select
                        size="lg"
                        color="blue"
                        label="Especialidades"
                        variant="outlined"
                        required
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
                          Especialidades de apoyo y terapéutico
                        </Option>
                      </Select>
                    </div>
                    <div className="w-full">
                      <Select
                        size="lg"
                        color="blue"
                        name="especialidad"
                        label="Especialidad"
                        variant="outlined"
                        value={form.especialidad}
                        required
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
                      <Input
                        type="file"
                        name="foto"
                        size="lg"
                        label="Foto"
                        color="blue"
                        required
                        accept="image/.png, image/jpeg, image/jpg"
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
                                    {form.nombreMedico} {form.apellidoMedico}
                                  </Typography>
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      Documento:
                                    </span>{" "}
                                    {form.documento}
                                  </Typography>
                                </div>
                                <div className="border-t pt-2">
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      <i className="fa-solid fa-clipboard"></i>{" "}
                                      Telefono:
                                    </span>{" "}
                                    {form.telefono}
                                  </Typography>{" "}
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      <i className="fa-solid fa-clipboard"></i>{" "}
                                      Email:
                                    </span>{" "}
                                    {form.emailMedico}
                                  </Typography>
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      <i className="fa-solid fa-clipboard"></i>{" "}
                                      Especialidad:
                                    </span>{" "}
                                    {form.especialidad}
                                  </Typography>
                                </div>
                                <div className="border-t pt-2">
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      <i className="fa-solid fa-calendar-days"></i>{" "}
                                      Fecha Nacimiento:
                                    </span>{" "}
                                    {form.fechaNacimiento}
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
                Actualizar
              </Button>
            ) : null}
          </TabsBody>
        </Tabs>
      </form>
    </>
  );
}
