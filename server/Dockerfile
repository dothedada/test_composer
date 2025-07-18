# Utiliza la imagen oficial de Node.js (versión 24, con base Alpine Linux para un tamaño reducido) como imagen base.
FROM node:24-alpine3.21

# Establece el directorio de trabajo dentro del contenedor en '/app'.
# Todas las instrucciones siguientes se ejecutarán en este directorio.
WORKDIR /app

# Copia los archivos 'package.json' y 'package-lock.json' al directorio de trabajo.
# Se copian por separado para aprovechar el sistema de caché de Docker.
# Si estos archivos no cambian, Docker reutilizará la capa de 'npm install' en futuras construcciones.
COPY package*.json ./

# Ejecuta el comando para instalar las dependencias del proyecto definidas en package.json.
RUN npm install

# Copia el resto de los archivos del proyecto (código fuente, etc.) al directorio de trabajo.
COPY . .

# Define el comando por defecto que se ejecutará cuando el contenedor se inicie.
# En este caso, ejecuta el script 'server' definido en el 'package.json'.
CMD ["npm", "run", "server"]
