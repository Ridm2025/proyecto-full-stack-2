"use client";
import Link from 'next/link';
import { usarTienda } from '../../components/TiendaProvider';
import { formatoCLP } from '../../data/catalogo';
export default function Carrito() {
  const { carrito, productos, cambiarCantidad } = usarTienda();
  const items = carrito.map(x => ({ ...x, producto: productos.find(p => p.id === x.id) })).filter(x => x.producto);
  const total = items.reduce((s, x) => s + x.cantidad * x.producto!.precio, 0);
  return <>
    <h1>
      Carrito de compras
    </h1>{!items.length ? <div className="alert alert-info">
      Tu carrito está vacío.
      <Link href="/productos">
        Ver productos
      </Link>
    </div> : <>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>
                Producto
              </th>
              <th>
                Precio
              </th>
              <th>
                Cantidad
              </th>
              <th>
                Subtotal
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(x => <tr key={x.id}>
              <td>
                {x.producto!.nombre}
              </td>
              <td>
                {formatoCLP(x.producto!.precio)}
              </td>
              <td>
                <input aria-label={'Cantidad de ' + x.producto!.nombre} className="form-control" style={{ maxWidth: 90 }} type="number" min="1" max={x.producto!.stock} value={x.cantidad} onChange={e => cambiarCantidad(x.id, Number(e.target.value))} />
              </td>
              <td>
                {formatoCLP(x.cantidad * x.producto!.precio)}
              </td>
              <td>
                <button className="btn btn-outline-danger btn-sm" onClick={() => cambiarCantidad(x.id, 0)}>
                  Quitar
                </button>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <h3>
        Total: {formatoCLP(total)}
      </h3>
      <Link className="btn btn-success" href="/checkout">
        Continuar al checkout
      </Link>
    </>}
  </>;
}
