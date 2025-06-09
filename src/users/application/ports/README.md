# ports

Aquí se definen los puertos (interfaces) de entrada y salida de la aplicación. Los puertos permiten abstraer la lógica de negocio de los detalles de infraestructura, facilitando la conexión con adaptadores externos.

**Ejemplo de archivo:**

- `user-command.port.ts`: Interfaz para comandos de usuario (crear, actualizar, eliminar).
- `user-query.port.ts`: Interfaz para consultas de usuario (obtener por ID, listar usuarios, etc.).
