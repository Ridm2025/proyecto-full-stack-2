export const iniciales = [
  { id: 1, nombre: 'Memoria RAM 16 GB DDR4', categoria: 'Componentes', precio: 34990, stock: 12, oferta: true, emoji: '🧠' },
  { id: 2, nombre: 'SSD 1 TB', categoria: 'Almacenamiento', precio: 65990, stock: 8, oferta: true, emoji: '💾' },
  { id: 3, nombre: 'Teclado mecánico', categoria: 'Periféricos', precio: 49990, stock: 14, oferta: false, emoji: '⌨️' },
  { id: 4, nombre: 'Mouse gamer', categoria: 'Periféricos', precio: 22990, stock: 20, oferta: true, emoji: '🖱️' },
  { id: 5, nombre: 'Fuente de poder 650W', categoria: 'Componentes', precio: 59990, stock: 6, oferta: false, emoji: '⚡' },
  { id: 6, nombre: 'Pendrive USB 64GB', categoria: 'Almacenamiento', precio: 9990, stock: 30, oferta: false, emoji: '🔌' }
];
export const formatoCLP = n => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n);
export const crearProducto = (items, producto) => [...items, { ...producto, id: Math.max(0, ...items.map(x => x.id)) + 1 }];
export const editarProducto = (items, id, cambios) => items.map(x => x.id === id ? { ...x, ...cambios } : x);
export const eliminarProducto = (items, id) => items.filter(x => x.id !== id);
