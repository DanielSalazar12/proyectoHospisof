import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Input, List, ListItem } from "@material-tailwind/react";

function BuscadorMedicamento({ onSeleccionar }) {
  const urlApi = "http://127.0.0.1:3000/api/medicaments";

  const [busqueda, setBusqueda] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);

  const [cargando, setCargando] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [resultados, setResultados] = useState([]);

  const fetchMedicamentos = useCallback(async () => {
    try {
      setCargando(true);
      const res = await axios.get(`${urlApi}/info`);
      setMedicamentos(res.data.data);
    } catch (error) {
      console.error("Error al obtener la lista de medicamentos", error);
      setMedicamentos([]);
    } finally {
      setCargando(false);
    }
  }, [urlApi]);

  const handleBusqueda = (e) => {
    const value = e.target.value;
    setBusqueda(value);
    setResultados(
      medicamentos.filter((med) =>
        med.nombre.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const handleSeleccion = (medicamento) => {
    onSeleccionar(medicamento);
    setBusqueda("");
    setResultados([]);
  };

  useEffect(() => {
    fetchMedicamentos();
  }, [fetchMedicamentos, refresh]);
  return (
    <div className="relative w-full max-w-lg">
      <Input
        label="Buscar Medicamento"
        icon={<i className="fa-solid fa-magnifying-glass"></i>}
        value={busqueda}
        onChange={handleBusqueda}
      />

      {resultados.length > 0 && (
        <List className="absolute z-10 w-full bg-white shadow-lg rounded-lg max-h-48 overflow-auto mt-1">
          {resultados.map((med) => (
            <ListItem
              key={med.id}
              onClick={() => handleSeleccion(med)}
              className="cursor-pointer hover:bg-blue-100"
            >
              {med.nombre}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default BuscadorMedicamento;
