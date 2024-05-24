const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Configuración opcional para consultas estrictas
const url = process.env.MONGODB_URI; // URL de conexión obtenida de las variables de entorno
console.log("connecting to", url);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const videoSchema = new mongoose.Schema({
  content: {
    link: String, // Define un campo 'link' dentro de 'content' de tipo String
  },
  order: {
    type: Number,
    required: true,
  },
});

videoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // Convierte _id a id
    delete returnedObject._id; // Elimina _id
    delete returnedObject.__v; // Elimina __v
  },
});

module.exports = mongoose.model("Video", videoSchema); // Exporta el modelo 'Video'
