# Diapositivas de Módulo de desarrollo Frontend con Next.js

Este repositorio contiene las diapositivas para el Módulo de desarrollo Frontend con Next.js, utilizando
Reveal.js para la presentación.

## Contenido del Curso

El curso cubre los siguientes temas a lo largo de 10 días:

1. Fundamentos de React y Next.js
2. Enrutamiento y Layouts en App Router
3. Introducción a Material-UI (MUI)
4. React Hook Form y Validación Avanzada con Zod
5. Data Fetching y Caching en App Router
6. Autenticación y Autorización Básica en App Router
7. Introducción a TanStack Query en Next.js App Router
8. TanStack Query Avanzado y State Management
9. Optimización de Rendimiento y Técnicas Avanzadas
10. Despliegue y Consideraciones de Producción

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (normalmente viene con Node.js)

## Configuración

1. Clona este repositorio:
   ```
   git clone https://github.com/IonVillarreal/diapositivas-frontend-nextjs.git
   ```

2. Navega al directorio del proyecto:
   ```
   cd diapositivas-frontend-nextjs.git
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

## Uso

Para iniciar la presentación en modo de desarrollo:

```
npm run dev
```

Esto iniciará un servidor local, generalmente en `http://localhost:9000`. Abre esta URL en tu navegador para ver las
diapositivas.

## Estructura del Proyecto

- `index.html`: Punto de entrada HTML
- `index.ts`: Configuración principal de Reveal.js y lógica de la aplicación
- `global.css`: Estilos globales para las diapositivas
- `dias/`: Directorio que contiene las diapositivas HTML para cada día del curso
- `public/`: Directorio para archivos estáticos como imágenes