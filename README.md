# MapLeaflet

Una aplicación de mapas interactiva construida con React y Leaflet para visualizar.


## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Amarinr9705/IDEAM_Front.git
   cd mapleaflet
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

## Configuración de Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```


## Cambiar fechas. 
Las fechas en las que se hacen las peticiones del recurso deben cambiarse de forma manual, están hardcoded en el body del POST.
Se encuentan en la línea 40 y 41 del componente SelectedDataBox.jsx
