const historial = {
  diagnostico_id: "dx-001",
  fecha: "2024-04-10",
  medico: {
    nombre: "Dra. Carolina Ramírez",
    eps: "SaludTytal",
  },
  paciente: {
    nombre: "Felipe Yusti Mosquera",
    documento: "1113858419",
  },
  motivo_consulta:
    "Dolor abdominal persistente, sensación de ardor estomacal, y náuseas matutinas.",
  diagnostico_principal: "Gastritis Crónica",
  diagnosticos_secundarios: ["Reflujo Gastroesofágico", "Ansiedad Leve"],
  historia_enfermedad_actual:
    "Paciente masculino de 20 años refiere ardor epigástrico desde hace aproximadamente 3 semanas, especialmente posterior a la ingesta de alimentos condimentados. También presenta episodios de náuseas sin vómito, sin fiebre ni diarrea. Refiere aumento del estrés académico en las últimas semanas.",
  examen_fisico: {
    signos_vitales: "Dentro de parámetros normales",
    hallazgos: [
      "Dolor a la palpación en epigastrio sin rebote ni defensa",
      "Ruidos hidroaéreos presentes",
      "No hay signos de deshidratación ni ictericia",
    ],
  },
  evolucion_clinica:
    "Se indica tratamiento inicial con inhibidores de bomba de protones. Se explican hábitos alimenticios a modificar. Se recomienda control en 15 días para evaluación de respuesta al tratamiento.",
  medicamentos: [
    {
      nombre: "Omeprazol",
      dosis: "20 mg",
      indicaciones: "1 cápsula en ayunas por 30 días",
    },
    {
      nombre: "Hidróxido de aluminio + magnesio",
      dosis: "10 ml",
      indicaciones: "Después de comidas si hay ardor",
    },
    {
      nombre: "Lorazepam",
      dosis: "0.5 mg",
      indicaciones:
        "1 tableta en la noche si hay dificultad para dormir (uso eventual)",
    },
  ],
};
export default historial;
