Herramientas y Tecnologías
--------------------------

### **Frontend: React.js**

La interfaz de usuario se desarrollará con **React**, una de las librerías de JavaScript más populares para construir interfaces dinámicas y de una sola página (SPA). React nos permitirá crear una experiencia de usuario fluida y reactiva, mostrando las estadísticas y los chats en tiempo real.

### **Backend: Node.js**

El servidor que gestiona la lógica del negocio, las conexiones con las APIs de Meta y la base de datos se implementará en **Node.js**. Esto nos permite utilizar JavaScript tanto en el frontend como en el backend, lo que agiliza el desarrollo y facilita la comunicación entre las capas.

### **Bases de Datos: PostgreSQL y MongoDB**

Para la persistencia de datos, utilizaremos dos sistemas de bases de datos:

*   **PostgreSQL**: Será nuestra base de datos relacional principal. La usaremos para almacenar datos estructurados y críticos, como información de publicaciones, análisis de métricas (likes, comentarios, etc.) y datos de usuarios. Su confiabilidad y robustez la hacen ideal para la gestión de datos de análisis.
    
*   **MongoDB**: Complementaremos la solución con **MongoDB**, una base de datos NoSQL. Su flexibilidad será clave para almacenar datos semiestructurados o no estructurados, como el historial de conversaciones del chatbot y los perfiles detallados de los usuarios que interactúan.
    

### **APIs de Meta (Instagram y Messenger)**

El corazón de la funcionalidad de Aura se basa en la integración con las APIs de Meta. Utilizaremos:

*   **Instagram Platform API:** Para obtener acceso a las publicaciones de la cuenta, leer los comentarios y las interacciones.
    
*   **Messenger Platform API:** Para enviar las respuestas automáticas a los usuarios a través del chatbot.
    

### **Inteligencia Artificial**

Se integrará un modelo de **IA** para el procesamiento del lenguaje natural (NLP) que permitirá al chatbot:

*   **Analizar y categorizar** el contenido de los comentarios (ej. "vacante", "evento", "pregunta laboral").
    
*   **Generar respuestas** coherentes y automáticas basadas en la categoría detectada.
    

Análisis y Visualización
---------------------------

La aplicación incluirá un panel de control donde se presentarán análisis y estadísticas detalladas. Estas métricas se filtrarán por días, semanas o meses, y se mostrarán:

*   El número total de reacciones por publicación.
    
*   El número de chats activos.
    
*   Un desglose de las interacciones por categoría (laboral, vacantes, etc.).

### APIS
-------
Para el desarrollo del proyecto se haran uso de las siguientes API de Meta:
* **API de la plataforma de Instagram (Instagram Platform API):** Esta es la API principal que te permitirá acceder a tus publicaciones, los comentarios y las "reacciones" (likes). También te permitirá leer los comentarios para luego poder analizarlos. 
* **API de la plataforma de WhatsApp Business / API de Messenger:** Para el componente de Cabot que escribirá automáticamente, necesitarás la API de mensajería de Meta. La elección entre la API de WhatsApp y la de Messenger depende de la plataforma donde quieras que ocurra la conversación con los usuarios. 
* **API Graph:** Esta es la API base de Meta que te servirá como una herramienta para obtener IDs de usuarios, IDs de cuentas de negocio de Instagram y otra información crucial que necesitarás para construir las llamadas a las APIs de Instagram y de mensajería. 
* **API de Marketing (Marketing API):** Si bien no es estrictamente necesaria para la funcionalidad básica que describiste (escuchar y responder), es relevante para el análisis y las estadísticas de tus publicaciones. Si quieres ir más allá de los "likes" y comentarios y obtener datos más profundos de las impresiones y el alcance, esta API es muy útil. 