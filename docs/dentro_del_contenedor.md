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

[Siguiente: Por fuera del contenedor](./fuera_del_contenedor.md)

[Volver al índice](../README.md#contenidos)
