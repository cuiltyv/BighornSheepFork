Documentación de Diseño de Sistema para DREAM Lab

Modificación: 14 de marzo de 2024

# Documentación de Diseño de Sistema para DREAM Lab

## Modificación: 14 de marzo de 2024

## 1. Introducción

### 1.1 Propósito

Este documento contiene los requerimientos de alto nivel para el sistema de reservaciones a ser usado en el D.R.E.A.M. Lab preparado para el Tec de Monterrey. Las especifaciones técnicas para este proyecto han sido definidas a través de varias juntas entre el equipo de desarrllo y el cliente final. El proyecto implementará las funcionalides de registro y reservación de espacios, tanto para estudiantes como para profesores.

### 1.2 Alcance

Detallar el alcance del sistema o subsistema que el documento cubre.

El documento abarca el sistema de reservaciones del D.R.E.A.M. Lab, desde los componentes del Front End, hasta los que pertenecen al Back End y los servicios externos que se implementan.

### 1.3 Definiciones, Acrónimos y Abreviaturas

Proporcionar definiciones para todos los términos, acrónimos y abreviaturas utilizados en el documento para asegurar que todos los lectores interpreten la información de manera uniforme.

Usuario: Un estudiante inscrito en el Tecnológico de Monterrey.

D.R.E.A.M. Lab: Laboratorio para el cual se construye el sistema de reservaciones.

### 1.4 Referencias

Listar todos los documentos referenciados en el SDD. Incluir títulos y fechas de publicación.

### 1.5 Resumen

Ofrecer un resumen del SDD, incluyendo las principales decisiones de diseño y arquitectura que se detallarán en el documento.

## 2. Descripción General del Sistema

### 2.1 Perspectiva del Producto

La arquitectura de sistema describirá a un alto nivel los métodos generales que los diferentes componentes de la aplicación usarán para comunicarse, y el desglose de los servicios del sistema que se usaran para poder crear el funcionamiento correcto apegado a estándares.

El sistema de reservaciones del D.R.E.A.M. Lab es una solución que integra distintos componentes y funcionalidades, diseñado principalmente para facilitar la gestión de reservaciones de espacios físicos como talleres y laboratorios pertenecientes al D.R.E.A.M. Lab. Este sistema cuenta con una arquitectura que permitirá futuras expansiones e integración de nuevas funcionalidades.

### 2.2 Funciones del Producto

- **Reservación de Espacios y Recursos**: Permite a los usuarios reservar espacios, talleres y equipos específicos dentro del D.R.E.A.M. Lab de manera eficiente, permitiendo especificar los alumnos adicionales que harán uso de las instalaciones, la fecha y hora de la reservación así como el equipo adicional que será utilizado.
- **Soporte de Proyectos Multidisciplinarios**: Facilita la colaboración entre estudiantes de diferentes disciplinas a través de herramientas de gestión de proyectos y comunicación.
- **Análisis y Reportes**: Genera informes detallados sobre el uso de recursos, ocupación de espacios y progreso de proyectos, para optimizar la gestión del laboratorio. Los administradores del sistema tendrán acceso a un dashboard que desplegará tal información.

### 2.3 Características y Restricciones del Usuario

Los usuarios finales del sistema incluyen estudiantes, profesores y personal administrativo del laboratorio. Este grupo de usuarios abarca un amplio rango de edades y  diferentes habilidades tecnológicas.

Es posible que algunos usuarios tengan una experiencia limitada con tecnología, por lo que la interfaz debe ser intuitiva y fácil de usar. Además, la plataforma debe ser responsiva para que sea accesible en dispositivos distintos.

### 2.4 Suposiciones y Dependencias

Se asume que todos los usuarios tienen acceso a Internet para utilizar el sistema de reservaciones.

El sistema dependerá de la infraestructura tecnológica que ya existe en el Tecnológico de Monterrey.

## 3. Diseño de la Arquitectura

### 3.1 Representación Arquitectónica

Describir el modelo arquitectónico elegido para el sistema, incluyendo estilos, patrones y estrategias de diseño utilizados.

