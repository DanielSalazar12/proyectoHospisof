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
import { XMarkIcon } from "@heroicons/react/24/solid";
import FormUpdaMedicamento from "./FormUpdaMedicamento";

const ListMedicamentos = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [buscar, setBusqueda] = useState("");
  const [update, setUpdate] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [detalles, setMedicamentoSelect] = useState(null);
  const urlApi = "http://127.0.0.1:3000/api/medicamentos/";
  const { data, loading, error, fetchMedicamentos } = useApi();
  let edit = false;
  console.log(update.length);
  edit ? handleEdit() : false;
  const busqueda = data
    ? data.filter((medicamento) =>
        medicamento.nombre.toLowerCase().includes(buscar.toLowerCase()),
      )
    : [];

  const handleOpen = (codigo, action) => {
    let info = data.find((medicamento) => medicamento.codigo === codigo);
    action === "edit" ? setOpen2(!open2) : setOpen(!open);
    setMedicamentoSelect(info);
  };

  const handleClose = () => {
    setOpen(false);
    setMedicamentoSelect([]);
  };
  const handleEdit = () => {
    try {
      fetchMedicamentos({
        url: urlApi + "update",
        method: "PUT",
        body: { update },
      })
        .then(() => {
          setRefresh(!refresh);
          Swal.fire({
            title: "Actualizado",
            text: "El medicamento se ha actualizado",
            icon: "success",
            showConfirmButton: false,
            timer: 1700,
          });
        })
        .catch(() => {
          Swal.fire("Error", "No se pudo actualizar", "error");
          console.error("Delete error:", error);
        });
    } catch (error) {}
  };
  const handleClose2 = () => {
    setOpen2(false);
    setMedicamentoSelect([]);
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
        fetchMedicamentos({
          url: urlApi + "delet",
          method: "POST",
          body: { id },
        })
          .then(() => {
            setRefresh(!refresh);
            Swal.fire({
              title: "Eliminado",
              text: "El medicamento ha sido eliminado",
              icon: "success",
              showConfirmButton: false,
              timer: 1700,
            });
          })
          .catch(() => {
            Swal.fire("Error", "No se pudo eliminar", "error");
            console.error("Delete error:", error);
          });
      }
    });
  };
  useEffect(() => {
    fetchMedicamentos({ url: urlApi + "list" });
  }, [fetchMedicamentos, refresh]);

  return (
    <>
      
      
      {detalles && (
        <Dialog open={open} size="sm" handler={handleClose}>
          <DialogHeader>Informacion General</DialogHeader>
          <DialogBody divider className="flex flex-col gap-4">
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Código:</span> {detalles.codigo}
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Nombre:</span> {detalles.nombre}
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Descripción:</span>{" "}
              {detalles.descripcion}
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Concentración:</span>{" "}
              {detalles.concentracion}
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Vía de Administración:</span>{" "}
              {detalles.viaAdminist}
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Presentación:</span>{" "}
              {detalles.presentacion}
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Fecha de Vencimiento:</span>{" "}
              {detalles.fechaVencimiento}
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Stock Disponible:</span>{" "}
              <span className="font-bold px-2 py-1 rounded bg-green-100 text-green-700">
                {detalles.stockDisponible}
              </span>
            </Typography>
            <Typography className="text-sm text-gray-700">
              <span className="font-semibold">Precio: </span>$
              {detalles.precioVenta}
            </Typography>
          </DialogBody>
        </Dialog>
      )}
      {detalles && (
        <Dialog open={open2} size="lg" handler={handleClose2}>
          <DialogHeader>
            <IconButton
              size="sm"
              variant="text"
              className="!absolute right-3.5 top-3.7"
              onClick={handleClose2}
            >
              <XMarkIcon className="h-5 w-5 stroke-2" />
            </IconButton>
          </DialogHeader>
          <DialogBody divider className="flex flex-col gap-4">
            <FormUpdaMedicamento
              dataForm={detalles}
              setFormulario={setUpdate}
            ></FormUpdaMedicamento>
          </DialogBody>
        </Dialog>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 mt-2">
        <div className="flex gap-4 mt-4">
          <div className="w-full">
            <Input
              label="Buscar"
              name="search"
              value={buscar}
              onChange={(e) => setBusqueda(e.target.value)}
            ></Input>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="w-full">
            <div className="mb-3 flex gap-3">
              <Tooltip
                content="Filtrar"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                placement="top"
              >
                <Menu placement="right">
                  <MenuHandler>
                    <IconButton color="amber">
                      {" "}
                      <i className="fa-solid fa-filter"></i>
                    </IconButton>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>
                      <i className="fa-solid fa-arrow-up-a-z"></i>
                    </MenuItem>
                    <MenuItem>
                      <i className="fa-solid fa-arrow-down-z-a"></i>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-11">
        {busqueda.map((medicamento) => (
          <Card className="w-96 shadow-lg realtive " key={medicamento.codigo}>
            <CardHeader
              floated={false}
              className="h-60 overflow-hidden relative"
            >
              <img
                src={`http://127.0.0.1:3000/api/medicamentos/image/${medicamento.imagen}`}
                alt={`img-medicamento ${medicamento.nombre}`}
                className="h-full w-full object-cover"
              />

              <div className="absolute top-2 right-2 z-10">
                <Tooltip
                  content="Actions"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                  placement="top"
                >
                  <Menu
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                  >
                    <MenuHandler>
                      <IconButton
                        variant="text"
                        className="rounded-full bg-white bg-opacity-70 hover:bg-opacity-90"
                      >
                        <i className="fa-solid fa-gear"></i>
                      </IconButton>
                    </MenuHandler>
                    <MenuList className="flex flex-col gap-1 bg-transparent border-none">
                      <div className="flex justify-center mt-2 items-center bg-transparent border-none">
                        <Tooltip content="Edit" placement="right">
                          <IconButton
                            color="light-blue"
                            className="rounded-full"
                            name="edit"
                            onClick={(e) =>
                              handleOpen(medicamento.codigo, "edit")
                            }
                          >
                            {" "}
                            <i className="fa-regular fa-pen-to-square"></i>
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div className="flex justify-center mt-2 items-center border:none">
                        <Tooltip content="info" placement="right">
                          <IconButton
                            color="cyan"
                            className="rounded-full"
                            onClick={(e) =>
                              handleOpen(medicamento.codigo, "info")
                            }
                          >
                            {" "}
                            <i className="fa-regular fa-eye"></i>
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div className="flex justify-center mt-2 items-center">
                        <Tooltip content="Eliminar" placement="right">
                          <IconButton
                            color="blue-gray"
                            className="rounded-full"
                            onClick={() => handleDelete(medicamento._id)}
                          >
                            {" "}
                            <i className="fa-regular fa-trash-can"></i>
                          </IconButton>
                        </Tooltip>
                      </div>
                    </MenuList>
                  </Menu>
                </Tooltip>
              </div>
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
                    <i className="fa-solid fa-syringe"></i> Administración:
                  </span>{" "}
                  {medicamento.viaAdminist}
                </Typography>
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i className="fa-solid fa-prescription-bottle"></i>{" "}
                    Presentación:
                  </span>{" "}
                  {medicamento.presentacion}
                </Typography>
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i className="fa-solid fa-clipboard"></i> Descripción:
                  </span>{" "}
                  {medicamento.descripcion}
                </Typography>
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i className="fa-solid fa-capsules"></i> Concentracion:
                  </span>{" "}
                  {medicamento.concentracion}
                </Typography>
              </div>
              <div className="border-t pt-2">
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i className="fa-solid fa-calendar-days"></i> Vencimiento:
                  </span>{" "}
                  {medicamento.fechaVencimiento}
                </Typography>
                <Typography className="text-sm">
                  <span className="font-semibold">
                    <i className="fa-solid fa-box-archive"></i> Stock:
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
          </Card>
        ))}
      </div>
    </>
  );
};

export default ListMedicamentos;
