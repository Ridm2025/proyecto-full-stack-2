"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usarTienda } from '../../components/TiendaProvider';
import { formatoCLP } from '../../data/catalogo';
export default function Checkout() {
  const { carrito, productos, vaciar } = usarTienda();
  const [datos, setDatos] = useState({ nombre: '', apellido: '', correo: '', direccion: '', comuna: '', region: 'Metropolitana', entrega: 'domicilio' });
  const [error, setError] = useState('');
  const router = useRouter();
  const total = carrito.reduce((s, x) => s + (productos.find(p => p.id === x.id)?.precio || 0) * x.cantidad, 0);
  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!carrito.length) {
      setError('El carrito está vacío');
      return;
    }
    const orden = { id: 'ST-' + Date.now(), datos, items: carrito.map(x => ({ ...x, producto: productos.find(p => p.id === x.id) })), total, fecha: new Date().toISOString() };
    sessionStorage.setItem('sting_ultima_orden', JSON.stringify(orden));
    vaciar();
    router.push('/compra-exitosa');
  }
  ;
  return <>
    <h1>
      Finalizar compra
    </h1>
    <p className="alert alert-warning">
      Simulación académica: no se realizan cobros ni envíos reales.
    </p>{error && <p role="alert" className="alert alert-danger">
      {error}
    </p>}
    <form onSubmit={enviar} className="card p-4">
      <h2 className="h5">
        Datos del cliente
      </h2>
      <div className="row g-3">
        {([['nombre', 'Nombre'], ['apellido', 'Apellido'], ['correo', 'Correo electrónico'], ['direccion', 'Dirección'], ['comuna', 'Comuna']] as const).map(([k, label]) => <div className="col-md-6" key={k}>
          <label className="form-label" htmlFor={k}>
            {label}
          </label>
          <input id={k} className="form-control" type={k === 'correo' ? 'email' : 'text'} required minLength={k === 'correo' ? undefined : 2} value={datos[k]} onChange={e => setDatos({ ...datos, [k]: e.target.value })} />
        </div>)}
        <div className="col-md-6">
          <label className="form-label">
            Región
            <select className="form-select" value={datos.region} onChange={e => setDatos({ ...datos, region: e.target.value })}>
              <option>
                Metropolitana
              </option>
              <option>
                Valparaíso
              </option>
              <option>
                Biobío
              </option>
              <option>
                Otra región
              </option>
            </select>
          </label>
        </div>
        <div className="col-md-6">
          <label className="form-label">
            Entrega
            <select className="form-select" value={datos.entrega} onChange={e => setDatos({ ...datos, entrega: e.target.value })}>
              <option value="domicilio">
                Despacho a domicilio (demo)
              </option>
              <option value="retiro">
                Retiro (demo)
              </option>
            </select>
          </label>
        </div>
      </div>
      <hr />
      <h3 className="h5">
        Total: {formatoCLP(total)}
      </h3>
      <div className="d-flex gap-2">
        <Link className="btn btn-outline-secondary" href="/carrito">
          Volver
        </Link>
        <button className="btn btn-success" disabled={!carrito.length}>
          Confirmar compra simulada
        </button>
      </div>
    </form>
  </>;
}
