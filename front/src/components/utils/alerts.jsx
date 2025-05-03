// utils/alertUtils.js
import Swal from 'sweetalert2';

export const showErrorAlert = (title, text) => {
    Swal.fire({
        icon: "error",
        title,
        text,
    });
};

export const showSuccessAlert = (title, text) => {
    Swal.fire({
        icon: "success",
        title,
        text,
        confirmButtonColor: "#3085d6",
    });
};

export const showConfirmDelete = async () => {
    return await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esto eliminará el paciente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        customClass: {
            confirmButton: "swal2-confirm-button",
            cancelButton: "swal2-cancel-button",
        },
    });
};
