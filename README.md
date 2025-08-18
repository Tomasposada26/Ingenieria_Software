# Proyecto Curso Ingenieria_Software
### 1. Introducción
-----------
Este documento detalla el diseño y la planificación del proyecto Automatic Instagram CM, una herramienta web diseñada para la empresa Magneto, en el marco del curso de Ingeniería de Software de la Universidad EAFIT. El objetivo principal es crear una plataforma que se integre con la API de Instagram (Meta for Developers) para monitorear, analizar y gestionar automáticamente las reacciones de los usuarios a las publicaciones.

### 2. Descripción del Problema
------------
Magneto, una empresa enfocada en la gestión de talento, necesita una solución para interactuar de manera eficiente con las audiencias en Instagram. El proceso actual de seguimiento de reacciones y comentarios es manual y consume mucho tiempo. Se requiere una herramienta que automatice esta tarea, proporcione análisis de datos y permita una comunicación rápida y categorizada con los usuarios a través de un chatbot inteligente.

### 3. Objetivos del Proyecto
-----------
* **Objetivo General:** Desarrollar una aplicación web para la gestión automatizada de las interacciones en Instagram de Magneto, permitiendo la escucha activa, el análisis de datos y la respuesta automática a través de un chatbot.

* **Objetivos Específicos:**
1. Integrar la aplicación con la API de Instagram para capturar reacciones y comentarios en tiempo real.
2. Implementar un módulo de análisis de datos para generar estadísticas sobre las reacciones (cantidad por publicación, tendencias por día, semana y mes).
3. Diseñar e implementar un chatbot con inteligencia artificial capaz de categorizar las interacciones en temas laborales, como vacantes, eventos y reuniones.
4. Desarrollar una interfaz de usuario que muestre las estadísticas, los chats en curso y un panel de control para la gestión de las conversaciones.
5. Utilizar tecnologías modernas y escalables como React, Node.js, PostgreSQL y MongoDB para el desarrollo.

### 4. Alcance del Proyecto
-------------
El proyecto abarca las siguientes funcionalidades:
* Integración con Instagram: Conexión segura con la API de Instagram Business para acceder a datos públicos de publicaciones y reacciones.
* Análisis de Datos: Procesamiento de las reacciones (likes, comentarios, etc.) y generación de métricas para la visualización en el dashboard.
* Chatbot Automatizado: Un motor de IA que clasifique los comentarios y genere respuestas automáticas según categorías predefinidas (laboral, eventos, etc.).
* Dashboard de Monitoreo: Una interfaz que muestre:
* Gráficos de reacciones por período de tiempo (días, semanas, meses).
* Reacciones por publicación individual.
* Un visor de conversaciones en tiempo real con el chatbot.
* Gestión de Conversaciones: Posibilidad de que un administrador de Magneto pueda supervisar y, si es necesario, tomar el control de las conversaciones iniciadas por el chatbot.

### 5. Tecnologías a Utilizar
--------------
**Frontend:** React.js

**Backend:** Node.js

**Bases de Datos:**
* **PostgreSQL:** Para datos relacionales y estructurados como información de usuarios, publicaciones, y estadísticas clave.
* **MongoDB:** Para datos no estructurados y de alta velocidad de escritura, como los registros de conversaciones del chatbot y los comentarios en bruto.

**Integración:** API de Instagram (Meta for Developers)

**Inteligencia Artificial:** Se explorarán APIs de terceros o modelos de lenguaje para el desarrollo del chatbot.

### 6. Arquitectura del Sistema
---------------
La arquitectura propuesta es un modelo de microservicios o una arquitectura monolítica bien organizada para el backend, con una aplicación de una sola página (SPA) en el frontend.
* **Frontend (React):** Se encargará de la presentación de los datos y la interacción del usuario. Se comunicará con el backend a través de APIs REST.
* **Backend (Node.js):** Será el corazón del sistema, manejando la lógica de negocio, la comunicación con las bases de datos y la integración con la API de Instagram y el chatbot.
* **Bases de Datos:** PostgreSQL y MongoDB funcionarán en conjunto para almacenar diferentes tipos de datos de manera óptima.