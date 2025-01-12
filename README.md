
# DEV

1. Instalar modulos de node:
``` npm i ```

2. Clonar el .env.template y crear el .env

__Para ejecutar la base de datos( en este caso PostgreSQL), asegurense de configurar un archivo docker-compose.yml, para luego ejecutar:__
``` docker compose up -d ```

__Para trabajar con Prisma__
1. Ejecutar:
``` npm install prisma --save-dev ```

2. Ejecutar:
``` npx prisma init --datasource-provider postgresql ```

3. Modificar en el esquema de prisma:
``` url = env("POSTGRES_URL") ```

4. Crear el modelo en el archivo schema.prisma

5. Correr la migración para crear las tablas de las bases de datos (si se modifica el esquema o las .env hay que volver a hacer la migración):
``` npx prisma migrate dev --name init ```

