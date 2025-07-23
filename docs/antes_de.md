## Antes de

Los conceptos, marcos y flujos de trabajo que explicamos aquí son comunes a la contenedorización y pueden aplicarse con herramientas como [**Podman**](https://podman.io/) (compatible con Docker CLI, sin daemon y con enfoque en seguridad), [**containerd**](https://containerd.io/) (runtime de contenedores usado internamente por Docker) o [**CRI-O**](https://cri-o.io/) (una alternativa ligera pensada para Kubernetes). Sin embargo, como [**Docker**](https://www.docker.com/) es en este momento la herramienta más utilizada para este propósito, todos los ejemplos y fragmentos de código en esta guía estarán basados en ella.

Dentro de este repositorio también puedes encontrar una aplicación simple compuesta por dos bases de datos, un servidor y un front orquestadas en docker, el archivo docker-compose.yml y los Dockerfile estan comentados explicando lo que sucede o el porqué de cada línea

### Instalación

Antes de empezar a usar Docker en tu máquina local es importante comprender que, aunque parezca una sola aplicación, en realidad estamos interactuando con varios componentes que trabajan juntos:

* **El Servidor Docker (Docker Engine o Docker Daemon)**: Este es el componente principal que ejecuta y gestiona los contenedores, imágenes, redes y volúmenes. Es el "motor" de Docker; si no está corriendo, Ningún otro componente de Docker podrá operar.
* **La Interfaz de Línea de Comandos (Docker CLI)**: Es la herramienta principal de interacción con Docker. Aunque existan interfaces gráficas, la mayoría de las operaciones y comandos de Docker se ejecutan directamente desde la terminal.
* **Docker Compose**: Se encarga de definir y ejecutar aplicaciones que necesitan de varios contenedores. Permite orquestar el montaje, las redes y volúmenes de forma ordenada, utilizando un único archivo de configuración (normalmente docker-compose.yml).
* **Docker Desktop (Interfaz Gráfica)**: Es una aplicación de escritorio que integra el Docker Engine, la CLI, Docker Compose y, opcionalmente, Kubernetes. Ofrece una forma visual y simplificada de interactuar con Docker que al abrirla, suele iniciar automáticamente el servidor Docker. Es útil para monitorear el estado, ver logs o gestionar imágenes, pero no es estrictamente necesaria para usar Docker.

### Paso a paso

#### Docker Desktop (si necesitas una interfaz visual)

Docker Desktop es una aplicación del equipo creador de Docker que simplifica la instalacion y uso de Docker en Linux, Mac y Windows al agrupar dentro de una interfaz gráfica las aplicaciones Docker Engine, Docker CLI y Docker Compose. La simplicidad en su uso viene atada con la creación de un usuario dentro de los servidores de Docker y el cobro de servicios en casos específicos. Si sólo quieres instalar Docker para correr unos contenedores eventualmente o si tu sistema operativo es Mac o Windows, esta puede ser la opción más indicada.

1. **Instala Docker Desktop** sigue las instrucciones según tu sistema operativo...

    * [Docker Desktop para Linux](https://docs.docker.com/engine/install/)
    * [Docker Desktop para macOS](https://docs.docker.com/desktop/install/mac-install/)
    * [Docker Desktop para Windows (WSL2)](https://docs.docker.com/desktop/install/windows-install/)

2. **Abre la aplicación Docker Desktop**  Asegúrate de que aparece un recuadro con el ícono de la ballena en la barra de estado de tu sistema operativo. Eso indica que el servidor Docker está activo y funcionando correctamente.

3. **Confirma que todo está instalado** Ejecuta este comando en la terminal:

    ```bash
    docker version
    # Si todo está bien, verás detalles sobre la 
    # versión del cliente y del servidor...

    # Client: Docker Engine - Community
    # Version:           28.3.2
    # API version:       1.51
    # Go version:        go1.24.5
    # Git commit:        578ccf6
    # ...
    ```

#### Docker (si comprendes que es 'sudo')

Si trabajas en un entorno nativo de Linux o uno virtualizado como Colima(Mac) o WSL2(Windows) y prefieres tener acceso a todas las capacidades de Docker sin necesidad de una interfaz gráfica, esta puede ser tu opción.

> [!NOTE]
> Pre-requisitos (si estás en macOS o Windows):
>
> * macOS: Asegúrate de tener Colima instalado e iniciado. Colima creará una pequeña máquina virtual Linux donde Docker Engine se ejecutará.
> * Windows: Asegúrate de tener WSL2 (Subsistema de Windows para Linux 2) instalado y tu distribución de Linux preferida configurada. Docker Engine se instalará dentro de esta distribución.

En el entorno Linux (nativo o virtualizado como Colima/WSL2):

1. **Instalar Docker Engine (Daemon) y Docker-CLI:**
      * [Instalar Docker Engine en Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
      * [Instalar Docker Engine en Debian](https://docs.docker.com/engine/install/debian/)
      * [Instalar Docker Engine en CentOS](https://docs.docker.com/engine/install/centos/)
      * [Otras distribuciones de Linux](https://docs.docker.com/engine/install/)

2. **Instalar Docker Compose (Plugin):**

      * [Instalar Docker Compose Plugin](https://docs.docker.com/compose/install/linux/)

3. **Configurar permisos de usuario (Opcional, pero recomendado):**

      * [Post-installation steps for Linux](https://docs.docker.com/engine/install/linux-postinstall/)

> [!TIP]
> activa el autocompletado de comandos de Docker en tu shell. Esto ahorra tiempo y errores al escribir. [Guía oficial aquí.](https://docs.docker.com/engine/cli/completion/)

[Siguiente: Conceptos](./conceptos.md)

[Volver al listado de contenidos](#contenidos)
