### La memoria (los volúmenes o _volumes_)

Por defecto, todo lo que ocurre dentro de un contenedor (archivos creados, bases de datos generadas, configuraciones guardadas) **se pierde al detenerlo o eliminarlo**, ya que los contenedores son efímeros y no están diseñados para conservar el estado de lo que contienen.

Para resolver esto, usamos los **volúmenes**, espacios de almacenamiento persistente gestionados por la plataforma de contenedorización. Un volumen vive fuera del ciclo de vida del contenedor, lo que significa que los datos que allí se guardan permanecen incluso si el contenedor se detiene, se borra o se reemplaza. Esto es fundamental cuando necesitamos conservar archivos como bases de datos, archivos subidos o configuraciones que deben mantenerse entre reinicios o despliegues.

Además, los volúmenes permiten desacoplar el estado de la aplicación, lo cual no solo facilita compartir datos y estados entre varios contenedores, sino también replicar un entorno idéntico en distintas instancias. Un volumen puede tanto interceptar una ruta específica dentro del contenedor y almacenar los cambios que ocurren allí, o, servir para la carga de archivos o estados iniciales, como esquemas de base de datos o configuraciones externas, de forma flexible y reutilizable.

Hay varias formas de crear un volumen, la mas explícita y didáctica es --mount, ya luego veremos una un poco más práctica:

```bash
#      Especificamos donde ocurre la acción 
#      |
docker volume create mi-volumen
#             |       \
#             sobra    nombre que daremos 
#             decir    al volumen

# Los volúmenes creados así, normalmente se almacenan en
# la configuración del docker del host en el directorio:
#    /var/lib/docker/volumes/[NOMBRE DEL VOLUMEN]/_data/

#          Indica que vamos a montar un volumen
#          |                                            nombre imagen
docker run --mount \ #                                  |
 type=volume,source=mi-volumen,destination=/app/data my-image
#   |           |                 |
#   Especifica  Espefica el       Especifica la ruta
#   el tipo     volumen           que intercepta

# también pueden estar ubicados dentro de otro directorio
docker run --mount \
    type=bind,source=/ruta/en/host,target=/app/data mi-imagen
#   |         |                    |
#   Enlaza    Path en el host      Ruta que intercepta
#   la ruta
```

Pero esta es una forma un poco engorrosa, acá están las versiones más concisas y utilizadas para el comando:

```bash
# 1. anonimo:
# se crea al momento de crear el contenedor
#
#           Bandera para indicar que lo que sige es la asignación
#           de un volumen al contenedor que se va poner en marcha
#           |
docker run -v /app/data mi-imagen
#             |
#             ruta que intercepta
# 
# El nombre de los volúmenes creados así es un hash, que se puede
# ver de la siguiente forma:
docker inspect [NOMBRE-O-ID-DEL-CONTENEDOR]
# que retorna un json, dentro del cual buscamos en mount o volumes:
# "Mounts": [
#   {
#     "Type": "volume",
#     "Name": "e3b3d97c9d...",
#     "Destination": "/app/data"
#   }
# ]

# 2. con nombre:
# el volumen puede ser creado o no previamente 
# con docker volume create... si el nombre asignado no 
# existe dentro de los volúmenes reconocidos por docker, este
# crea uno automáticamente...
#
#           Bandera para indicar que lo que sige es la asignación
#           de un volumen al contenedor que se va poner en marcha
#           |
docker run -v mi-volumen:/app/data mi-imagen
#             |          |
#          nombre        ruta que deseo interceptar
#          del volumen
#          que creé o deseo crear 
#          automaticamente

# 3. enlazar un directorio del host:
# en este caso, el path ya debe existir dentro del host
#
#           Bandera para indicar que lo que sige es la asignación
#           de un volumen al contenedor que se va poner en marcha
#           |
docker run -v /ruta/en/host:/app/data mi-imagen
#              |             |
#              path          ruta que deseo interceptar
```

Aunque también podemos crear un volumen desde el `Dockerfile`, no es recomendable pues crea un volumen anónimo, y la gestión de volúmenes anónimos es bastante engorroso y suele generar bastantes volúmenes huérfanos (volúmenes sin un contenedor asignado)...

```Dockerfile

# configuración previa de la imagen

VOLUME /ruta/que/quiero/interceptar

# resto de la configuración de la imagen

```

otros comandos útiles para la gestion de volúmenes:

```bash
#             Muestra un listado de los 
#             volúmenes disponibles en el host
#             |
docker volume ls
#      |
#      establece el contexto de trabajo del comando

docker volume inspect mi-volumen
#             |              \
#         Muestra la          Nombre del volumen
#         ruta del volumen 
#         y en qué contenedores está usado.

docker volume rm mi-volumen
#             |
#             Borra la imagen especificada

docker volume prune
#             |
#             Borra todos los volúmenes que no están 
#             asignados a un contenedor
```

[Siguiente: Rendimiento y publicación](./rendimiento_y_publicacion.md)

[Volver al índice](../README.md#contenidos)
