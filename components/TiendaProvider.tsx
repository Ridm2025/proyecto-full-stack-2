"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { iniciales } from '../data/catalogo';
type Producto = {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  oferta: boolean;
  emoji: string;
};
type Item = {
  id: number;
  cantidad: number;
};
type Contexto = {
  productos: Producto[];
  setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
  carrito: Item[];
  agregar: (id: number) => void;
  cambiarCantidad: (id: number, n: number) => void;
  vaciar: () => void;
};
const C = createContext<Contexto | null>(null);
export function TiendaProvider({ children }: {
  children: React.ReactNode;
}) {
  const [productos, setProductos] = useState<Producto[]>(iniciales);
  const [carrito, setCarrito] = useState<Item[]>([]);
  const [listo, setListo] = useState(false);
  useEffect(() => {
    try {
      const a = localStorage.getItem('sting_productos');
      const b = localStorage.getItem('sting_carrito');
      if (a)
        setProductos(JSON.parse(a));
      if (b)
        setCarrito(JSON.parse(b));
    }
    catch { }
    setListo(true);
  }, []);
  useEffect(() => {
    if (listo)
      localStorage.setItem('sting_productos', JSON.stringify(productos));
  }, [productos, listo]);
  useEffect(() => {
    if (listo)
      localStorage.setItem('sting_carrito', JSON.stringify(carrito));
  }, [carrito, listo]);
  const agregar = (id: number) => {
    const p = productos.find(x => x.id === id);
    if (!p)
      return;
    setCarrito(old => {
      const actual = old.find(x => x.id === id)?.cantidad || 0;
      if (actual >= p.stock)
        return old;
      return actual ? old.map(x => x.id === id ? { ...x, cantidad: x.cantidad + 1 } : x) : [...old, { id, cantidad: 1 }];
    });
  };
  const cambiarCantidad = (id: number, n: number) => setCarrito(old => n <= 0 ? old.filter(x => x.id !== id) : old.map(x => x.id === id ? { ...x, cantidad: Math.min(n, productos.find(p => p.id === id)?.stock || 0) } : x));
  return <C.Provider value={{ productos, setProductos, carrito, agregar, cambiarCantidad, vaciar: () => setCarrito([]) }}>
    {children}
  </C.Provider>;
}
export function usarTienda() {
  const v = useContext(C);
  if (!v)
    throw Error('TiendaProvider requerido');
  return v;
}
