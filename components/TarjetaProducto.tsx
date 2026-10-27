"use client";
import { usarTienda } from './TiendaProvider';
import { formatoCLP } from '../data/catalogo';
export default function TarjetaProducto({ producto }: {
  producto: {
    id: number;
    nombre: string;
    categoria: string;
    precio: number;
    stock: number;
    oferta: boolean;
    emoji: string;
  };
}) {
  const { agregar } = usarTienda();
  return <article className="card h-100 p-3">
    <div className="card-img-fake" aria-hidden="true">
      {producto.emoji}
    </div>
    <div className="card-body px-0 pb-0">
      <span className="badge-tag">
        {producto.categoria}
      </span>{producto.oferta && <span className="badge bg-warning text-dark ms-2">
        Oferta
      </span>}
      <h3 className="h5 mt-3">
        {producto.nombre}
      </h3>
      <p className="fs-5 fw-bold mb-1">
        {formatoCLP(producto.precio)}
      </p>
      <p className="text-secondary small">
        Stock: {producto.stock}
      </p>
      <button onClick={() => agregar(producto.id)} disabled={!producto.stock} className="btn btn-primary w-100">
        {producto.stock ? 'Añadir al carrito' : 'Agotado'}
      </button>
    </div>
  </article>;
}
