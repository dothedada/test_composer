## Conceptos

### ¿Para qué la contenedorización?

Al contenedorizar una aplicación, empaquetamos no solo su código, sino también todo lo que necesita para funcionar: librerías, configuraciones, binarios, etc. Todo eso va dentro del contenedor lo que nos proporciona varias ventajas:

* **Portabilidad:** el contenedor se puede ejecutar en cualquier máquina que tenga Docker (u otro runtime compatible), sin importar el sistema operativo subyacente o su configuración.
* **Consistencia:** el entorno de desarrollo es el mismo que el de producción. Así se evita el clásico “en mi máquina sí funciona”.
* **Aislamiento:** los contenedores corren de forma independiente unos de otros, lo que permite ejecutar múltiples aplicaciones en paralelo sin que interfieran entre sí... o... relacionar varios contenedores de forma subyacente para su funcionamiento sin exponer partes que deseamos mantener privadas.
* **Escalabilidad:** como son livianos, se pueden crear, detener o replicar rápidamente, lo cual facilita escalar aplicaciones en la nube o en entornos distribuidos.

[subir al indice](#contenidos)

### Intro: Máquinas, VM y contenedores

Sin entrar mucho en detalles, partiremos de que un computador es, una **máquina**, con un procesador, una RAM y un disco duro, que son administrados por un sistema operativo, sobre el cual corren nuestras aplicaciones. Estas aplicaciones solicitan recursos de memoria y cómputo a la máquina por medio del sistema operativo para ejecutarse correctamente.

Una **máquina virtual (VM - Virtual Machines)** emula todo el hardware de un computador. Esto permite instalar un sistema operativo completo dentro de otro, como si fuese un computador dentro de otro y usar los recursos del computador donde corre de forma compartida con otras VM. Cada VM tiene su propio kernel, su propio sistema de archivos y acceso virtualizado a recursos como red, disco o CPU. Esto garantiza un entorno completamente aislado, pero con un costo: levantar una VM implica cargar un sistema operativo completo, lo cual consume más tiempo y recursos.

![arquitectura de una máquina virtual](./imgs/ArquitecturaVM.png)

Un **contenedor**, en cambio, no emula hardware ni instala un sistema operativo completo. Contenedoriza una aplicación junto con sus dependencias y la ejecuta directamente sobre el sistema operativo del de la máquina, compartiendo el mismo kernel. Cada contenedor se ejecuta en un entorno aislado gracias a mecanismos como _namespaces_ (para separar procesos, red, usuarios, etc.) y _cgroups_ (para limitar el uso de recursos).

![arquitectura de la contenedorizacion](./imgs/ArquitecturaContenerizador.png)

> [!NOTE]
> Desde dentro, un contenedor se "siente" como una máquina independiente, pero en realidad está compartiendo recursos del sistema anfitrión de forma segura y eficiente. Por eso, los contenedores son mucho más ligeros y rápidos que las máquinas virtuales.

[subir al indice](#contenidos)

### Cómo funciona esto

#### AIUUURAAA (_--help_)

Uno de los comandos más útiles en Docker (y en muchas herramientas de línea de comandos) es `--help`.

Casi todos los comandos de Docker incluyen su propia ayuda integrada, accesible así:

```bash
docker [COMANDO] --help
```

Esto te mostrará una descripción del comando, sus opciones disponibles y algunos ejemplos. Es especialmente útil cuando estás explorando nuevas funcionalidades o necesitas un recordatorio rápido sin salir de la terminal.

Por ejemplo:

```bash
docker run --help
# Te mostrará la anatomía del comando, 
# una descripción de lo que hace, sus alias y todas las banderas
# disponibles para este, como `--name`, `--volume`, `--rm`, ..., 
# junto a una breve descripción de lo que hace cada una.
```

Lo mejor de este comando, es que funciona sobre cada nivel de especificidad en la instrucción de la cual necesitamos información.

```bash
docker --help

docker ps --help

docker compose --help

docker volume rm --help

# ...
```

**Si no recuerdas exactamente cómo usar algo en Docker, empieza con `--help`. Es una guía inmediata, fácil y siempre actualizada.**

[subir al indice](#contenidos)

#### Los planos (imágenes o _images_)

Uno de los fuertes de la contenedorización es la replicabilidad y la escalabilidad, es por esto que necesitamos unos planos consistentes que permitan generar cuantos contenedores necesitemos con exactamente la misma información. Acá es donde entran las _imágenes (images)_.

Una **imagen** es un archivo inmutable (de sólo lectura / readonly) que contiene todo lo necesario para ejecutar una aplicación: el sistema de archivos, las dependencias, configuraciones, variables de entorno, scripts de inicio, etc. Es como una plantilla del entorno que queremos replicar.

Es posible trabajar trabajar con imágenes creadas y optimizadas por otros...

```bash
#      comando para importar un contenedor
#      |
docker pull docker/getting-started
#           |
#           ruta a la ubicación de la imagen

# anatomía de la ubicación de las imágenes:
# docker pull [REGISTRO/][USUARIO/]REPO[:TAG]

docker pull ubuntu
# usa Docker Hub por defecto, imagen oficial `ubuntu`, última versión

docker pull nginx:1.25
# imagen oficial `nginx` con un tag o etiqueta específica, si no se 
# especifica uno, equivale a imagen:latest
    
docker pull docker/getting-started 
# imagen del usuario/organización `docker`, repositorio `getting-started
# tambien puede ser entendido como nombreUsuarioHub/repositorio
    
docker pull ghcr.io/owner/repo:tag
# imagen alojada en GitHub Container Registry
    
docker pull registry.example.com/proyecto/app:latest
# imagen desde un registro privado
```

o crear nuestras propias imágenes, estas se construyen usualmente a partir de un archivo llamado `Dockerfile` (Primera en mayúscula y sin extensión) en la raíz de nuestro proyecto, que define paso a paso cómo se arma esa imagen: desde qué base parte, qué dependencias instala, qué archivos copia y qué comando ejecuta por defecto.

```dockerfile
# 1. No es necesario reinventar siempre la rueda, partimos de la imagen base
# oficial en docker hub. Es mejor partir de la imágenes oficiales, 
# pues ya están optimizadas tanto por estructura como por rendimiento,
# en este ejemplo usamos la de node y con el tag :24-alpine3.21
FROM node:24-alpine3.21

# 1.1 Asignamos las variables de entorno
# NO COLOCAR VARIABLES DE ENTORNO DELICADAS (pass o keys) ACÁ
ENV NODE_ENV=production
ENV PORT=3000

# 2. creamos y asignamos el directorio de trabajo
WORKDIR /app

# 3. copiamos los archivos base para correr la app
COPY package*.json ./

# 4. corremos la instalación de dependencias
RUN npm install

# 3.1 ahora copiamos los archivos de nuestra app
# esto es por optimización y cache, ver el párrafo siguiente
COPY . .

# Exponemos el puerto que usará la app
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]

```

El orden de los comandos en un `Dockerfile` es clave porque Docker construye la imagen paso a paso y guarda una **capa intermedia en caché** después de cada instrucción. Si un paso no ha cambiado desde la última vez, Docker reutiliza la capa en lugar de rehacerla, lo que acelera la construcción. Por eso en nuestro ejemplo (y como buena práctica) colocamos primero los pasos menos propensos a cambiar, como `COPY package*.json ./` y `RUN npm install`, antes de copiar el resto del código. Así, si solo cambias los archivos fuente pero no las dependencias, Docker podrá aprovechar el cache y evitar reinstalar todo, haciendo el proceso mucho más eficiente.

![Las capas constitutivas de una imagen](./imgs/CapasImagen.png)

una vez tenemos nuestro `Dockerfile`, podemos crear la imagen para nuestro contenedor desde el directorio donde se encuentra el archivo.

```bash
#      Comando para crear la imagen
#      |
docker build -t mi-super-duper-app-en-node:1.0.0
#            |  |                          |
#            |  nombre de la app    Tag, si especifica es 'latest' pero
#            |                      se recomienda versionado semántico
#            | 
#            Bandera para especificar nombre de la imagen
```

Las imágenes creadas con Docker se almacenan localmente en el sistema de archivos del host, dentro del espacio de almacenamiento gestionado por Docker (normalmente en `/var/lib/docker` en sistemas Linux). No se guardan como archivos visibles en el proyecto, sino como capas internas que Docker gestiona y reutiliza. Puedes verlas con el comando `docker images`, y se mantienen disponibles localmente hasta que las elimines manualmente.

```bash
#      comando para ver las imágenes disponibles en nuestro equipo:
#      |
docker images
# es lo mismo que
docker image ls
# pero docker image es el comando para acceder al scope de image

# que retorna:
# REPOSITORY     TAG               IMAGE ID       CREATED       SIZE
# nombreImagen   17.5-alpine3.22   fbe21607052b   5 weeks ago   398MB
```

> [!NOTE]
> **Imagen Vs. Contenedor**: Una **imagen** es una definición de solo lectura que actúa como plantilla para crear contenedores. Un **contenedor**, en cambio, es una instancia activa basada en esa imagen, con su propio sistema de archivos de lectura-escritura, procesos y red. Es decir, la imagen es el plano; el contenedor, la ejecución real.

[subir al indice](#contenidos)

##### Cosas que no queremos contenedorizar (_dockerignore_)

Cuando Docker construye una imagen, al usar el comando `build`, se copian todos todos los archivos del directorio especificado en la instrucción `copy` para crear el build context. Pero no siempre queremos que todo se incluya. Así como `.gitignore` le dice a Git qué archivos no debe rastrear, el archivo `.dockerignore` le indica a Docker qué archivos debe excluir al construir una imagen. este archivo nos ayuda especificar qué debe excluirse del contexto de construcción. Con esto evitamos subir archivos pesados o irrelevantes (como node_modules o dist/), aceleramos el proceso de build y protegemos archivos sensibles como .env o claves.

Un .dockerignore típico podría verse así:

```bash
node_modules
dist
*.log
.env
.git
```

[subir al indice](#contenidos)

#### La ejecución (los contenedores)

Sólo por recordar: Un **contenedor** es una instancia en ejecución de una imagen, que proporciona un entorno aislado y ligero para ejecutar una aplicación junto con todas sus dependencias. Aunque comparte el kernel del sistema operativo del host, cada contenedor tiene su propio sistema de archivos, red y procesos, lo que permite que se comporte como si fuera una máquina independiente. Esta separación asegura que las aplicaciones se ejecuten de forma consistente.

cuando ya tenemos las imágenes para nuestra aplicación, sean desde el docker hub (imágenes oficiales) o desde los builds de nuestro dockerfile, podemos ejecutarlas para crear los contenedores:

```bash
#      Inicia la construcción de la imagen
#      |
docker run mi-imagen
#          |
#          Nombre o id de mi imagen

#            Permite asignarle un nombre especial al contenedor
#            y trabajar con el usando algo mas memorable que un hash
#            |
docker run --name nombre-del-contenedor mi-imagen

# La ejecucion exitosa retorna id(hash) creado por docker del container

#           Ejecuta el comando y lo 'desacopla' de la terminal
#           |
docker run -d -p puertoA:puertoDeApp nombreUsuario/repo:tag
#              |                     
#              expone en el puertoA lo que encuentre en el puertoDeApp

# También podemos incliir las variables de entorno sensibles
#           Indica a docker que lo siguiente es un KEY=VALUE
#           para las variables de entorno
#           |
docker run -e API_KEY=1a2b3c4 -e PASSWORD=esUnSecreto ... nombre/repo
#                              |
#                              cada variable debe ir precedida por -e
```

Para detener la ejecución de uno o varios contenedores debemos conocer el id del contenedor:

```bash
#      Lista los procesos activos
#      |
docker ps

# esto nos retorna:
# CONTAINER ID  IMAGE        COMMAND  CREATED  STATUS  PORTS  ....
# 941ad3dddd8f  imgName:tag  "..."    3 days   Up...   0.0.0.0:5433 ...

#      Comando para detener la ejecución de uno o mas contenedores
#      |
docker stop 941ad3dddd8f # id_contenedor2 id_contenedor3
#           |
#           Id del container que quiero detener

# esto nos retorna los id de los contenedores detenidos
# 941ad3dddd8f

# Para detener todos los contenedores, usamos la magia de bash...
docker stop $(docker ps -q)
#                        |
#                        esta bandera hace que ps solo retorne el 
#                        listado de id

docker kill 941ad3dddd8f
#      |
#      Detiene la ejecución del contenedor a la fuerza, solo en
#      caso que 'stop' no funcione

# para ver TODOS los contenedores, activos e inactivos,
# agregamos la bandera -a
docker ps -a 
```

![ciclo de vida de un contenedor](./imgs/CicloVidaContenedor.png)

[subir al indice](#contenidos)

#### La memoria (los volúmenes o _volumes_)

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

[subir al indice](#contenidos)

#### Rendimiento y publicación

Por defecto, los contenedores usan todos los recursos disponibles del host. Sin embargo, Docker permite limitar el consumo de CPU y memoria, lo cual es muy útil en entornos de producción o cuando ejecutas múltiples contenedores en la misma máquina.

```bash
# Monitorear uso de recursos de docker
docker stats

# Muestra el estado de todos los procesos que 
# corren dentro del contenedor
docker top [NOMBRE DEL CONTENEDOR O ID]

# Limitar el uso de recursos
docker run --name app-limitada --cpus="1.0" --memory="512m" mi-app
#                                |                |
#                            proporción max      Máximo de memoria
#                            de procesamiento    disponible para
#                            disponible para     el contenedor
#                            el contenedor
```

Una vez has creado y probado tu imagen localmente, es posible compartirla con otras personas o usarla en otros entornos publicándola en un registro como Docker Hub. Para esto, necesitas tener una cuenta en hub.docker.com y haber iniciado sesión con `docker login`.

Antes de hacer _push_, es necesario etiquetar la imagen con el formato `usuario/nombre:tag`, donde `usuario` es tu nombre de usuario en Docker Hub.

```bash
# 1. Etiquetar la imagen
docker tag mi-imagen mi-usuario/mi-imagen:1.0.1 # version de mi app

# 2. Iniciar sesión
docker login

# 3. Publicar la imagen
docker push mi-usuario/mi-imagen:1.0.1
```

Una vez publicada, puedes compartir esa imagen o usarla desde cualquier parte con `docker pull`

[subir al indice](#contenidos)

### Dentro del contenedor (Terminal(ception) o _exec_)

A veces, mientras trabajamos con una aplicación en contenedores, necesitamos _entrar_ en uno de ellos para revisar qué está pasando por dentro: mirar archivos, ejecutar un comando, explorar una carpeta o correr una migración manual. Es como hacer una especie de _inception_ del terminal: estás en tu terminal, pero saltas dentro del terminal del contenedor, sin detenerlo ni modificarlo desde fuera.

Para eso existe `docker exec`, un comando que nos permite **ejecutar instrucciones dentro de un contenedor que ya está corriendo**. Esto es muy útil en tareas de desarrollo, debugging o administración, porque nos da acceso directo al entorno interno del contenedor, tal como está funcionando en ese momento.

```bash

docker exec -it mi-contenedor-o-id /bin/sh
#           |                       |
#          -i: modo interactivo     lenguaje de scripting, aunque
#          -t: asigna una           se puede bash, las imagenes ligeras
#              terminal             no lo usan, /bin/sh es ir a la fija

# el punto de insercion del CLI cambia, y para salir...
exit
```

También podemos ejecutar solo un comando sin necesidad de entrar a la terminal del contenedor:

```bash
docker exec mi-contenedor ls /app

docker exec mi-contenedor env

docker exec mi-contenedor node scripts/init-db.js
```

[subir al indice](#contenidos)

### Por fuera del contenedor (Redes o _networks_)

Los contenedores no están solos: aunque se ejecuten de forma aislada, muchas veces necesitan comunicarse entre sí o con el mundo exterior. Acá es donde entran las redes de Docker. Así como usamos volúmenes para mantener datos persistentes por fuera del contenedor, **usamos redes para conectarlos de forma controlada y predecible**.

Aunque se sale del scope de esta guía, las redes tambíen nos permiten crear un reverse proxy que nos ayude a balancear cargas, establecer estrategias de flujo o escalar y desescalar según demandas empleando imágenes como **caddy**

Por defecto, Docker crea una red llamada `bridge`, y cualquier contenedor que lances sin especificar una red personalizada se conecta allí. Esto ya permite que varios contenedores se hablen entre sí usando su nombre como si fuera una dirección. Por ejemplo, un contenedor con una base de datos puede ser alcanzado desde otro contenedor que ejecuta una app simplemente usando su nombre: `db`.

Las **redes personalizadas**, nos permiten definir exactamente qué contenedores se pueden ver entre sí, evitando colisiones de puertos y mejorando la seguridad y organización de la aplicación. Esto es clave para armar y coordinar un stack de múltiples servicios (como una app web, una base de datos y un sistema de caché), y necesitas que se comuniquen **solo entre ellos**, sin exponerse directamente al exterior.

```bash
#      Establecemos el contexto del comando
#      |
docker network create mi-red
#              |           \
#          crea una red     con este nombre

# Creamos luego dos contenedores conectados a la red
#
#                              Habilita especificar
#                              la red a la que el
#                              contenedor se conecta
#                              |
docker run -d --name backend --network mi-red mi-app-backend
docker run -d --name db --network mi-red mi-db-image

# O conectamos un contenedor existente a la red 
#
#              Especifica que va establecerse la conexión
#              |
docker network connect mi-red otro-contenedor

# Ver todas las redes disponibles
docker network ls

# Ver detalles de la red creada
docker network inspect mi-red
```

[Siguiente: Composición y Orquestación](./composicion_y_orquestacion.md)

[subir al indice](#contenidos)
