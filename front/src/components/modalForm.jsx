import {
  ArchiveBoxIcon,
  ClipboardIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import {
  Input,
  Option,
  Select,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogBody,
  Textarea,
  Stepper,
  Step,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ImagePreview from "./ImagenPreview";

const ModalForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Ingresar Medicamento
      </Button>

      <Dialog open={open} size="lg" handler={handleOpen}>
        <DialogHeader>Registro Medicamento</DialogHeader>
        <DialogBody>
          <div className="w-full py-4 px-8">
            <Stepper
              activeStep={activeStep}
              className="w-full"
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
                <PhotoIcon className="h-5 w-5 text-blue-gray" />{" "}
              </Step>
            </Stepper>
          </div>
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
                    placeholder="Seleccionar administracion"
                    labelProps={{
                      className: "hidden",
                    }}
                  >
                    <Option>Oral</Option>
                    <Option>Intravenosa</Option>
                    <Option>Intramuscular</Option>
                    <Option>Subcutánea</Option>
                    <Option>Inhalatoria</Option>
                    <Option>Transdérmica</Option>
                    <Option>Rectal</Option>
                    <Option>Ocular</Option>
                    <Option>Intranasal</Option>
                    <Option>Intratecal</Option>
                    <Option>Subcutánea</Option>
                    <Option>Sublingual</Option>
                  </Select>
                </div>
                <div className="w-full">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                  >
                    Medida
                  </Typography>
                  <Select
                    className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                    placeholder="1"
                    labelProps={{
                      className: "hidden",
                    }}
                  >
                    <Option>Tabletas</Option>
                    <Option>Capsulas</Option>
                    <Option>Mililitros (mL)</Option>
                    <Option>Gramos (g)</Option>
                    <Option>Unidades </Option>
                    <Option>Dosis</Option>
                    <Option>Aplicaciones</Option>
                    <Option>Frascos</Option>
                    <Option>Ampollas</Option>
                    <Option>Sobres</Option>
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
                    Presentacion
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    placeholder="eg. Tablestas | Capsulas"
                    name="presentacion"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
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
                    placeholder="1"
                    labelProps={{
                      className: "hidden",
                    }}
                  >
                    <Option>Tableta</Option>
                    <Option>Capsula</Option>
                    <Option>Solucion Oral</Option>
                    <Option>Jarabe</Option>
                    <Option>Inyectable</Option>
                    <Option>Suspensión</Option>
                    <Option>Crema</Option>
                    <Option>Unguento</Option>
                    <Option>Gel</Option>
                    <Option>Polvo</Option>
                    <Option>Supositorio</Option>
                    <Option>Aerosol</Option>
                    <Option>Parche transdérmico</Option>
                    <Option>Colirio</Option>
                    <Option>Emulsión</Option>
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
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
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
                    label="Seleccionar envase"
                    labelProps={{
                      className: "hidden",
                    }}
                  >
                    <Option>Caja</Option>
                    <Option>Blíster</Option>
                    <Option>Frasco</Option>
                    <Option>Ampolla</Option>
                    <Option>Bolsa</Option>
                    <Option>Tubo</Option>
                    <Option>Sobre</Option>
                    <Option>Jeringa prellenada</Option>
                    <Option>Vial</Option>
                    <Option>Goteros</Option>
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
                    icon={
                      <i className="fa-solid fa-dollar-sign text-gray-500" />
                    }
                    name="stock"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
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
                    name="precio"
                    type="number"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
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
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
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
                    name="precio"
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
                <ImagePreview />
              </div>
            </>
          )}
        </DialogBody>
        <DialogFooter className="mt-10 flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          <Button onClick={handleNext} disabled={isLastStep}>
            Next
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalForm;
