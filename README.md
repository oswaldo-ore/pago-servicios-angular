# Proyecto Angular

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada)
- [Angular CLI](https://angular.io/cli) (instalar con `npm install -g @angular/cli`)

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/oswaldo-ore/pago-servicios-angular
   cd tu-repositorio
   ```
2. Instala las dependencias del proyecto:
   ```sh
   npm install
   ```

## Ejecución en modo desarrollo

Para ejecutar el proyecto en modo desarrollo, usa:
```sh
ng serve
```
Esto iniciará el servidor en `http://localhost:4200/` por defecto.

Si necesitas cambiar el puerto:
```sh
ng serve --port=4300
```

## Ejecución en modo producción

Para ejecutar la aplicación con la configuración de producción:
```sh
ng serve --configuration=production
```
Esto asegurará que se utilicen los archivos de configuración de producción y optimizaciones.

## Construcción para producción

Para generar una versión optimizada de la aplicación para producción, usa:
```sh
ng build --configuration=production
```
Esto generará los archivos en la carpeta `dist/`.

Para servir la aplicación localmente después del build:
```sh
npx http-server -p 4200 -s dist/TU_PROYECTO
```
