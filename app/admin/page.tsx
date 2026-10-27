"use client";
import { useState } from 'react';
import { usarTienda } from '../../components/TiendaProvider';
import { formatoCLP } from '../../data/catalogo';
export default function Admin() {
  const { productos, setProductos } = usarTienda();
  const [id, setId] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Componentes');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  function guardar(e: React.FormEvent) {
    e.preventDefault();
    const cambios = { nombre, categoria, precio: Number(precio), stock: Number(stock), oferta: false, emoji: '💻' };
    setProductos(old => id === null ? [...old, { ...cambios, id: Math.max(0, ...old.map(x => x.id)) + 1 }] : old.map(x => x.id === id ? { ...x, ...cambios } : x));
    limpiar();
  }
  function limpiar() {
    setId(null);
    setNombre('');
    setCategoria('Componentes');
    setPrecio('');
    setStock('');
  }
  return <>
    <h1>
      Administración de productos
    </h1>
    <p className="alert alert-warning">
      Panel de demostración sin autenticación. No usar en producción. Los datos se guardan en este navegador.
    </p>
    <div className="card p-4 mb-4">
      <h2 className="h5">
        {id === null ? 'Agregar producto' : 'Editar producto'}
      </h2>
      <form onSubmit={guardar} className="row g-2">
        <div className="col-md-4">
          <input className="form-control" required placeholder="Nombre" aria-label="Nombre del producto" value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={categoria} onChange={e => setCategoria(e.target.value)}>
            <option>
              Componentes
            </option>
            <option>
              Almacenamiento
            </option>
            <option>
              Periféricos
            </option>
          </select>
        </div>
        <div className="col-md-2">
          <input className="form-control" placeholder="Precio" aria-label="Precio" type="number" min="1" required value={precio} onChange={e => setPrecio(e.target.value)} />
        </div>
        <div className="col-md-2">
          <input className="form-control" placeholder="Stock" aria-label="Stock" type="number" min="0" required value={stock} onChange={e => setStock(e.target.value)} />
        </div>
        <div className="col-md-1">
          <button className="btn btn-primary">
            {id === null ? 'Añadir' : 'Guardar'}
          </button>
        </div>{id !== null && <div>
          <button type="button" className="btn btn-link" onClick={limpiar}>
            Cancelar edición
          </button>
        </div>}
      </form>
    </div>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>
              Producto
            </th>
            <th>
              Categoría
            </th>
            <th>
              Precio
            </th>
            <th>
              Stock
            </th>
            <th>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => <tr key={p.id}>
            <td>
              {p.nombre}
            </td>
            <td>
              {p.categoria}
            </td>
            <td>
              {formatoCLP(p.precio)}
            </td>
            <td>
              {p.stock}
            </td>
            <td>
              <button className="btn btn-outline-primary btn-sm me-2" onClick={() => {
                setId(p.id);
                setNombre(p.nombre);
                setCategoria(p.categoria);
                setPrecio(String(p.precio));
                setStock(String(p.stock));
              }}>
                Editar
              </button>
              <button className="btn btn-outline-danger btn-sm" onClick={() => {
                if (confirm('¿Eliminar producto?'))
                  setProductos(old => old.filter(x => x.id !== p.id));
              }}>
                Eliminar
              </button>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </>;
}
