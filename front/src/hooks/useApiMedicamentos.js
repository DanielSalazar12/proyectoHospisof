import axios from "axios";
import { useState, useCallback } from "react";

// useCallback : es un hook de React que sirve para memorizar funciones, es decir, evitar que se vuelvan a crear en cada renderizado del componente. Esto es útil para optimizar el rendimiento de la aplicación, especialmente cuando se pasan funciones como props a componentes hijos que dependen de esas funciones.

export const useApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMedicamentos = useCallback(
    async ({ url, method = "GET", body = null, headears = {} }) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios({
          url,
          method,
          data: body,
          headers: headears,
        });
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching medicamentos data: ", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  return {
    data,
    loading,
    error,
    fetchMedicamentos,
  };
};
