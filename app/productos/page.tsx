"use client";
import { useState } from 'react';
import { usarTienda } from '../../components/TiendaProvider';
import TarjetaProducto from '../../components/TarjetaProducto';
export default function Productos() {
  const { productos } = usarTienda();
  const [buscar, setBuscar] = useState('');
  const [cat, setCat] = useState('Todas');
  const categorias = ['Todas', ...new Set(productos.map(x => x.categoria))];
  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(buscar.toLowerCase()) && (cat === 'Todas' || p.categoria === cat));
  return <>
    <h1>
      Catálogo de productos
    </h1>
    <p>
      Componentes y accesorios de computación
    </p>
    <div className="row g-3 mb-4">
      <div className="col-md-7">
        <input aria-label="Buscar productos" className="form-control" placeholder="Buscar producto..." value={buscar} onChange={e => setBuscar(e.target.value)} />
      </div>
      <div className="col-md-5">
        <select aria-label="Filtrar categoría" className="form-select" value={cat} onChange={e => setCat(e.target.value)}>
          {categorias.map(c => <option key={c}>
            {c}
          </option>)}
        </select>
      </div>
    </div>
    <div className="row g-4">
      {filtrados.map(p => <div className="col-md-6 col-lg-4" key={p.id}>
        <TarjetaProducto producto={p} />
      </div>)}
    </div>{!filtrados.length && <p className="alert alert-info">
      No hay productos que coincidan con la búsqueda.
    </p>}
  </>;
}
