# CONTENEDORIZACIÓN (y Docker)

## TL;DR

La idea detrás de las herramientas de contenedorización es permitirnos empaquetar nuestros programas junto a todo su entorno(Archivos de disco, variables de entorno, dependencias instaladas, permisos...) y en enviar el _paquete completo_, lo que permite que nuestras aplicaciones sean **más portables, consistentes, fáciles de desplegar y escalar**

![El nacimiento de Docker](./imgs/whyDocker.png)

## contenidos

1. [Antes de...](./docs/antes_de.md)
    * [Instalación](./docs/antes_de.md#instalación)
        * [Docker Desktop (si necesitas una interfaz visual)](./docs/antes_de.md#docker-desktop-si-necesitas-una-interfaz-visual)
        * [Docker (si sabes el propósito de 'sudo')](./docs/antes_de.md#docker-si-comprendes-que-es-sudo)
    * [Paso a paso](./docs/antes_de.md#paso-a-paso)

2. [Conceptos](./docs/conceptos.md)
    * [¿Para qué la contenedorización?](./docs/conceptos.md#para-qué-la-contenedorización)
    * [Intro: Máquinas, VM y Contenedores](./docs/intro_maquinas_vm_y_contenedores.md)
    * [¿Cómo funciona esto?](./docs/como_funciona_esto.md)
        * [AIUUURAAA (_--help_)](./docs/como_funciona_esto.md#aiuuuraaa---help)
        * [Los planos (imágenes o _images_)](./docs/como_funciona_esto.md#los-planos-imágenes-o-images)
        * [Cosas que no queremos contenedorizar (_dockerignore_)](./docs/como_funciona_esto.md#cosas-que-no-queremos-contenedorizar-dockerignore)
        * [La ejecución (los contenedores)](./docs/como_funciona_esto.md#la-ejecución-los-contenedores)
        * [La memoria (los volúmenes o _volumes_)](./docs/como_funciona_esto.md#la-memoria-los-volúmenes-o-volumes)
        * [Rendimiento y publicación](./docs/como_funciona_esto.md#rendimiento-y-publicación)
    * [Dentro del Contenedor (_exec_)](./docs/dentro_del_contenedor.md)
    * [Por fuera del contenedor (Red o _network_)](./docs/fuera_del_contenedor.md)

3. [Composición y Orquestación con Docker (_compose_)](./docs/composicion_y_orquestacion.md)
    * [El archivo `docker-compose.yml`](./docs/composicion_y_orquestacion.md#el-archivo-docker-composeyml)
        * [La importancia de los nombres en la composición](./docs/composicion_y_orquestacion.md#la-importancia-de-los-nombres-en-la-composición)
    * [Comandos de Docker Compose](./docs/composicion_y_orquestacion.md#comandos-de-docker-compose)

4. [Recomendaciones](./docs/recomendaciones.md)
5. [Resumen de Comandos](./docs/resumen_de_comandos.md)
    * [Gestión de Imágenes](./docs/resumen_de_comandos.md#gestión-de-imágenes)
    * [Gestión de Contenedores](./docs/resumen_de_comandos.md#gestión-de-contenedores)
    * [Gestión de Volúmenes y Redes](./docs/resumen_de_comandos.md#gestión-de-volúmenes-y-redes)
    * [Gestion de Composiciones](./docs/resumen_de_comandos.md#docker-compose)
