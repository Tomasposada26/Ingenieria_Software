import React, { useState } from 'react';
import '../styles/PruebaNetoPanel.css';

const PruebaNetoPanel = () => {
  const [tipoPublicacion, setTipoPublicacion] = useState('Reel');
  const [eventoEscuchado, setEventoEscuchado] = useState('Comentario');
  const [contenidoPublicado, setContenidoPublicado] = useState('Vacante');
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [intencion, setIntencion] = useState(null);


  const handleSimular = () => {
    // Determinar el artículo correcto
    let articulo = 'el';
    if (contenidoPublicado === 'Vacante') articulo = 'la';
    if (contenidoPublicado === 'Reunion') articulo = 'la';
    if (contenidoPublicado === 'Evento') articulo = 'el';
    let extra = '';
    if (contenidoPublicado === 'Evento') extra = ' que elijas';

    const mensajeBot =
      `👋 ¡Hola! Soy Neto.\n\n` +
      `Vimos que reaccionaste a nuestro ${tipoPublicacion.toLowerCase()} sobre ${articulo} ${contenidoPublicado.toLowerCase()}${extra}.\n\n` +
      `🔗 Te enviaré un enlace para que conozcas más al respecto:\nhttps://www.magneto365.com/co/trabajos/ofertas-empleo-en-medellin\n\n` +
      `📝 También te enviaré un formulario para que lo llenes con tus datos:\nhttps://forms.office.com/r/2nUbFf0MR2\n\n` +
      `🤝 Uno de nuestros agentes especializados se comunicará contigo lo más rápido posible.\n\n` +
      `¿Tienes alguna inquietud inicial? 😊`;
    setMensajes([
      { from: 'bot', text: mensajeBot }
    ]);
  };


  const handleEnviar = async () => {
    if (mensaje.trim() === '') return;
    const userMsg = mensaje;
    setMensajes(prev => [
      ...prev,
      { from: 'user', text: userMsg }
    ]);
    setMensaje('');

    try {
      const res = await fetch('http://localhost:4000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: userMsg, intencion })
      });
      const data = await res.json();
      if (data.nuevaIntencion) setIntencion(data.nuevaIntencion);
      else setIntencion(null);
      if (data.respuesta && data.respuesta.trim() !== '') {
        setMensajes(prev => [
          ...prev,
          { from: 'bot', text: data.respuesta }
        ]);
      }
    } catch (err) {
      setMensajes(prev => [
        ...prev,
        { from: 'bot', text: 'Error de conexión con el backend.' }
      ]);
    }
  };

  return (
    <div className="prueba-neto-panel aura-main-panel-bg">
      {/* Controles de simulación */}
      <div className="sim-controls">
        <div>
          <label>Tipo publicación:&nbsp;</label>
          <select value={tipoPublicacion} onChange={e => setTipoPublicacion(e.target.value)}>
            <option>Reel</option>
            <option>Post</option>
            <option>Historia</option>
          </select>
        </div>
        <div>
          <label>Evento escuchado:&nbsp;</label>
          <select value={eventoEscuchado} onChange={e => setEventoEscuchado(e.target.value)}>
            <option>Comentario</option>
            <option>me gusta</option>
          </select>
        </div>
        <div>
          <label>Contenido publicado:&nbsp;</label>
          <select value={contenidoPublicado} onChange={e => setContenidoPublicado(e.target.value)}>
            <option>Vacante</option>
            <option>Reunion</option>
            <option>Evento</option>
          </select>
        </div>
        <button onClick={handleSimular}>Simular</button>
      </div>

      {/* Área de chat */}
      <div className="chat-area">
        {mensajes.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.from}`}>
            <div className="chat-bubble">
              {msg.text.split(/(https?:\/\/\S+)/g).map((part, i) => {
                if (/^https?:\/\//.test(part)) {
                  return <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{color:'#2563eb', wordBreak:'break-all'}}>{part}</a>;
                }
                // Soporte para saltos de línea
                return part.split(/\n/).map((line, j, arr) =>
                  <React.Fragment key={j}>
                    {line}
                    {j < arr.length - 1 ? <br /> : null}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Input de chat */}
      <div className="chat-input-bar">
        <input
          type="text"
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleEnviar(); }}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={handleEnviar}>Enviar</button>
      </div>
    </div>
  );
};

export default PruebaNetoPanel;
