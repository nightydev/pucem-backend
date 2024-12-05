# Aplicación Backend NestJS para el Proyecto PUCEM

## Descripción
Esta es una aplicación backend desarrollada con NestJS para el proyecto de enlace PUCEM.

## Requisitos Previos
- Node.js (versión recomendada: 18.x o superior)
- npm

## Instalación

### 1. Clonar el Repositorio
```bash
git clone https://github.com/nightydev/pucem-backend
cd pucem-backend
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con las variables proporcionadas por el líder de proyecto. Ejemplo:
```
DATABASE_HOST=tu_host
DATABASE_PORT=puerto
DATABASE_USER=tu_usuario
DATABASE_PASSWORD=tu_contraseña
JWT_SECRET=tu_secreto_jwt
# Añade aquí las demás variables proporcionadas
```

### 3. Configurar Certificado SSL
Crea una carpeta `ssl` en la raíz del proyecto y coloca el archivo `DigiCertGlobalRootG2.crt.pem` proporcionado por el líder de proyecto:
```bash
mkdir ssl
# Coloca manualmente el archivo DigiCertGlobalRootG2.crt.pem en esta carpeta
```

### 4. Instalar Dependencias
```bash
npm install
```

## Ejecutar la Aplicación

### Modo Desarrollo (con watch)
```bash
npm run start:dev
```

### Modo Producción
```bash
npm run start
```

## Documentación de la API
Una vez que la aplicación esté en ejecución, podrás acceder a la documentación de la API en:
```
http://localhost:<PORT>/api
```
Reemplaza `<PORT>` con el número de puerto configurado en tus variables de entorno.

## Notas Adicionales
- Asegúrate de tener todas las variables de entorno configuradas correctamente
- Verifica que tienes los permisos necesarios para acceder a los recursos configurados
- Consulta con el líder de proyecto si tienes alguna duda sobre la configuración

## Resolución de Problemas
- Si encuentras errores de dependencias, intenta eliminar la carpeta `node_modules` y el archivo `package-lock.json`, luego ejecuta `npm install` nuevamente
- Verifica que la versión de Node.js sea compatible con NestJS