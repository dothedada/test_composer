# Conceptos

## ¿Para qué la contenedorización?

Al contenedorizar una aplicación, empaquetamos no solo su código, sino también todo lo que necesita para funcionar: librerías, configuraciones, binarios, etc. Todo eso va dentro del contenedor lo que nos proporciona varias ventajas:

* **Portabilidad:** el contenedor se puede ejecutar en cualquier máquina que tenga Docker (u otro runtime compatible), sin importar el sistema operativo subyacente o su configuración.
* **Consistencia:** el entorno de desarrollo es el mismo que el de producción. Así se evita el clásico “en mi máquina sí funciona”.
* **Aislamiento:** los contenedores corren de forma independiente unos de otros, lo que permite ejecutar múltiples aplicaciones en paralelo sin que interfieran entre sí... o... relacionar varios contenedores de forma subyacente para su funcionamiento sin exponer partes que deseamos mantener privadas.
* **Escalabilidad:** como son livianos, se pueden crear, detener o replicar rápidamente, lo cual facilita escalar aplicaciones en la nube o en entornos distribuidos.

[Siguiente: Intro: Máquinas, VM y contenedores](./intro_maquinas_vm_y_contenedores.md)
[Volver al listado de contenidos](../README.md#contenidos)

