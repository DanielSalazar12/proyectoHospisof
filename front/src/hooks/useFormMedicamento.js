import axios from "axios";
import { useEffect, useState } from "react";

export const useFormMedicamento = (data = null) => {
  const [medicamento, setMedicamento] = useState([]);

  useEffect(() => {
    if (data) {
      axios({
        method: "POST",
        url: "http://127.0.0.1:3000/api/medicamentos/create",
        data: data,
      })
        .then((response) => {
          console.log("Medicamento creado: ", response.data);
          setMedicamento(response.data);
        })
        .catch((error) => {
          console.error("Error creating medicamento: ", error);
          setMedicamento({
            nombre: "",
            codigo: "",
            administracion: "",
            presentacion: "",
            medida: "",
            formaFarma: "",
            descripcion: "",
            concentracion: "",
            envase: "",
            prCompra: "",
            prVenta: "",
            stock: "",
            vencimiento: "",
            img: "",
          });
          
        });
    }
  }, [data]);

  return {
    medicamento,
  };
};
