import {
  Input,
  Option,
  Select,
  Typography,
  Textarea,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ImagePreview from "./ImagenPreview";
import { useFormMedicamento } from "@/hooks/useFormMedicamento";

const FormMedicamento = ({ activeStep }) => {
  const [frmData, setFormData] = useState({
    nombre: "",
    administracion: "",
    img: "",
    presentacion: "",
    medida: "",
    formaFarma: "",
    descripcion: "",
    concentracion: "",
    envase: "",
    prCompra: 0,
    prVenta: 0,
    stock: 0,
    vencimiento: "",
  });
  const [imagen, setImagen] = useState(null);

  const [medicamentoCreado, setMedicamentoCreado] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generarCodigo = () => {
    return `${frmData.nombre
      .substring(0, 3)
      .toUpperCase()}${frmData.concentracion.substring(
      0,
      2,
    )}-${frmData.formaFarma.substring(0, 3).toUpperCase()}`;
  };

  const { medicamento } = useFormMedicamento(medicamentoCreado);

  useEffect(() => {
    if (medicamento) {
      console.log("Medicamento creado:", medicamento);
    }
  }, [medicamento]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nombre: frmData.nombre,
      codigo: generarCodigo(),
      presentacion: frmData.presentacion,
      descripcion: frmData.descripcion,
      concentracion: frmData.concentracion,
      formaFarma: frmData.formaFarma,
      administracion: frmData.administracion,
      envase: frmData.envase,
      medida: frmData.medida,
      stock: parseInt(frmData.stock, 10),
      vencimiento: frmData.vencimiento,
      prCompra: parseFloat(frmData.prCompra),
      prVenta: parseFloat(frmData.prVenta),
      img: imagen,
    };

    setMedicamentoCreado(data);
    console.log("Formulario enviado");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {activeStep === 0 && (
          <>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Nombre
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="eg. Paracetamol"
                name="nombre"
                value={frmData.nombre}
                onChange={handleChange}
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div className="flex gap-4 mt-4">
              <div className="w-full ">
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
                  value={frmData.administracion}
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
                  className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-gray"
                  placeholder="1"
                  name="presentacion"
                  value={frmData.presentacion}
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
                  name="medida"
                  value={frmData.medida}
                  onChange={(option) => handleSelectChange("medida", option)}
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
                  name="formaFarma"
                  value={frmData.formaFarma}
                  onChange={(option) =>
                    handleSelectChange("formaFarma", option)
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
                  value={frmData.descripcion}
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
          </>
        )}
        {activeStep === 1 && (
          <>
            <div className="flex gap-4 mt-4">
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
                  value={frmData.concentracion}
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
                  value={frmData.envase}
                  onChange={(option) => handleSelectChange("envase", option)}
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
            <div className="flex gap-4 mt-4">
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
                  icon={<i className="fa-solid fa-dollar-sign text-gray-500" />}
                  name="prCompra"
                  value={frmData.prCompra}
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
                  icon={<i className="fa-solid fa-dollar-sign text-gray-500" />}
                  name="prVenta"
                  value={frmData.prVenta}
                  onChange={handleChange}
                  type="number"
                  className="placeholder:opacity-100 focus:!border-t-gray-900"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
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
                  name="stock"
                  value={frmData.stock}
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
                  name="vencimiento"
                  value={frmData.vencimiento}
                  onChange={handleChange}
                  type="date"
                  className="placeholder:opacity-100 focus:!border-t-gray-900"
                />
              </div>
            </div>
          </>
        )}
        {activeStep === 2 && (
          <>
            <div className="flex gap-4 mt-4">
              <ImagePreview imagen={imagen} setImagen={setImagen} />
            </div>
            <div className="flex gap-4 mt-4">
              <div className="w-full">
                <Button color="green" type="submit">
                  Guardar
                </Button>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default FormMedicamento;
