import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Button
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import FormUpdaMedicamento from "./FormUpdaMedicamento";
import axios from "axios";

const ListMedicamentos = ({
  urlApi,
  medicamentos,
  loading,
  error,
  buscar,
  paginacion,
  handlePageChange,
  setBusqueda,
  onRefresh,
}) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [detalles, setdetalles] = useState(null);
  const busqueda = medicamentos.filter((medicamento) =>
    medicamento.nombre.toLowerCase().includes(buscar.toLowerCase()),
  );

  const handleOpen = (codigo, action) => {
    let info = medicamentos.find(
      (medicamento) => medicamento.codigo === codigo,
    );
    action === "edit" ? setOpen2(!open2) : setOpen(!open);
    setdetalles(info);
  };

  const handleClose = () => {
    setOpen(false);
    setdetalles(null);
  };
  const renderPaginationControls = () => (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {/* Primera Página */}
      <Button
        disabled={paginacion.paginaActual === 1}
        onClick={() => handlePageChange(paginacion.primeraUrl)}
        className="flex items-center gap-1 px-3 py-1 rounded-full"
        color={paginacion.paginaActual === 1 ? "gray" : "blue"}
      >
        « Primera
      </Button>

      {/* Anterior */}
      <Button
        disabled={!paginacion.anteriorPageUrl}
        onClick={() => handlePageChange(paginacion.anteriorPageUrl)}
        className="flex items-center gap-1 px-3 py-1 rounded-full"
        color={paginacion.anteriorPageUrl ? "blue" : "gray"}
      >
        ‹ Anterior
      </Button>

      {/* Paginas */}
      {Array.from({ length: paginacion.totalPaginas }, (_, i) => i + 1).map(
        (page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 p-0 rounded-full mx-1 ${
              page === paginacion.paginaActual
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </Button>
        ),
      )}

      {/* Siguiente */}
      <Button
        disabled={!paginacion.siguienteUrl}
        onClick={() => handlePageChange(paginacion.siguienteUrl)}
        className="flex items-center gap-1 px-3 py-1 rounded-full"
        color={paginacion.siguienteUrl ? "blue" : "gray"}
      >
        Siguiente ›
      </Button>

      {/* Última Página */}
      <Button
        disabled={paginacion.paginaActual === paginacion.totalPaginas}
        onClick={() => handlePageChange(paginacion.ultimaUrl)}
        className="flex items-center gap-1 px-3 py-1 rounded-full"
        color={
          paginacion.paginaActual === paginacion.totalPaginas ? "gray" : "blue"
        }
      >
        Última »
      </Button>
    </div>
  );
  /*   const handleEdit = useCallback(
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
            setRefresh(!refresh);
            Swal.fire({
              title: "Actualizado",
              text: "El medicamento se ha actualizado",
              icon: "success",
              showConfirmButton: false,
              timer: 1700,
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo actualizar el medicamento",
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
    [refresh, urlApi],
  ); */

  const handleDelete = useCallback(
    async (id) => {
      Swal.fire({
        title: "¿Está seguro de que desea eliminar este medicamento?",
        text: "No podrá revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.post(urlApi + "delet", { id });
            onRefresh(true);
            Swal.fire({
              title: "Eliminado",
              text: "El medicamento ha sido eliminado",
              icon: "success",
              showConfirmButton: false,
              timer: 1700,
            });
          } catch (error) {
            Swal.fire("Error", "No se pudo eliminar", "error");
            console.error("Delete error:", error);
          }
        }
      });
    },
    [urlApi],
  );

  return (
    <>
      {detalles && (
        <Dialog open={open} size="sm" handler={handleClose}>
          <DialogHeader>Información General</DialogHeader>
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
        <Dialog open={open2} size="lg" handler={handleClose}>
          <DialogHeader>
            <IconButton
              size="sm"
              variant="text"
              className="!absolute right-3.5 top-3.7"
              onClick={handleClose}
            >
              <XMarkIcon className="h-5 w-5 stroke-2" />
            </IconButton>
          </DialogHeader>
          <DialogBody divider className="flex flex-col gap-4">
            <FormUpdaMedicamento
              dataForm={detalles}
              setRefresh={onRefresh}
              stateModal={setOpen2}
              urlApi={urlApi}
            />
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
            />
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
      {loading && <Typography>Cargando medicos...</Typography>}
      {error && <Typography color="red">{error}</Typography>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-11">
        {busqueda.length > 0 &&
          busqueda.map((medicamento) => (
            <Card className="w-96 shadow-lg relative" key={medicamento.codigo}>
              <CardHeader
                floated={false}
                className="h-60 overflow-hidden relative"
              >
                <img
                  src={`http://127.0.0.1:3000/api/medicaments/image/${medicamento.imagen}`}
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
                              onClick={() =>
                                handleOpen(medicamento.codigo, "edit")
                              }
                            >
                              <i className="fa-regular fa-pen-to-square"></i>
                            </IconButton>
                          </Tooltip>
                        </div>
                        <div className="flex justify-center mt-2 items-center border:none">
                          <Tooltip content="info" placement="right">
                            <IconButton
                              color="cyan"
                              className="rounded-full"
                              onClick={() =>
                                handleOpen(medicamento.codigo, "info")
                              }
                            >
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
                      <i className="fa-solid fa-capsules"></i> Concentración:
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
      <div className="flex justify-center mt-4">
        {paginacion.totalPaginas > 1 && renderPaginationControls()}
      </div>
    </>
  );
};

export default ListMedicamentos;
