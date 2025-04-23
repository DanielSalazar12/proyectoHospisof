import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { CreditCardIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
export default function FormUpdaMedicamento({
  dataForm,
  setFormulario,
  setStateOrder,
}) {
  const [type, setType] = useState("general");
  const [form, setForm] = useState(dataForm);
  const [imagen, setImagen] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelectChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const generarCodigo = () => {
    return `${form.nombre
      .substring(0, 3)
      .toUpperCase()}${form.concentracion.substring(
      0,
      2,
    )}-${form.formaFarmaceutica.substring(0, 3).toUpperCase()}`;
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    form.img = file;

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
      nombre: form.nombre,
      codigo: generarCodigo(),
      presentacion: form.presentacion,
      descripcion: form.descripcion,
      concentracion: form.concentracion,
      formaFarma: form.formaFarmaceutica,
      administracion: form.viaAdminist,
      envase: form.uniEnvase,
      medida: form.uniMedida,
      stock: form.stockDisponible,
      vencimiento: form.fechaVencimiento,
      prCompra: form.precioCompra,
      prVenta: form.precioVenta,
      img: form.img,
    };

    /*   const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("codigo", generarCodigo());
    formData.append("presentacion", form.presentacion);
    formData.append("descripcion", form.descripcion);
    formData.append("concentracion", form.concentracion);
    formData.append("formaFarma", form.formaFarmaceutica);
    formData.append("administracion", form.viaAdminist);
    formData.append("envase", form.uniEnvase);
    formData.append("medida", form.uniMedida);
    formData.append("stock", form.stockDisponible);
    formData.append("vencimiento", form.vencimiento);
    formData.append("prCompra", form.prCompra);
    formData.append("prVenta", form.precioVenta);
    formData.append("img", form.img); */
    console.log("Formulario enviado");
    setFormulario(datos);
    setStateOrder(true);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-4 py-8 text-center"
        >
          <div className="mb-4 h-10 p-6 text-white">
            {type === "general" ? (
              <i className="fa-solid fa-briefcase-medical fa-2x"></i>
            ) : (
              <CreditCardIcon className="h-10 w-10 text-white" />
            )}
          </div>
          <Typography variant="h5" color="white">
            Actualizacion Medicamento
          </Typography>
        </CardHeader>
        <CardBody>
          <Tabs value={type} className="overflow-visible">
            <TabsHeader className="relative z-0 ">
              <Tab value="general" onClick={() => setType("general")}>
                General
              </Tab>
              <Tab value="detalle" onClick={() => setType("detalle")}>
                Detalles
              </Tab>
              <Tab value="foto" onClick={() => setType("foto")}>
                Foto o Imagen
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden !overflow-y-visible"
              animate={{
                initial: {
                  x: type === "card" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "card" ? 400 : -400,
                },
              }}
            >
              <TabPanel value="general" className="p-0">
                <div
                  className="mt-7 flex flex-col gap-4"
                  onSubmit={handleChange}
                >
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Nombre
                    </Typography>
                    <Input
                      type="text"
                      placeholder="eg. Paracetamol"
                      value={form.nombre}
                      name="nombre"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      onChange={handleChange}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>

                  <div className="my-1">
                    <div className="flex gap-4 mt-1">
                      <div className="w-full">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Administracion
                        </Typography>
                        <Select
                          className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                          name="administracion"
                          value={form.viaAdminist}
                          onChange={(option) =>
                            handleSelectChange("administracion", option)
                          }
                          labelProps={{
                            className: "hidden",
                          }}
                        >
                          <Option value="oral">Oral</Option>
                          <Option value="intravenosa">Intravenosa</Option>
                          <Option value="intramuscular">Intramuscular</Option>
                          <Option value="subcutanea">Subcutánea</Option>
                          <Option value="inhalatoria">Inhalatoria</Option>
                          <Option value="trasndermica">Transdérmica</Option>
                          <Option value="rectal">Rectal</Option>
                          <Option value="ocular">Ocular</Option>
                          <Option value="intranasal">Intranasal</Option>
                          <Option value="intratecal">Intratecal</Option>
                          <Option value="sublingual"> Sublingual</Option>
                          <Option value="topica">Tópica</Option>
                          <Option value="vaginal">Vaginal</Option>
                          <Option value="auricular">Auricular</Option>
                        </Select>
                      </div>
                      <div className="w-full">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Presentación
                        </Typography>
                        <Select
                          className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                          placeholder="1"
                          name="presentacion"
                          value={form.presentacion}
                          onChange={(option) =>
                            handleSelectChange("presentacion", option)
                          }
                        >
                          <Option value="tabletas">Tabletas</Option>
                          <Option value="aerosol"> Aerosol</Option>
                          <Option value="bolsa">Bolsa</Option>
                          <Option value="capsulas">Cápsulas</Option>
                          <Option value="mililitros">Mililitros (mL)</Option>
                          <Option value="gramos">Gramos (g)</Option>
                          <Option value="unidades">Unidades </Option>
                          <Option value="dosis">Dosis</Option>
                          <Option value="aplicaciones">Aplicaciones</Option>
                          <Option value="frascos">Frascos</Option>
                          <Option value="ampollas">Ampollas</Option>
                          <Option value="sobres">Sobres</Option>
                          <Option value="jeringas">Jeringas</Option>
                          <Option value="viales">Viales</Option>
                          <Option value="parches">Parches</Option>
                          <Option value="goteros">Goteros</Option>
                          <Option value="suspensiones">Suspensiones</Option>
                          <Option value="colitios">Colirios</Option>
                          <Option value="inhaladores">Inhaladores</Option>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <div className="w-full">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Medida
                        </Typography>

                        <Select
                          name="uniMedida"
                          value={form.uniMedida}
                          onChange={(option) =>
                            handleSelectChange("medida", option)
                          }
                          className="!w-full !border-[1.5px] !border-blue-gray-200/90 bg-white text-gray-800 focus:!border-primary"
                        >
                          {/* Unidades de masa */}
                          <Option value="mcg">mcg</Option>
                          <Option value="mg">mg</Option>
                          <Option value="g">g</Option>
                          <Option value="kg">kg</Option>
                          {/* Unidades de volumen */}
                          <Option value="mL">mL</Option>
                          <Option value="L">L</Option>
                          <Option value="cm³">cm³</Option>
                          {/* Unidades internacionales */}
                          <Option value="UI">UI</Option>
                          {/* Formas farmacéuticas */}
                          <Option value="ampollas">ampolla(s)</Option>
                          <Option value="tabletas">tableta(s)</Option>
                          <Option value="capsulas">cápsula(s)</Option>
                          <Option value="gotas">gota(s)</Option>
                          <Option value="inyeccicones">inyección(es)</Option>
                          <Option value="supositorios">supositorio(s)</Option>
                          <Option value="jeringas">jeringa(s)</Option>
                          <Option value="dosis">dosis</Option>
                          <Option value="uindades">unidad(es)</Option>
                          <Option value="aplicaciones">aplicación(es)</Option>
                          <Option value="puff">puff</Option>
                        </Select>
                      </div>
                      <div className="w-full">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Forma Farmaceutica
                        </Typography>
                        <Select
                          className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                          name="formaFarmaceutica"
                          value={form.formaFarmaceutica}
                          onChange={(option) =>
                            handleSelectChange("formaFarmaceutica", option)
                          }
                        >
                          <Option value="tableta">Tableta</Option>
                          <Option value="capsulas">Cápsula</Option>
                          <Option value="solida">Solida</Option>
                          <Option value="solucion oral">Solución Oral</Option>
                          <Option value="jarabe">Jarabe</Option>
                          <Option value="inyectable">Inyectable</Option>
                          <Option value="suspension">Suspensión</Option>
                          <Option value="crema">Crema</Option>
                          <Option value="unguento">Ungüento</Option>
                          <Option value="gel">Gel</Option>
                          <Option value="polvo">Polvo</Option>
                          <Option value="supositorio">Supositorio</Option>
                          <Option value="aerosol">Aerosol</Option>
                          <Option value="parche trasndermico">
                            Parche transdérmico
                          </Option>
                          <Option value="colirio">Colirio</Option>
                          <Option value="emulsion">Emulsión</Option>
                          <Option value="espuma">Espuma</Option>
                          <Option value="implante">Implante</Option>
                          <Option value="locion">Locion</Option>
                          <Option value="gotas">Gotas</Option>
                          <Option value="ovulo">Óvulo</Option>
                          <Option value="granulado">Granulado</Option>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <div className="w-full">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Descripcion
                        </Typography>
                        <Textarea
                          color="gray"
                          size="lg"
                          placeholder="eg. Tablestas | Capsulas"
                          name="descripcion"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          value={form.descripcion}
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
              </TabPanel>
              <TabPanel value="detalle" className="p-0">
                <div className="mt-7 flex flex-col gap-4">
                  <div className="my-3">
                    <div className="flex gap-4 mt-2">
                      <div className="w-full">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Concentracion
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="eg. <8.8oz | 250g"
                          name="concentracion"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          value={form.concentracion}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="w-full">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Envase
                        </Typography>
                        <Select
                          className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-dark-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                          placeholder="1"
                          name="envase"
                          value={form.uniEnvase}
                          onChange={(option) =>
                            handleSelectChange("uniEnvase", option)
                          }
                        >
                          <Option value="caja">Caja</Option>
                          <Option value="blister">Blíster</Option>
                          <Option value="frasco">Frasco</Option>
                          <Option value="inhalador">Inhalador</Option>
                          <Option value="ampolla">Ampolla</Option>
                          <Option value="bolsa">Bolsa</Option>
                          <Option value="tubo">Tubo</Option>
                          <Option value="sobre">Sobre</Option>
                          <Option value="jeringa">Jeringa prellenada</Option>
                          <Option value="vial">Vial</Option>
                          <Option value="goteros">Goteros</Option>
                          <Option value="dispensador">Dispensador</Option>
                          <Option value="cartucho">Cartucho</Option>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <div className="w-full">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Precio Compra
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          type="number"
                          placeholder="$0.00"
                          icon={
                            <i className="fa-solid fa-dollar-sign text-gray-500" />
                          }
                          name="precioCompra"
                          value={form.precioCompra}
                          onChange={handleChange}
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                        />
                      </div>
                      <div className="w-full">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Precio Venta
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="$0.00"
                          icon={
                            <i className="fa-solid fa-dollar-sign text-gray-500" />
                          }
                          name="precioVenta"
                          value={form.precioVenta}
                          onChange={handleChange}
                          type="number"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <div className="w-full">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Stock
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          type="number"
                          placeholder="eg. 12 | 24 | 30"
                          name="stockDisponible"
                          value={form.stockDisponible}
                          onChange={handleChange}
                          icon={<i className="fa-solid fa-box text-gray-500" />}
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                        />
                      </div>
                      <div className="w-full">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Fecha Vencimiento
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="$0.00"
                          name="fechaVencimiento"
                          onChange={handleChange}
                          type="date"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="foto" className="p-0">
                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex gap-4 mt-4">
                    <div className="w-full">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 text-left font-medium"
                      >
                        Imagen
                      </Typography>
                      <Input
                        type="file"
                        name="img"
                        accept="image/.png, image/jpeg, image/jpg"
                        className="placeholder:opacity-100 focus:!border-t-gray-900  "
                        icon={<i className="fa-solid fa-image text-gray-500" />}
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
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
                                    {form.nombre}
                                  </Typography>
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      Código:
                                    </span>{" "}
                                    {generarCodigo()}
                                  </Typography>
                                </div>
                                <div className="border-t pt-2">
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      <i className="fa-solid fa-syringe"></i>{" "}
                                      Administración:
                                    </span>{" "}
                                    {form.viaAdminist}
                                  </Typography>
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      <i className="fa-solid fa-prescription-bottle"></i>{" "}
                                      Presentación:
                                    </span>{" "}
                                    {form.presentacion}
                                  </Typography>
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      <i className="fa-solid fa-clipboard"></i>{" "}
                                      Descripción:
                                    </span>{" "}
                                    {form.descripcion}
                                  </Typography>
                                </div>
                                <div className="border-t pt-2">
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      <i className="fa-solid fa-calendar-days"></i>{" "}
                                      Vencimiento:
                                    </span>{" "}
                                    {form.fechaVencimiento}
                                  </Typography>
                                  <Typography className="text-sm">
                                    <span className="font-semibold">
                                      <i className="fa-solid fa-box-archive"></i>{" "}
                                      Stock:
                                    </span>{" "}
                                    <span
                                      className={`font-bold px-2 py-1 rounded ${
                                        form.stockDisponible < 10
                                          ? "bg-red-100 text-red-600"
                                          : "bg-green-100 text-green-700"
                                      }`}
                                    >
                                      {form.stockDisponible}
                                    </span>
                                  </Typography>
                                </div>
                              </div>
                              {/* Información adicional */}
                            </Card>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="my-1">
                  <Button
                    size="lg"
                    color="light-blue"
                    type="submit"
                    className=""
                  >
                    Actualizar
                  </Button>
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </form>
  );
}
