const express = require('express');
const router = express.Router();

// Lógica simple de ejemplo para decidir la respuesta
// Estado simple en memoria para la demo (no persistente ni multiusuario)
let lastUserIntent = null;
let lastUserTime = Date.now();


function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina tildes
    .replace(/\s+/g, ' ') // Reemplaza múltiples espacios por uno
    .trim();
}



function getChatbotResponse(message, intencionActual) {
  const msg = normalizarTexto(message);
  lastUserTime = Date.now();
  let nuevaIntencion = null;

  // Pregunta por vacantes, eventos, reuniones
  if (/vacante|vacantes/.test(msg)) {
    nuevaIntencion = 'vacantes';
    return { respuesta: '¿Te gustaría saber más sobre vacantes disponibles?', nuevaIntencion };
  }
  if (/evento|eventos/.test(msg)) {
    nuevaIntencion = 'eventos';
    return { respuesta: '¿Te gustaría saber más sobre eventos disponibles?', nuevaIntencion };
  }
  if (/reunion|reuniones/.test(msg)) {
    nuevaIntencion = 'reuniones';
    return { respuesta: '¿Te gustaría saber más sobre reuniones disponibles?', nuevaIntencion };
  }

  // Si responde sí (acepta variantes con espacios y tildes)
  if (/^(si|sí|claro|por supuesto|de una)$/.test(msg)) {
    let respuesta = '';
    if (intencionActual === 'vacantes') {
      respuesta = '💼 Podrás conocer todas las vacantes en el link que te compartí o al llenar el forms. 🚀 ¿Qué esperas para hacerlo? Es momento de pensar en tu futuro. ✨\n\n¿Necesitas que te ayude en algo más?';
      return { respuesta, nuevaIntencion: 'ayuda_extra' };
    } else if (intencionActual === 'eventos') {
      respuesta = '📅 Podrás conocer todos los eventos en el link que te compartí o al llenar el forms. 🚀 ¿Qué esperas para hacerlo? Es momento de pensar en tu futuro. ✨\n\n¿Necesitas que te ayude en algo más?';
      return { respuesta, nuevaIntencion: 'ayuda_extra' };
    } else if (intencionActual === 'reuniones') {
      respuesta = '🤝 Podrás conocer todas las reuniones en el link que te compartí o al llenar el forms. 🚀 ¿Qué esperas para hacerlo? Es momento de pensar en tu futuro. ✨\n\n¿Necesitas que te ayude en algo más?';
      return { respuesta, nuevaIntencion: 'ayuda_extra' };
    } else if (intencionActual === 'ayuda_extra') {
      return { respuesta: 'Cuéntame, ¿en qué más puedo ayudarte? 😊', nuevaIntencion: null };
    }
    return { respuesta: 'Cuéntame, ¿qué información necesitas?', nuevaIntencion: null };
  }

  // Si responde no (acepta variantes con espacios y tildes)
  if (/^(no|no gracias|no, gracias)$/.test(msg)) {
    if (intencionActual === 'ayuda_extra') {
      return { respuesta: '¡Gracias por tu tiempo! Si necesitas algo más, no dudes en escribirnos. ¡Hasta pronto! 👋', nuevaIntencion: null };
    }
    if (intencionActual) {
      return { respuesta: '¡Gracias por tu tiempo! Si necesitas algo más, no dudes en escribirnos. ¡Hasta pronto! 👋', nuevaIntencion: null };
    }
    return { respuesta: '', nuevaIntencion: null };
  }

  // Si agradece
  if (msg.includes('gracias')) return { respuesta: '¡De nada! Que tengas un excelente día.', nuevaIntencion: null };

  // Saludo
  if (msg.includes('hola')) return { respuesta: '¡Hola! ¿En qué puedo ayudarte?', nuevaIntencion: null };

  return { respuesta: '', nuevaIntencion: null };
}

// Despedida automática si no responde en 5 minutos (300000 ms)
setInterval(() => {
  if (Date.now() - lastUserTime > 300000 && lastUserTime !== 0) {
    lastUserTime = 0;
    lastUserIntent = null;
    // Aquí solo se podría enviar un mensaje si fuera un sistema con WebSocket o push, pero se deja la lógica para referencia
    // console.log('Despedida automática: ¡Gracias por tu tiempo! Si necesitas algo más, no dudes en escribirnos. ¡Hasta pronto!');
  }
}, 60000);

// POST /api/chatbot
router.post('/', (req, res) => {
  const { mensaje, intencion } = req.body;
  if (!mensaje) {
    return res.status(400).json({ respuesta: 'Mensaje no recibido.' });
  }
  const { respuesta, nuevaIntencion } = getChatbotResponse(mensaje, intencion);
  res.json({ respuesta, nuevaIntencion });
});

module.exports = router;
