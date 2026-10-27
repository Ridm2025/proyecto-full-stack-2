# Sting Tech Solutions V2

**Tienda online de componentes computacionales y sitio de servicios técnicos**  
Proyecto académico — **DSY1104 · Desarrollo Fullstack II · Evaluación Parcial 2**

## Descripción

**Sting Tech Solutions V2** es la evolución de un sitio web originalmente desarrollado con **HTML y CSS** para presentar servicios de reparación, mantenimiento y optimización de computadores y notebooks.

En esta segunda versión se reorganizó la solución como una aplicación desarrollada con **React y Next.js**, se incorporó **Bootstrap** para la adaptación a distintos tamaños de pantalla y se añadió una tienda demostrativa de componentes y accesorios de computación. El proyecto también incluye un carrito de compras, checkout simulado, administración básica de productos y pruebas unitarias con **Jasmine y Karma**.

> **Alcance:** aplicación demostrativa con fines académicos. No procesa pagos reales, no realiza despachos y no cuenta con autenticación ni backend de producción conectado.

## Objetivos del proyecto

- Migrar la propuesta anterior de HTML/CSS a una aplicación basada en React.
- Construir componentes reutilizables y aplicar el manejo de **props** y **state**.
- Implementar navegación y una interfaz responsiva con Bootstrap.
- Incorporar un catálogo de productos tecnológicos, búsqueda, filtros, ofertas y carrito de compras.
- Simular el proceso de compra y el registro de una solicitud de servicio.
- Gestionar productos desde un panel administrativo de demostración.
- Configurar y ejecutar pruebas unitarias mediante Jasmine y Karma.
- Documentar el desarrollo y los resultados de las pruebas.

## Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
| --- | --- |
| **Next.js 16** | Estructura de la aplicación, rutas y páginas. |
| **React 19** | Componentes y gestión de la interfaz. |
| **TypeScript / JavaScript** | Código de páginas, componentes y datos. |
| **Bootstrap 5** | Diseño responsivo, grillas, formularios, tarjetas y botones. |
| **CSS** | Estilos visuales propios de Sting Tech. |
| **localStorage** | Persistencia local del catálogo y del carrito en el navegador. |
| **sessionStorage** | Datos temporales de la última compra simulada. |
| **Jasmine** | Definición de casos y expectativas de pruebas. |
| **Karma + ChromeHeadless** | Ejecución de las pruebas en Chrome sin interfaz gráfica. |
| **Webpack + Babel** | Compilación del código TypeScript/TSX para las pruebas. |
| **Git y GitHub** | Versionamiento y publicación del código. |

## Funcionalidades

### Sitio público

- **Inicio (`/`)**: presentación de Sting Tech y acceso a servicios y catálogo.
- **Nosotros (`/nosotros`)**: información acerca de la propuesta.
- **Servicios (`/servicios`)**: servicios de soporte y formulario de solicitud demostrativo.
- **Contacto (`/contacto`)**: formulario con validación básica; no envía mensajes reales.
- **Productos (`/productos`)**: listado, búsqueda por nombre y filtro por categoría.
- **Ofertas (`/ofertas`)**: productos marcados como oferta.

### Carrito y compra simulada

- **Carrito (`/carrito`)**: agregar productos, modificar cantidades, quitar artículos y calcular el total.
- **Checkout (`/checkout`)**: completar nombre, apellido, correo electrónico, dirección, comuna, región y modalidad de entrega. Emplea campos HTML obligatorios y controles de entrada.
- **Confirmación (`/compra-exitosa`)**: muestra un resumen básico de la orden simulada, que se guarda temporalmente en `sessionStorage`.
- La confirmación **no implica pago real**; la aplicación lo informa expresamente.

### Administración demostrativa

- **Administración (`/admin`)**: añadir, listar, editar y eliminar productos desde la interfaz.
- Los cambios se reflejan en el catálogo compartido y se almacenan localmente en el navegador.
- **No existe inicio de sesión ni control de permisos** para el panel administrativo. Por lo tanto, no debe usarse así en producción.

## Arquitectura y organización

```text
sting-tech-v2/
├── app/
│   ├── page.tsx                    # Página de inicio
│   ├── layout.tsx                  # Estructura global y proveedor de estado
│   ├── globals.css                 # Estilos personalizados
│   ├── nosotros/page.tsx
│   ├── servicios/page.tsx
│   ├── contacto/page.tsx
│   ├── productos/page.tsx
│   ├── ofertas/page.tsx
│   ├── carrito/page.tsx
│   ├── checkout/page.tsx
│   ├── compra-exitosa/page.tsx
│   └── admin/page.tsx
├── components/
│   ├── Menu.tsx                    # Navegación
│   ├── TarjetaProducto.tsx         # Tarjeta reutilizable de producto
│   └── TiendaProvider.tsx          # Estado compartido de productos y carrito
├── data/
│   └── catalogo.js                 # Productos iniciales y operaciones CRUD
├── tests/
│   ├── catalogo.spec.tsx           # Pruebas de lógica del catálogo
│   └── componentes.spec.tsx        # Pruebas de componente React
├── public/
│   └── logo.png
├── karma.conf.cjs                  # Configuración de pruebas
├── package.json
├── tsconfig.json
└── README.md
```

### Conceptos clave de React utilizados