![DiagramaER](https://imgur.com/3E3Uv9w)


## 3.1.2 Stack Tecnológico

## Stack Tecnológico

### Front-end

- Desarrollo
    - React
    - TSX
    - JSX
    - Vite
    - Axios
- Estilos
    - Tailwind
    - Prettier
- Librerías
    
    
    ```
      	"@fortawesome/fontawesome-svg-core": "^6.5.2",
        "@fortawesome/free-brands-svg-icons": "^6.5.2",
        "@fortawesome/free-regular-svg-icons": "^6.5.2",
        "@fortawesome/free-solid-svg-icons": "^6.5.2",
        "@fortawesome/react-fontawesome": "^0.2.0",
        "@heroicons/react": "^1.0.0",
        "@radix-ui/react-label": "^2.0.2",
        "@radix-ui/react-slot": "^1.0.2",
        "axios": "^1.6.8",
        "class-variance-authority": "^0.7.0",
        "clsx": "^2.1.0",
        "formik": "^2.4.5",
        "gh-pages": "^6.1.1",
        "lucide-react": "^0.368.0",
        "react": "^18.2.0",
        "react-cookie": "^7.1.4",
        "react-dom": "^18.2.0",
        "react-icons": "^5.0.1",
        "react-router-dom": "^6.22.3",
        "tailwind-merge": "^2.2.2",
        "yup": "^1.4.0"
    ```
    
- Testing
    - Cypress
    

### Back-end

ExpressJS → API Gateway Service

Mocha & Chai → Unit Testing

Javascript → Programming Language

MSSQL  → Conexión a base de Datos

# Base de Datos

Stored procedures:

- registroUsuario
- SelectAllSalas
- sp_ClearRefershToken
- sp_DeleteReservacion
- sp_GetAllReservaciones
- sp_GetAllSalas
- sp_GetAllUsuarios
- sp_GetReservacionByID
- sp_GetReservacionesNotDeleted
- sp_GetStats
- sp_GetUpcomingReservaciones
- sp_GetUserByRefreshToken
- sp_GetUserRoles
- sp_GetUsuarioByMatricula
- sp_GetUsuarioPerfilByMatricula
- sp_InsertAlumnoReservacion
- sp_InsertCompleteReservacion
- sp_InsertReservacion
- sp_InsertReservacionHardware
- sp_InsertUsuario
- sp_LoginUser
- sp_RefreshTokenSet
- sp_SetReservacionDeleted
- sp_UpdateReservacion
- sp_UserLogin
- Librerías
    - Prod
    
    ```json
        "bcrypt": "^5.1.1",
        "cookie-parser": "^1.4.6",
        "cors": "^2.8.5",
        "dotenv": "^16.4.5",
        "express": "^4.19.2",
        "jsonwebtoken": "^9.0.2",
        "mssql": "^10.0.2",
    ```
    
    - Dev
    
    ```
       "nodemon": "^3.1.0"
    ```
    

### AI Service

Python
FastAPI → API Gateway service

GPT 3.5 OpenAI API → LLM Model

### Call Service

Twilio Service

### ~~3.2 Descomposición del Sistema~~

~~Detallar la descomposición del sistema en subsistemas y componentes, incluyendo una descripción de la funcionalidad de cada uno.~~

### ~~3.3 Diseño de la Interfaz~~

~~Describir las interfaces entre los componentes del sistema, incluyendo tipos de datos, mecanismos de comunicación y protocolos.~~

### ~~3.4 Diseño de Datos~~

~~Detallar el diseño de la estructura de datos, incluyendo modelos de datos, diagramas de entidad-relación y cualquier consideración de persistencia de datos.~~

## 4. Detalles del Diseño
![DiagramaER](https://i.imgur.com/3E3Uv9w.png)


### 4.1 Detalles de los Componentes del Sistema

- **Front-end**: Aquí es donde los usuarios interactúan con el sistema. Se compone de la "Comunicación", que incluye WhatsApp y Llamada, como medios de comunicación con el sistema, y la "Página Web" que incluye la "Web App".
- **Back-end**: Sirve como el núcleo de procesamiento del sistema, se encarga de las operaciones lógicas y de datos. Incluye:
    - "Acceso Seguro" que parecería manejar autentificaciones y podría estar relacionado con la gestión de "Secrets API Key" y un "Certificado de seguridad".
    - "Lógica de Negocio" con "Gestión de reservación", "Gestión de datos", y "Webhooks", posiblemente para la lógica y la manipulación de la información que fluye a través del sistema.
- **Datos**: Se muestra un componente que es "MySQL", lo que muestra que el sistema utiliza MySQL como su base de datos relacional.
- **Testing**: Contiene un componente llamado "Cypress," que es una herramienta de pruebas de extremo a extremo para aplicaciones web.
- **Servicios externos**: Incluye un servicio llamado "Servicio de WhatsApp y llamada: Twilio", lo que demuestra la integración con Twilio para el manejo de comunicaciones por whatsapp y llamada.
- **Componentes de IA**: Contiene "Dialogflow CX" y "Open AI", indicando que se usan servicios de inteligencia artificial para algunas operaciones dentro del sistema.

### 4.2 Detalles de la Interfaz del Usuario

Describir el diseño de la interfaz de usuario, incluyendo mockups, flujos de usuario y elementos de interacción.

Seguir el siguiente link para ver los mockups de figma

[Branding & Design Syste](https://www.notion.so/Branding-Design-Syste-79532082125e4024b703a243ade88aa2?pvs=21)m 

## 5. Atributos de Calidad del Sistema

### 5.1 Eficiencia de desempeño

El sistema de reservación debe presentar una eficiencia al implementar sus funcionalidades. 

**Utilización de recursos:** utilizar técnicas de caching para datos que sean requeridos frecuentemente y optimizar consultas a la base de datos son dos estrategias que usaremos para utilizar recursos más eficientemente. 

### 5.2 Seguridad

El sistema implementa múltiples capas de seguridad para proteger los datos de los usuarios y la integridad del sistema. 

**Autenticidad**: Se empleará un mecanismo de autenticación basado en tokens, donde la librería de Python **`Secret`** jugará un papel crucial generando números secretos aleatorios únicos para cada sesión de usuario, asegurando que solo los usuarios autorizados puedan acceder a sus cuentas. 

**Integridad:** El sistema va a asegurarse que no se puedan modificar los datos de las reservaciones o de los usuarios frente a modificaciones o eliminaciones no autorizadas por medios de seguridad, los únicos que tendrán accesso a realizar modificaciones van a ser los administradores.

**Confidencialidad:** Los datos nada mas van a ser accesibles para los usuarios con autorización, para los administradores y para los usuarios a los cuales les pertenezcan los datos

### 5.3 Mantenibilidad

El sistema podrá ser modificado y actualizado eficientemente por futuros desarrolladores si se presenta necesidad de hacerlo.

**Modularidad:** Para demostrar el atributo de calidad de mantenibilidad, el cual es fundamental para este sistema, el sistema utiliza una arquitectura que permite aislar y actualizar los componentes individualmente, es decir, sin afectar al resto del sistema. 

**Reusabilidad:** De la misma manera, una documentación completa y actualizada del código, los servicios API y la arquitectura del sistema, será crucial para facilitar la comprensión y la modificación del código en un futuro.

**Capacidad de ser modificado:** Se se seguirán prácticas de codificación estándar, así como herramientas de revisión para mantener la calidad del código con el fin de simplificar la detección y corrección de errores.

### 5.4 Otras Consideraciones

Discutir otros atributos de calidad relevantes, como la fiabilidad, la escalabilidad y la usabilidad.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/1955db18-85bf-4d26-8193-e6ed9e35937b/e011e7d3-07fa-4e98-be7d-6d43215b2474/Untitled.png)

https://iso25000.com/index.php/normas-iso-25000/iso-25010 

## 6. Otros

### 6.1 Problemas Abiertos

Identificar y discutir cualquier problema de diseño que permanezca sin resolver o que requiera decisiones futuras.

### 6.2 Riesgos y Mitigaciones

Enumerar los riesgos identificados para el proyecto de diseño y las estrategias para mitigarlos.

### 6.3 Planes Futuros

Esbozar cualquier trabajo futuro previsto para el diseño o desarrollo del sistema.

### 6.4 Apéndices

Incluir cualquier información adicional relevante, como glosarios, índices y registros de revisiones del documento.
