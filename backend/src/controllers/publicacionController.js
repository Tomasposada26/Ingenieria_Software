// Controlador para devolver publicaciones simuladas
    // Controlador para devolver publicaciones simuladas
exports.getPublicacionesSimuladas = (req, res) => {
  const publicaciones = [
    {
      _id: '1',
      usuario: {
        nombre: 'Juan Perez',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      imagen: 'https://placeimg.com/400/400/nature',
      descripcion: '¡Qué gran día para una caminata!',
      likes: 123,
      comentarios: [
        { usuario: 'Ana', texto: '¡Hermosa foto!', fecha: new Date() },
        { usuario: 'Luis', texto: '¿Dónde es?', fecha: new Date() }
      ],
      fecha: new Date()
    },
    {
      _id: '2',
      usuario: {
        nombre: 'Maria Lopez',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
      },
      imagen: 'https://placeimg.com/400/400/tech',
      descripcion: 'Probando la nueva cámara 📸',
      likes: 98,
      comentarios: [
        { usuario: 'Carlos', texto: '¡Se ve genial!', fecha: new Date() }
      ],
      fecha: new Date()
    },
    {
      _id: '3',
      usuario: {
        nombre: 'AuraBot',
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
      },
      imagen: 'https://img.freepik.com/foto-gratis/buscas-empleo-consiguelo-aqui_1134-1012.jpg',
      descripcion: '¿Buscas empleo? #vacantes Consíguelo aquí!',
      likes: 250,
      comentarios: [
        { usuario: 'Reclutador', texto: '¡Tenemos varias vacantes abiertas!', fecha: new Date() },
        { usuario: 'Candidato', texto: '¿Cómo aplico?', fecha: new Date() }
      ],
      fecha: new Date()
    },
    {
      _id: '4',
      usuario: {
        nombre: 'AuraBot',
        avatar: 'https://randomuser.me/api/portraits/lego/2.jpg'
      },
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvQw8Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw',
      descripcion: '¡No te pierdas la próxima #feria de empleo! #eventos',
      likes: 180,
      comentarios: [
        { usuario: 'Organizador', texto: '¡Te esperamos en la feria!', fecha: new Date() },
        { usuario: 'Visitante', texto: '¿Dónde es el evento?', fecha: new Date() }
      ],
      fecha: new Date()
    },
    {
      _id: '5',
      usuario: {
        nombre: 'AuraBot',
        avatar: 'https://randomuser.me/api/portraits/lego/3.jpg'
      },
      imagen: 'https://img.freepik.com/psd-gratis/flyer-reunion-negocios-plantilla-diseno_23-2149631446.jpg',
      descripcion: '¡No faltes a la próxima #reunion de equipo! Business Meeting para revisar avances y nuevas metas.',
      likes: 75,
      comentarios: [
        { usuario: 'Líder', texto: 'Importante asistir para definir objetivos.', fecha: new Date() },
        { usuario: 'Colaborador', texto: '¿Habrá acta de la reunión?', fecha: new Date() }
      ],
      fecha: new Date()
    }
  ];
  res.json(publicaciones);
};
