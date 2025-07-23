# Conceptos

## Cómo funciona esto

### AIUUURAAA (_--help_)

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

[Siguiente: Los planos (imágenes o _images_)](./los_planos.md)

[Volver al listado de contenidos](../README.md#contenidos)
