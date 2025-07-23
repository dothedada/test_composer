# Conceptos

## Cómo funciona esto

### Rendimiento y publicación

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

[Siguiente: Dentro del contenedor](./dentro_del_contenedor.md)

[Volver al listado de contenidos](../README.md#contenidos)
