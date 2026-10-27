# Gestión de productos

Aplicación frontend de inventario desarrollada con React, Vite, Tailwind CSS y componentes reutilizables al estilo shadcn/ui. Permite crear, consultar, editar y eliminar productos durante la sesión actual. El inventario se administra únicamente en el estado de React: no se utiliza backend, base de datos, almacenamiento local ni servicios externos. Al recargar la página, se recuperan los cinco productos iniciales y se pierden los cambios de la sesión anterior.

## Requisitos

- Node.js 20.19 o superior
- npm

## Instalación y ejecución

Desde la carpeta `lab10`, instalar las dependencias y arrancar el servidor de desarrollo:

```bash
npm install
npm run dev
```

Abrir la URL que muestra Vite, normalmente <http://localhost:5173/>.

## Compilación de producción

```bash
npm run build
npm run preview
```

## Organización del frontend

- `src/App.jsx`: estado del inventario, productos iniciales y resumen.
- `src/components/ProductForm.jsx`: formulario controlado y validación.
- `src/components/ProductTable.jsx`: representación tabular del inventario.
- `src/components/ui/`: componentes reutilizables Button, Input, Label, Card, Table y Select.
- `src/lib/utils.js`: función `cn` para combinar clases de Tailwind.
- `components.json`: configuración de shadcn/ui y sus alias.
- `src/index.css`: directivas de Tailwind y estilos globales.
- `vite.config.js`, `tailwind.config.js`, `postcss.config.js`: configuración de herramientas.

Los cinco productos iniciales se cargan en cada ejecución de la aplicación. Los productos nuevos se agregan al final de la tabla; las operaciones de creación, edición y eliminación solo afectan el estado actual de React y son temporales.
