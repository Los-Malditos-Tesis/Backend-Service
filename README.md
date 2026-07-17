# Backend-Service
Backend centralizado del sistema automatizado de gestión de inventarios basado en tecnologías IoT, códigos QR GS1 y visión artificial.

Este servicio es responsable de coordinar la comunicación entre los dispositivos IoT, los servicios de procesamiento de imágenes, la base de datos y la interfaz web de administración. Además, implementa la lógica de negocio relacionada con la gestión de inventarios, localización de productos, procesamiento de movimientos de entrada y salida, validación de órdenes y trazabilidad de productos dentro de la bodega.

---

## 📑 Tabla de Contenidos

- Descripción del Proyecto  
- Objetivos  
- Arquitectura del Sistema  
- Tecnologías Utilizadas  
- Requisitos Previos
- Instalación y Configuración
- Ejecución

---

## 📌 Descripción del Proyecto
El backend forma parte de una solución tecnológica orientada a la automatización del control y localización de inventario dentro de bodegas logísticas.

El sistema integra dispositivos IoT, tecnologías de visión artificial y comunicación en tiempo real para automatizar procesos tradicionalmente realizados de forma manual.

Entre sus principales responsabilidades se encuentran:

* Administración de productos y categorías.
* Gestión de bodegas y zonas de almacenamiento.
* Registro y consulta de inventario.
* Procesamiento de movimientos de entrada y salida.
* Validación de órdenes de salida.
* Gestión de usuarios y roles.
* Coordinación de búsquedas mediante dispositivos ESP32-CAM.
* Procesamiento de eventos provenientes de dispositivos IoT.
* Comunicación mediante protocolo MQTT.
* Registro histórico y trazabilidad de productos mediante códigos QR GS1.

---

## 🎯 Objetivos
**Objetivo General**

Centralizar el procesamiento y administración de la información generada por los dispositivos IoT y servicios de visión artificial para mantener actualizado el inventario de manera automática y en tiempo real.

**Objetivos Específicos**

* Gestionar productos, categorías y zonas de almacenamiento.
* Administrar movimientos de entrada y salida de inventario.
* Coordinar la localización de productos mediante cámaras distribuidas por zonas.
* Validar órdenes de salida y movimientos autorizados.
* Mantener la trazabilidad de productos mediante códigos QR GS1.
* Facilitar la comunicación entre los componentes del sistema mediante MQTT.

---

## 🏗 Arquitectura del Sistema

El backend se comunica con los siguientes componentes:

1. Aplicación Web de Administración.
2. Dispositivos ESP32-CAM.
3. Raspberry Pi.
4. Servicio de Visión Artificial.
5. Broker MQTT.
6. Base de Datos PostgreSQL.

---

## 🛠 Tecnologías Utilizadas

El backend está desarrollado utilizando tecnologías modernas orientadas a la construcción de aplicaciones escalables, seguras y preparadas para entornos IoT.

### Backend

- **Node.js (v18+)**
  Entorno de ejecución para JavaScript del lado del servidor.

- **Express (v5)**
  Framework utilizado para la construcción de APIs RESTful.

### Persistencia de Datos

- **PostgreSQL**
  Sistema de gestión de bases de datos relacional.

- **Sequelize**
  ORM para modelado y acceso a datos.

### Seguridad

- **JWT (JSON Web Token)**
  Autenticación y autorización basada en tokens.

- **bcryptjs**
  Cifrado seguro de contraseñas.

- **express-validator**
  Validación y sanitización de datos de entrada.

### Comunicación IoT

- **MQTT**
  Comunicación bidireccional entre dispositivos IoT y servicios backend.

### Utilidades

- **dotenv**
  Gestión de variables de entorno.

- **cors**
  Configuración de acceso entre dominios.

- **http-errors**
  Manejo centralizado de errores HTTP.

- **Pino**
  Registro y monitoreo de eventos del sistema.
---

## 📋 Requisitos Previos

Antes de ejecutar el proyecto, asegúrese de tener instalado:

- Node.js 18 o superior.
- npm 9 o superior.
- PostgreSQL 14 o superior.
- Broker MQTT (Mosquitto recomendado).
- Git.

Verificar instalaciones:

```bash
node -v
npm -v
psql --version
```

---

## ⚙️ Instalación y Configuración

### Clonar Repositorio

```bash
git clone https://github.com/Los-Malditos-Tesis/Backend-Service.git
```

### Ingresar al Proyecto

```bash
cd Backend-Service
```

### Instalar Dependencias

```bash
npm install
```
---

## ▶️ Ejecución

### Modo Desarrollo
```bash
npm run dev
```

### Modo Producción
```bash
npm run start
```

---