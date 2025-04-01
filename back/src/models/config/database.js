export default {
  url: "mongodb://127.0.0.1:27017/hospital",
  options: {
    useNewUrlParser: true, // Esta opción se utilizaba para evitar deprecaciones en versiones antiguas de Mongoose
    useUnifiedTopology: true, //  Esta opción también se utilizaba para evitar deprecaciones relacionadas con la topología de la conexión.
  },
};
