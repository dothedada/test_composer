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

[Volver al índice](../README.md#contenidos)

```