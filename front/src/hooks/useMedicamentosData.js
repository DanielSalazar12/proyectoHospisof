import axios from "axios";
import { useEffect, useState } from "react";

export const useMedicamentosData = () => {
  const [medicamentosList, setMedicamentos] = useState([]);
  useEffect(() => {
    try {
      axios
        .get("http://127.0.0.1:3000/api/medicamentos/list")
        .then((response) => {
          setMedicamentos(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching medicamentos data: ", error);
          setMedicamentos([]);
        });
    } catch (error) {
      console.error("Error fetching medicamentos data: ", error);
      setMedicamentos([]);
    }
  }, []);
  return medicamentosList;
};
