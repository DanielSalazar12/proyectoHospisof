import { useState, useEffect } from "react";
import axios from "axios";

export function BuscarMedicoInput({ value, onChange }) {
    const [query, setQuery] = useState("");
    const [resultados, setResultados] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.length > 1) {
                axios.get(`http://localhost:3000/api/pacientes?nombre=${query}`)
                    .then(res => setResultados(res.data))
                    .catch(err => console.error(err));
            } else {
                setResultados([]);
            }
        }, 300); // Espera 300ms después de dejar de escribir

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleSelect = (paciente) => {
        onChange(paciente._id);
        setQuery(paciente.nombrePaciente);
        setShowDropdown(false);
    };



    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Buscar paciente..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowDropdown(true);
                }}
                className="border px-4 py-2 rounded w-full"
            />
            {showDropdown && resultados.length > 0 && (
                <ul className="absolute z-10 bg-white border w-full mt-1 max-h-40 overflow-y-auto rounded shadow">
                    {resultados.map(p => (
                        <li
                            key={p._id}
                            onClick={() => handleSelect(p)}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                        >
                            {p.nombrePaciente}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
