import {
  Card,
  CardHeader,
  Input,
  Option,
  Select,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  CardFooter,
  IconButton,
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogBody,
  Textarea,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useMedicamentosData } from "@/hooks/useMedicamentosData";

export function Medicamentos() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const medicamentosList = useMedicamentosData();
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Registrar Medicamento
      </Button>

      <Dialog open={open} size="lg" handler={handleOpen}>
        <DialogHeader>Registro de Medicamento</DialogHeader>
        <DialogBody>
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
              placeholder="eg. White Shoes"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Category
            </Typography>
            <Select
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
              placeholder="1"
              labelProps={{
                className: "hidden",
              }}
            >
              <Option>Clothing</Option>
              <Option>Fashion</Option>
              <Option>Watches</Option>
            </Select>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Weight
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="eg. <8.8oz | 250g"
                name="weight"
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
                Size
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="eg. US 8"
                name="size"
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
          <div className="flex grap-4">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Description (Optional)
              </Typography>
              <Textarea
                rows={7}
                placeholder="eg. This is a white shoes with a comfortable sole."
                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
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
                Description (Optional)
              </Typography>
              <Textarea
                rows={7}
                placeholder="eg. This is a white shoes with a comfortable sole."
                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
          </div>
          <div></div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-10">
        {medicamentosList.map((medicamento) => (
          <Card className="w-96 shadow-lg" key={medicamento.codigo}>
            <CardHeader floated={false} className="h-60 overflow-hidden">
              <img
                src=""
                alt={`img-medicamento ${medicamento.nombre}`}
                className="h-full w-full object-cover"
              />
            </CardHeader>

            <CardBody className="px-4 pt-4 pb-2 space-y-3 text-gray-700">
              <div>
                <Typography
                  variant="h6"
                  className="text-lg font-bold text-blue-800"
                >
                  {medicamento.nombre}
                </Typography>
                <Typography className="text-sm">
                  <span className="font-semibold">Código:</span>{" "}
                  {medicamento.codigo}
                </Typography>
              </div>
              <div className="border-t pt-2">
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i class="fa-solid fa-syringe"></i> Administración:
                  </span>{" "}
                  {medicamento.administracion}
                </Typography>
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i class="fa-solid fa-prescription-bottle"></i>{" "}
                    Presentación:
                  </span>{" "}
                  {medicamento.presentacion}
                </Typography>
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i class="fa-solid fa-clipboard"></i> Descripción:
                  </span>{" "}
                  {medicamento.descripcion}
                </Typography>
              </div>
              <div className="border-t pt-2">
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i class="fa-solid fa-calendar-days"></i> Vencimiento:
                  </span>{" "}
                  {medicamento.vencimiento}
                </Typography>
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i class="fa-solid fa-box-archive"></i> Stock:
                  </span>{" "}
                  <span
                    className={`font-bold px-2 py-1 rounded ${
                      medicamento.stock < 10
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {medicamento.stock}
                  </span>
                </Typography>
              </div>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
              <Tooltip content="Edit" placement="top">
                <IconButton color="amber" className="rounded-full">
                  {" "}
                  <i class="fa-regular fa-pen-to-square"></i>
                </IconButton>
              </Tooltip>
              <Tooltip content="Ver">
                <IconButton color="blue" className="rounded-full">
                  {" "}
                  <i class="fa-regular fa-eye"></i>
                </IconButton>
              </Tooltip>
              <Tooltip content="Eliminar">
                <IconButton color="red" className="rounded-full">
                  {" "}
                  <i class="fa-regular fa-trash-can"></i>
                </IconButton>
              </Tooltip>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Medicamentos;
