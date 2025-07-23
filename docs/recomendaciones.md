# Recomendaciones

* **Usa imágenes ligeras**: Opta por imágenes como `alpine` (por ejemplo, `node:18-alpine` o `python:3.9-alpine`) en tus `Dockerfile`. Son mucho más pequeñas, lo que reduce los tiempos de descarga y el uso de recursos.
* **Mantén tus imágenes limpias**: Usa el comando `docker system prune` para limpiar imágenes, contenedores, volúmenes y redes no utilizados. Esto libera espacio en el disco duro de forma segura.
* **Prioriza `docker compose`**: A menos que solo necesites un único contenedor, usa siempre Docker Compose. Centraliza la configuración de tu aplicación, facilita la replicación de entornos y simplifica la gestión de servicios interconectados.
* **Versiona tus imágenes**: Aunque uses `latest` para el desarrollo local, en producción siempre usa un `tag` específico (por ejemplo, `mi-app:1.2.3`). Esto asegura que tus despliegues sean predecibles y evita cambios inesperados si una nueva versión de la imagen base introduce problemas.
* **No guardes secretos en tu `Dockerfile`**: Nunca incluyas credenciales sensibles (claves, keys, contraseñas) en tu `Dockerfile`. Usa las variables de entorno en la ejecución.  En entornos de producción puedes usar las herramientas de gestión de secretos de las plataformas de orquestación que uses (como Kubernetes o Docker Swarm).
* **Prueba en tu entorno local**: Antes de hacer _push_ o desplegar, siempre prueba tus contenedores en tu máquina para asegurar que todo funciona como esperas.

[Siguiente: Resumen de Comandos](./resumen_de_comandos.md)

[Volver al listado de contenidos](../README.md#contenidos)
