# repositories

En esta carpeta se definen las interfaces de los repositorios del dominio. Un repositorio es responsable de abstraer el acceso a la persistencia de las entidades, pero aquí solo se definen las interfaces, no las implementaciones.

**Ejemplo de archivo:**

- `user.repository.ts`: Define la interfaz `UserRepository` con métodos como `findById`, `save`, `delete`, etc.
