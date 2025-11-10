import React, { useState, useEffect, useRef } from 'react';

import '../styles/DashboardPanel.css';
import reunionImg from '../assets/reunion.jpg';
import vacanteImg from '../assets/vacante.jpg';
import eventoImg from '../assets/evento.jpg';

const ciudades = ['Medellín', 'Bogotá', 'Cali', 'Barranquilla'];
const tipos = ['Vacante', 'Reunion', 'Evento'];
const hashtags = ['#magneto_empleos'];

const imagenesPorHashtag = {
  '#reunion': reunionImg,
  '#vacante': vacanteImg,
  '#evento': eventoImg
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarPublicaciones(n = 20) {
  return Array.from({ length: n }).map((_, i) => {
    const tipo = tipos[getRandomInt(0, tipos.length - 1)];
    const ciudad = ciudades[getRandomInt(0, ciudades.length - 1)];
    const hashtagsPub = [
      `#${tipo.toLowerCase()}`,
      ...hashtags,
      `#${ciudad.toLowerCase()}`
    ];
    return {
      id: i + 1,
      tipo,
      ciudad,
      hashtags: hashtagsPub,
      imagen: 'https://via.placeholder.com/200x150.png?text=Imagen',
      likes: getRandomInt(10, 100),
      comentarios: getRandomInt(0, 30),
      compartidos: getRandomInt(0, 20)
    };
  });
}

function getRandomStats() {
  // Simula datos de edades y horas de interacción
  return {
    edades: [
      { rango: '18-24', valor: Math.floor(Math.random() * 40) + 10 },
      { rango: '25-34', valor: Math.floor(Math.random() * 40) + 10 },
      { rango: '35-44', valor: Math.floor(Math.random() * 30) + 5 },
      { rango: '45-54', valor: Math.floor(Math.random() * 20) + 2 },
      { rango: '55+', valor: Math.floor(Math.random() * 10) + 1 }
    ],
    horas: [
      { hora: '8-10am', valor: Math.floor(Math.random() * 30) + 5 },
      { hora: '10-12pm', valor: Math.floor(Math.random() * 40) + 10 },
      { hora: '12-2pm', valor: Math.floor(Math.random() * 50) + 10 },
      { hora: '2-4pm', valor: Math.floor(Math.random() * 30) + 5 },
      { hora: '4-6pm', valor: Math.floor(Math.random() * 20) + 2 },
      { hora: '6-8pm', valor: Math.floor(Math.random() * 10) + 1 }
    ]
  };
}

function getProportionalStats(likes, comentarios) {
  // Edades proporcionales a likes
  const rangos = ['18-24', '25-34', '35-44', '45-54', '55+'];
  let porcentajes = [0.32, 0.28, 0.18, 0.13, 0.09]; // Suma 1
  let edades = porcentajes.map((p, i) => ({ rango: rangos[i], valor: Math.round(likes * p) }));
  // Ajuste para que la suma sea igual a likes
  let diff = likes - edades.reduce((a, b) => a + b.valor, 0);
  edades[0].valor += diff;

  // Horas proporcionales a likes + comentarios
  const horasR = ['8-10am', '10-12pm', '12-2pm', '2-4pm', '4-6pm', '6-8pm'];
  let porcentajesH = [0.10, 0.18, 0.32, 0.18, 0.13, 0.09]; // Suma 1
  let total = likes + comentarios;
  let horas = porcentajesH.map((p, i) => ({ hora: horasR[i], valor: Math.round(total * p) }));
  let diffH = total - horas.reduce((a, b) => a + b.valor, 0);
  horas[2].valor += diffH;
  return { edades, horas };
}

const DashboardPanel = () => {
  const [publicaciones, setPublicaciones] = useState(generarPublicaciones());
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [filtroCiudad, setFiltroCiudad] = useState('Todas');
  const [modalPub, setModalPub] = useState(null);
  const [modalStats, setModalStats] = useState(getProportionalStats(0, 0));
  const [modalLikes, setModalLikes] = useState(0);
  const [modalComentarios, setModalComentarios] = useState(0);
  const [modalCompartidos, setModalCompartidos] = useState(0);
  const modalRef = useRef();

  // Simular aumento de likes, comentarios y compartidos
  useEffect(() => {
    const interval = setInterval(() => {
      setPublicaciones(prev => prev.map(pub => ({
        ...pub,
        likes: pub.likes + getRandomInt(0, 1),
        comentarios: pub.comentarios + getRandomInt(0, 1),
        compartidos: pub.compartidos + getRandomInt(0, 1)
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Filtrar publicaciones
  const publicacionesFiltradas = publicaciones.filter(pub => {
    const tipoOk = filtroTipo === 'Todos' || pub.tipo === filtroTipo;
    const ciudadOk = filtroCiudad === 'Todas' || pub.ciudad === filtroCiudad;
    return tipoOk && ciudadOk;
  });

  // Animar likes, comentarios y compartidos en el modal
  useEffect(() => {
    if (modalPub) {
      setModalLikes(modalPub.likes);
      setModalComentarios(modalPub.comentarios);
      setModalCompartidos(modalPub.comentarios);
      setModalStats(getProportionalStats(modalPub.likes, modalPub.comentarios));
      let likes = modalPub.likes;
      let comentarios = modalPub.comentarios;
      const interval = setInterval(() => {
        likes = likes + getRandomInt(0, 2);
        comentarios = comentarios + getRandomInt(0, 1);
        setModalLikes(likes);
        setModalComentarios(comentarios);
        setModalCompartidos(s => s + getRandomInt(0, 1));
        setModalStats(getProportionalStats(likes, comentarios));
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [modalPub]);

  // Cerrar modal al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalPub && modalRef.current && !modalRef.current.contains(event.target)) {
        setModalPub(null);
      }
    }
    if (modalPub) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [modalPub]);

  return (
    <div className="dashboard-panel aura-main-panel-bg">
      {/* Modal flotante */}
      {modalPub && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div ref={modalRef} style={{
            background: '#fff', borderRadius: 16, padding: 32, minWidth: 400, minHeight: 420, boxShadow: '0 8px 32px #0004', position: 'relative', maxWidth: 500
          }}>
            <button onClick={() => setModalPub(null)} style={{position: 'absolute', top: 12, right: 16, fontSize: 22, background: 'none', border: 'none', cursor: 'pointer'}}>×</button>
            <h2 style={{marginTop: 0, marginBottom: 12}}>Estadísticas de la publicación</h2>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18}}>
              <img src={imagenesPorHashtag[modalPub.hashtags[0]?.toLowerCase()] || 'https://via.placeholder.com/200x150.png?text=Imagen'} alt="Publicación" style={{width: 90, height: 130, objectFit: 'cover', borderRadius: 8}} />
              <div>
                <div style={{fontSize: 18, marginBottom: 6}}><span role="img" aria-label="like">❤️</span> {modalLikes}</div>
                <div style={{fontSize: 18, marginBottom: 6}}><span role="img" aria-label="comentario">💬</span> {modalComentarios}</div>
                <div style={{fontSize: 18}}><span role="img" aria-label="compartido">🔄</span> {modalCompartidos}</div>
              </div>
            </div>
            <div style={{marginBottom: 18}}>
              <strong>Edades de la población que da me gusta:</strong>
              {modalStats.edades.map(e => (
                <div key={e.rango} style={{display: 'flex', alignItems: 'center', gap: 8}}>
                  <span style={{width: 60}}>{e.rango}</span>
                  <div style={{background: '#eaf6ff', borderRadius: 4, height: 16, width: 120, marginRight: 8}}>
                    <div style={{background: '#4a90e2', height: '100%', borderRadius: 4, width: `${e.valor * 2}%`, minWidth: 8}}></div>
                  </div>
                  <span>{e.valor}</span>
                </div>
              ))}
            </div>
            <div style={{marginBottom: 8}}>
              <strong>Hora de mayor interacción:</strong>
              {modalStats.horas.map(h => (
                <div key={h.hora} style={{display: 'flex', alignItems: 'center', gap: 8}}>
                  <span style={{width: 70}}>{h.hora}</span>
                  <div style={{background: '#f6eafc', borderRadius: 4, height: 16, width: 120, marginRight: 8}}>
                    <div style={{background: '#8e44ad', height: '100%', borderRadius: 4, width: `${h.valor * 2}%`, minWidth: 8}}></div>
                  </div>
                  <span>{h.valor}</span>
                </div>
              ))}
            </div>
            <div style={{fontSize: 15, color: '#888', marginTop: 12}}>
              <strong>Hashtags:</strong> {modalPub.hashtags.join(' ')}
            </div>
          </div>
        </div>
      )}
      {/* Filtros */}
      <div className="feed-filtros">
        <select value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}>
          <option value="Todos">Todos</option>
          {tipos.map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
        </select>
        <select value={filtroCiudad} onChange={e => setFiltroCiudad(e.target.value)}>
          <option value="Todas">Todas</option>
          {ciudades.map(ciudad => <option key={ciudad} value={ciudad}>{ciudad}</option>)}
        </select>
      </div>
      {/* Matriz de publicaciones */}
      <div className="feed-matriz">
        {publicacionesFiltradas.map(pub => (
          <div className="feed-card" key={pub.id} onClick={() => setModalPub(pub)} style={{cursor: 'pointer'}}>
            <div className="feed-img">
              <img
                src={imagenesPorHashtag[pub.hashtags[0]?.toLowerCase()] || 'https://via.placeholder.com/200x150.png?text=Imagen'}
                alt="Publicación"
                style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px'}}
              />
            </div>
            <div className="feed-actions">
              <span className="like"><span role="img" aria-label="like">❤️</span> {pub.likes}</span>
              <span className="comentario"><span role="img" aria-label="comentario">💬</span> {pub.comentarios}</span>
              <span className="compartido"><span role="img" aria-label="compartido">🔄</span> {pub.compartidos}</span>
            </div>
            <div className="feed-hashtags">
              {pub.hashtags.map(h => <span key={h}>{h} </span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPanel;