- **Componentes reutilizables:** `Menu` y `TarjetaProducto` permiten reutilizar estructura visual.
- **Props:** `TarjetaProducto` recibe un objeto `producto` con nombre, precio, categoría, stock y estado de oferta.
- **State:** `useState` administra los filtros, datos de formularios y otros estados interactivos.
- **Context:** `TiendaProvider` comparte productos y carrito entre páginas mediante un contexto de React.
- **Effects:** `useEffect` recupera y sincroniza productos y carrito con `localStorage`.
- **Renderizado condicional:** se presentan mensajes de carrito vacío, etiquetas de oferta y botones deshabilitados según el estado.

### Modelo de datos

El catálogo inicial se encuentra en `data/catalogo.js`. Cada producto incluye `id`, `nombre`, `categoria`, `precio`, `stock`, `oferta` y `emoji`. El mismo archivo contiene funciones para crear, editar y eliminar productos, además de formatear precios en pesos chilenos.

> **Persistencia:** se utiliza almacenamiento local del navegador, no una base de datos remota. Los datos de otro navegador o computador no se comparten automáticamente.

## Instalación y ejecución

### Requisitos

- **Node.js** y **npm** instalados.
- Google Chrome para ejecutar las pruebas con `ChromeHeadless`.
- Visual Studio Code (recomendado).

### Ejecutar en desarrollo

1. Clonar el repositorio o descargar el ZIP y abrir la carpeta que contiene `package.json`.
2. Instalar dependencias:

   ```powershell
   npm.cmd install
   ```

3. Iniciar el servidor:

   ```powershell
   npm.cmd run dev
   ```

4. Abrir **http://localhost:3000**.

En una terminal donde `npm` funcione directamente, se puede reemplazar `npm.cmd` por `npm`.

### Otros comandos

```powershell
npm.cmd run build       # Genera una compilación para producción
npm.cmd run start       # Inicia una compilación ya generada
npm.cmd test            # Ejecuta pruebas con Karma una sola vez
npm.cmd run test:watch  # Ejecuta Karma en modo de seguimiento
```

## Pruebas unitarias

El proyecto contiene **10 casos de prueba** distribuidos entre la lógica de catálogo y el componente `TarjetaProducto`:

| N.º | Verificación |
| --- | --- |
| 1 | Carga del catálogo inicial. |
| 2 | Creación de un producto con ID único. |
| 3 | Edición de los datos de un producto. |
| 4 | Eliminación del producto seleccionado. |
| 5 | Formato monetario en pesos chilenos. |
| 6 | Renderizado del nombre recibido mediante props. |
| 7 | Visualización de información proporcionada mediante props. |
| 8 | Renderizado condicional de la etiqueta de oferta. |
| 9 | Estado del botón cuando no existe stock. |
| 10 | Respuesta al evento de agregar al carrito. |

**Ejecución:**

```powershell
npm.cmd test
```

**Resultado reportado en la última ejecución del equipo:** **10 pruebas aprobadas de 10 ejecutadas; 0 fallidas**. Se recomienda adjuntar la captura o registro de Karma como evidencia.

**Importante:** aprobar 10 de 10 pruebas indica una tasa de éxito del 100 % entre las pruebas ejecutadas, **no** una cobertura del 100 % de todo el código. La medición de cobertura de líneas/ramas requiere instrumentación e informe específicos; no se declara aquí un porcentaje de cobertura no medido.

### Aspectos verificados

- Operaciones de catálogo.
- Renderizado de datos de productos.
- Gestión de props y estados visuales.
- Eventos del botón de compra.

Para más información, consultar el documento de cobertura de testing de la entrega.

## Evolución desde la primera versión

| Versión original | Versión 2 |
| --- | --- |
| Páginas HTML/CSS para presentar servicios. | Aplicación basada en React y Next.js. |
| Navegación entre páginas estáticas. | Rutas dentro de la aplicación Next.js. |
| Contenido principalmente informativo. | Catálogo, filtros, carrito y compra simulada. |
| Sin panel de gestión de productos. | Panel CRUD demostrativo con persistencia local. |
| Sin pruebas unitarias integradas. | 10 pruebas con Jasmine y Karma. |

Se mantuvo el nombre, la temática de soporte técnico y el objetivo de Sting Tech; se amplió el alcance a la venta **simulada** de productos tecnológicos.

## Limitaciones y mejoras futuras

- Conectar un backend y una base de datos para gestionar productos, clientes, solicitudes y órdenes entre dispositivos.
- Incorporar autenticación y roles antes de exponer el panel administrativo en un entorno real.
- Integrar una pasarela de pago real únicamente con las validaciones y medidas de seguridad correspondientes.
- Crear una vista explícita de pago rechazado y un historial de órdenes.
- Implementar envío real de solicitudes y mensajes de contacto.
- Ampliar las pruebas y obtener métricas cuantitativas de cobertura del código.

## Entrega académica

La Evaluación Parcial 2 contempla la entrega del **repositorio GitHub público**, el **proyecto comprimido**, el **documento ERS actualizado** y el **documento de cobertura de testing**, además de una presentación y ronda de preguntas.

**Asignatura:** DSY1104 — Desarrollo Fullstack II  
**Proyecto:** Sting Tech Solutions V2  
**Finalidad:** Desarrollo y demostración académica

---

**Sting Tech Solutions V2** — De un sitio informativo en HTML/CSS a una aplicación interactiva desarrollada con React.
