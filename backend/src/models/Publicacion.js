const mongoose = require('mongoose');

const PublicacionSchema = new mongoose.Schema({
  usuario: {
    nombre: String,
    avatar: String // URL de la imagen de perfil
  },
  imagen: String, // URL de la imagen de la publicación
  descripcion: String,
  likes: Number,
  comentarios: [
    {
      usuario: String,
      texto: String,
      fecha: Date
    }
  ],
  fecha: Date
});

module.exports = mongoose.model('Publicacion', PublicacionSchema);