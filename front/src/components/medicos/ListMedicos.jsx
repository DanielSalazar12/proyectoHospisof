import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Input,
  Tooltip,
  IconButton,
  MenuList,
  MenuHandler,
  Menu,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";

import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import FormUpdatMedico from "./FormUpdatMedico";
import { XMarkIcon } from "@heroicons/react/24/solid";
const ListMedicos = ({
  urlApi,
  medicos,
  loading,
  error,
  buscar,
  paginacion,
  handlePageChange,
  setBusqueda,
  onRefresh,
}) => {
  const [detalles, setdetalles] = useState(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const busqueda = medicos.filter((medico) =>
    medico.nombreMedico.toLowerCase().includes(buscar.toLowerCase()),
  );

  const handleOpen = (documento, action) => {
    let info = medicos.find((medico) => medico.documento === documento);
    action === "edit" ? setOpen2(!open2) : setOpen(!open);
    setdetalles(info);
  };
  const handleDelete = useCallback(
    async (id) => {
      Swal.fire({
        title: "¿Está seguro de que desea eliminar este medico?",
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
            const response = await axios.post(urlApi + "delet", { id });
            if (response.data.estado === true) {
              onRefresh(true);
              Swal.fire({
                title: "Eliminado",
                text: response.data.mensaje,
                icon: "success",
                showConfirmButton: false,
                timer: 1900,
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "No se pudo Eliminar el medico",
                icon: "error",
                showConfirmButton: false,
              });
            }
          } catch (error) {
            Swal.fire("Error", "No se pudo eliminar", "error");
            console.error("Delete error:", error);
          }
        }
      });
    },
    [urlApi],
  );

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
  return (
    <>
      {detalles && (
        <Dialog
          open={open}
          size="sm"
          key={detalles.documento}
          handler={handleClose}
        >
          <DialogHeader className="flex items-center gap-2">
            Información General
          </DialogHeader>
          <DialogBody
            divider
            className="flex flex-col gap-3 text-sm text-gray-700"
          >
            <Typography>
              <span className="font-semibold">Documento:</span>{" "}
              {detalles.documento}
            </Typography>
            <Typography>
              <span className="font-semibold">Nombre:</span>{" "}
              {detalles.nombreMedico} {detalles.apellidoMedico}
            </Typography>
            <Typography>
              <span className="font-semibold">Especialidad:</span>{" "}
              {detalles.especialidad}
            </Typography>
            <Typography>
              <span className="font-semibold">Email:</span>{" "}
              {detalles.emailMedico}
            </Typography>
            <Typography>
              <span className="font-semibold">Teléfono:</span>{" "}
              {detalles.telefono}
            </Typography>
            <Typography>
              <span className="font-semibold">Fecha de Nacimiento:</span>{" "}
              {new Date(detalles.fechaNacimiento).toLocaleDateString()}
            </Typography>
          </DialogBody>
        </Dialog>
      )}
      {detalles && (
        <Dialog open={open2} size="lg" handler={handleClose}>
          <DialogHeader className="flex items-center bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-lg px-6 py-4 justify-center text-white">
            <IconButton
              size="sm"
              variant="text"
              className="!absolute right-3.5 top-3.7"
              onClick={handleClose}
            >
              <XMarkIcon className="h-5 w-5 stroke-2" />
            </IconButton>
            <div className="flex flex-col items-center">
              {/* <i className="fa-solid fa-user-doctor fa-2x mt-1"></i> */}
              <i className="fa-solid fa-id-card-clip fa-2x mt-1"></i>
              <span className="text-xl font-bold mt-4">
                Actualizacion Medicos
              </span>
            </div>
          </DialogHeader>
          <DialogBody divider className="flex flex-col gap-4">
            <FormUpdatMedico
              dataForm={detalles}
              setRefresh={onRefresh}
              urlApi={urlApi}
              stateModal={setOpen2}
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
      </div>
      {loading && <Typography>Cargando medicos...</Typography>}
      {error && <Typography color="red">{error}</Typography>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-11">
        {busqueda.length > 0 &&
          busqueda.map((medico) => (
            <Card
              key={medico.documento}
              className="w-full max-w-md rounded-lg shadow-lg border border-gray-200"
            >
              <CardHeader
                floated={false}
                shadow={false}
                className="flex items-center bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-lg px-6 py-4"
              >
                <div className="bg-white rounded-md w-10 h-10 flex items-center justify-center mr-4">
                  <svg width="28" height="28" viewBox="0 0 40 40">
                    <rect
                      x="8"
                      y="8"
                      width="24"
                      height="24"
                      rx="4"
                      fill="#3B82F6"
                    />
                    <text
                      x="20"
                      y="27"
                      textAnchor="middle"
                      fill="#fff"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      H
                    </text>
                  </svg>
                </div>
                <Typography
                  variant="h5"
                  color="white"
                  className="font-bold ml-2"
                >
                  Hospital Santa Teresa
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col sm:flex-row items-start px-6 py-5">
                {/* Avatar */}
                <div className="mr-0 mb-4 sm:mr-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-md flex items-center justify-center overflow-hidden">
                    <img
                      src={urlApi + "image/" + medico.foto}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-5 right-5 z-10">
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
                            color="white"
                            className="rounded-full bg-blue bg-opacity-10 hover:bg-opacity-95"
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
                                  handleOpen(medico.documento, "edit")
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
                                  handleOpen(medico.documento, "info")
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
                                onClick={() => handleDelete(medico._id)}
                              >
                                <i className="fa-regular fa-trash-can"></i>
                              </IconButton>
                            </Tooltip>
                          </div>
                        </MenuList>
                      </Menu>
                    </Tooltip>
                  </div>
                </div>
                {/* Información */}
                <div className="flex-1">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-bold break-words text-lg sm:text-xl"
                  >
                    {medico.nombreMedico} {medico.apellidoMedico}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue"
                    className="font-semibold mb-2"
                  >
                    {medico.especialidad}
                  </Typography>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 text-sm text-gray-700">
                    <div>
                      <div className="font-semibold">ID No</div>
                      <div>{medico.documento}</div>
                      <div className="mt-2 font-semibold">F. Nacimiento</div>
                      <div>{medico.fechaNacimiento}</div>
                    </div>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {medico.telefono}
                      </div>
                      <div className="mt-2 font-semibold">Email</div>
                      <div className="font-semibold mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {medico.emailMedico}
                      </div>
                    </div>
                  </div>
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

export default ListMedicos;
