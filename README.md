# Eventify

## Descripción general

**Eventify** es una plataforma SaaS para la gestión integral de eventos y la venta digital de entradas. Permite a organizadores crear eventos, administrar el inventario de tickets y validar accesos mediante códigos QR, mientras que los usuarios pueden comprar, recibir y usar sus entradas de forma segura y sencilla.

El sistema está diseñado con una **arquitectura hexagonal**, que separa claramente el dominio del negocio, los casos de uso, los puertos y adaptadores, facilitando la escalabilidad, mantenibilidad y testabilidad.

---

## Objetivos

- Facilitar la creación y gestión de eventos por parte de organizadores.
- Permitir la compra digital y reserva segura de entradas.
- Generar y validar códigos QR para control de acceso.
- Proveer estadísticas y notificaciones para mejorar la experiencia de usuario y organizador.
- Garantizar seguridad y separación de responsabilidades con arquitectura hexagonal.

---

## Funcionalidades principales

### 1. Gestión de usuarios y autenticación

- Registro y login con roles diferenciados (organizador, asistente).
- Autenticación basada en JWT y opciones OAuth (Google, GitHub).

### 2. Gestión de eventos

- Crear, editar y eliminar eventos con detalles: nombre, descripción, fecha, ubicación y aforo.
- Visualización de lista de eventos propios para organizadores.

### 3. Venta y reserva de entradas

- Comprar tickets disponibles para eventos.
- Control de stock de entradas para evitar sobreventa.
- Generación automática de códigos QR únicos para cada ticket.

### 4. Validación de tickets

- Escaneo y validación de códigos QR en punto de acceso.
- Registro de asistencia y validación en tiempo real.

### 5. Notificaciones

- Envío de correos electrónicos y SMS con confirmaciones de compra y recordatorios.
- Notificaciones en tiempo real para organizadores sobre ventas y accesos.

### 6. Estadísticas

- Dashboard con resumen de ventas, ingresos y asistencia para organizadores.

---

## Arquitectura del sistema

La arquitectura hexagonal (Ports & Adapters) divide el sistema en capas:

### 1. Dominio

- Entidades principales: `User`, `Event`, `Ticket`, `Order`, `QRCode`.
- Lógica de negocio pura, sin dependencia de frameworks ni tecnologías externas.

### 2. Casos de uso (Application Layer)

- Orquestan acciones del dominio y validan reglas de negocio.
- Ejemplos: `CreateEventUseCase`, `BuyTicketUseCase`, `ValidateTicketUseCase`.

### 3. Puertos

- Interfaces abstractas para entrada (API REST, WebSocket) y salida (repositorios, servicios externos).
- Facilitan la independencia tecnológica y permiten mocks para pruebas.

### 4. Adaptadores

- Implementaciones concretas de puertos.
- Ejemplos:
  - Repositorios con Prisma + PostgreSQL.
  - Servicios externos: Stripe para pagos, Twilio para SMS, Nodemailer para email.
  - REST controllers para la API.

---

## Tecnologías utilizadas

| Componente     | Tecnología                       |
| -------------- | -------------------------------- |
| Frontend       | Next.js, React, TailwindCSS      |
| Backend        | NestJS / Spring Boot (hexagonal) |
| Base de datos  | PostgreSQL                       |
| Autenticación  | JWT, OAuth (Google, GitHub)      |
| Pagos          | Stripe                           |
| Notificaciones | Twilio (SMS), Nodemailer (email) |
| Validación QR  | Librería QR (backend & frontend) |

---

## Flujo básico de compra y validación de ticket

1. Usuario registrado inicia sesión y navega eventos.
2. Selecciona evento y cantidad de tickets.
3. Backend valida stock y procesa pago vía Stripe.
4. Se genera ticket con código QR único.
5. Ticket se envía por email y SMS al usuario.
6. En el evento, el código QR se escanea y valida contra sistema.
7. Se registra asistencia y se actualiza el estado del ticket.

---

## Estructura de carpetas (Backend)

```
src/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── services/
├── application/
│   ├── use-cases/
│   └── dtos/
├── adapters/
│   ├── in/
│   │   ├── rest/
│   │   └── websocket/
│   └── out/
│       ├── database/
│       ├── payment/
│       ├── notification/
│       └── qr/
├── infrastructure/
│   ├── config/
│   └── security/
└── main.ts
```

---

## ¿Cómo contribuir?

- Clona el repositorio.
- Instala dependencias.
- Ejecuta tests unitarios y de integración.
- Sigue los patrones de arquitectura hexagonal.
- Realiza pull requests con descripciones claras.

---

## Próximos pasos

- Implementar tests automáticos para todos los casos de uso.
- Añadir integración con pasarelas de pago adicionales.
- Extender funcionalidades de gamificación para asistentes.
- Mejorar dashboard con analíticas avanzadas.

---

Si quieres, te puedo ayudar a crear el código base o el roadmap de desarrollo paso a paso. ¿Quieres?
