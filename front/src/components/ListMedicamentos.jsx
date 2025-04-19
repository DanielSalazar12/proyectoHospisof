import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
  CardFooter,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  Button,
  MenuItem,
} from "@material-tailwind/react";
import { useApi } from "@/hooks/useApiMedicamentos";

const ListMedicamentos = () => {
  const { data, loading, error, fetchMedicamentos } = useApi();
  const [open, setOpen] = useState(false);
  const [detalles, setDetalle] = useState([]);
  const handleEdit = () => {
    Swal.fire({
      title: "Editar Medicamento",
      text: "Aquí va el formulario de edición",
      icon: "info",
      showConfirmButton: false,
    });
  };

  
  const handleOpen = (codigo) => {
    let info = data.filter((medicamento) => medicamento.codigo === codigo);
    setDetalle(info);
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
    setDetalle([]);
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Está seguro de que desea eliminar este medicamento?",
      text: "No podrá revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("eliminar id: " + id);
        fetchMedicamentos({
          url: `http://127.0.0.1:3000/api/medicamentos/delet`,
          method: "POST",
          body: { id },
        });
        Swal.fire({
          title: "Eliminado",
          text: "El medicamento ha sido eliminado",
          icon: "success",
          showConfirmButton: false,
          timer: 1700,
        });
      }
    });
  };
  useEffect(() => {
    fetchMedicamentos({ url: "http://127.0.0.1:3000/api/medicamentos/list" });
  }, [fetchMedicamentos]);

  return (
    <>
      {detalles.map((detalle) => (
        <Dialog
          open={open}
          size="sm"
          handler={handleClose}
          key={detalle.codigo}
        >
          <DialogHeader>Informacion General</DialogHeader>
          <DialogBody divider className="flex flex-col gap-4">
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Código:</span> {detalle.codigo}
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Nombre:</span> {detalle.nombre}
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Descripción:</span>{" "}
              {detalle.descripcion}
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Concentración:</span>{" "}
              {detalle.concentracion}
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Vía de Administración:</span>{" "}
              {detalle.viaAdminist}
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Presentación:</span>{" "}
              {detalle.presentacion}
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Fecha de Vencimiento:</span>{" "}
              {detalle.fechaVencimiento}
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Stock Disponible:</span>{" "}
              <span className="font-bold px-2 py-1 rounded bg-green-100 text-green-700">
                {detalle.stockDisponible}
              </span>
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Precio: </span>$
              {detalle.precioVenta}
            </Typography>
          </DialogBody>
        </Dialog>
      ))}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 mt-2">
        <div className="flex gap-4 mt-4">
          <div className="w-full">
            <Input label="Buscar"></Input>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="w-full">
            <div className="mb-3 flex gap-3">
              <Tooltip content="Filtrar" placement="top">
                <Menu placement="right">
                  <MenuHandler>
                    <IconButton color="amber">
                      {" "}
                      <i class="fa-solid fa-filter"></i>
                    </IconButton>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>
                      <i class="fa-solid fa-arrow-up-a-z"></i>
                    </MenuItem>
                    <MenuItem>
                      <i class=""></i>
                      <i class="fa-solid fa-arrow-down-z-a"></i>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-11">
        {data.map((medicamento) => (
          <Card className="w-96 shadow-lg" key={medicamento.codigo}>
            <CardHeader floated={false} className="h-60 overflow-hidden">
              <Tooltip content={medicamento.nombre} placement="top">
                <img
                  src={`http://127.0.0.1:3000/api/medicamentos/image/${medicamento.imagen}`}
                  alt={`img-medicamento ${medicamento.nombre}`}
                  className="h-full w-full object-cover"
                />
              </Tooltip>
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
                  {medicamento.viaAdminist}
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
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i class="fa-solid fa-capsules"></i> Concentracion:
                  </span>{" "}
                  {medicamento.concentracion}
                </Typography>
              </div>
              <div className="border-t pt-2">
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i class="fa-solid fa-calendar-days"></i> Vencimiento:
                  </span>{" "}
                  {medicamento.fechaVencimiento}
                </Typography>
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i class="fa-solid fa-box-archive"></i> Stock:
                  </span>{" "}
                  <span
                    className={`font-bold px-2 py-1 rounded ${
                      medicamento.stockDisponible < 20
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {medicamento.stockDisponible}
                  </span>
                </Typography>
              </div>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
              <Tooltip content="Edit" placement="top">
                <IconButton
                  color="light-blue"
                  className="rounded-full"
                  onClick={handleEdit}
                >
                  {" "}
                  <i class="fa-regular fa-pen-to-square"></i>
                </IconButton>
              </Tooltip>
              <Tooltip content="info">
                <IconButton
                  color="cyan"
                  className="rounded-full"
                  onClick={() => handleOpen(medicamento.codigo)}
                >
                  {" "}
                  <i class="fa-regular fa-eye"></i>
                </IconButton>
              </Tooltip>
              <Tooltip content="Eliminar">
                <IconButton
                  color="blue-gray"
                  className="rounded-full"
                  onClick={() => handleDelete(medicamento._id)}
                >
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
};

export default ListMedicamentos;
