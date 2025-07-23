## Resumen de Comandos

Para facilitar la consulta, aquí tienes una lista consolidada de los comandos más importantes que hemos visto a lo largo de esta guía:

### Gestión de Imágenes

* `docker images` o `docker image ls`: Muestra las imágenes disponibles.
* `docker pull [imagen]`: Descarga una imagen desde un registro.
* `docker build -t [nombre] .`: Construye una imagen a partir de un `Dockerfile`.
* `docker tag [imagen] [nuevo-nombre]`: Etiqueta una imagen.
* `docker push [imagen]`: Publica una imagen en un registro.
* `docker rmi [imagen]`: Borra una imagen.

### Gestión de Contenedores

* `docker run [imagen]`: Crea y ejecuta un contenedor.
* `docker run -d [imagen]`: Ejecuta el contenedor en segundo plano (`detached`).
* `docker run -p [host-puerto:container-puerto] [imagen]`: Mapea un puerto.
* `docker run -e [KEY=VALUE] [imagen]`: Pasa variables de entorno.
* `docker run --name [nombre] [imagen]`: Asigna un nombre al contenedor.
* `docker ps`: Muestra los contenedores en ejecución.
* `docker ps -a`: Muestra todos los contenedores (activos e inactivos).
* `docker stop [id/nombre]`: Detiene un contenedor de forma elegante.
* `docker kill [id/nombre]`: Detiene un contenedor de forma forzada.
* `docker rm [id/nombre]`: Borra un contenedor (si no está en ejecución).
* `docker exec -it [id/nombre] /bin/sh`: Entra en una terminal dentro del contenedor.

### Gestión de Volúmenes y Redes

* `docker volume ls`: Lista los volúmenes.
* `docker volume create [nombre]`: Crea un volumen con nombre.
* `docker volume rm [nombre]`: Borra un volumen.
* `docker volume prune`: Borra volúmenes no usados.
* `docker network ls`: Lista las redes.
* `docker network create [nombre]`: Crea una red personalizada.
* `docker run --network [nombre-red] [imagen]`: Conecta un contenedor a una red.

### Docker Compose

* `docker compose up -d`: Inicia el stack de servicios en segundo plano.
* `docker compose down`: Detiene y elimina los servicios.
* `docker compose build`: Reconstruye las imágenes de los servicios que usan `build`.
* `docker compose exec [servicio] [comando]`: Ejecuta un comando en un servicio.

FIN!!!

[subir al indice](#contenidos)
