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
          if (response.status !== 200) {
            console.error("Error creating medicamento: ", response);
            return;
          }
          setMedicamento(response.data);
          const responseData = response.data;
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Medicamento creado",
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
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
