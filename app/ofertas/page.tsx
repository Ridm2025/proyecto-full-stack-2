"use client";
import { usarTienda } from '../../components/TiendaProvider';
import TarjetaProducto from '../../components/TarjetaProducto';
export default function Ofertas() {
  const { productos } = usarTienda();
  return <>
    <h1>
      Ofertas
    </h1>
    <p>
      Artículos destacados de Sting Tech.
    </p>
    <div className="row g-4">
      {productos.filter(p => p.oferta).map(p => <div className="col-md-6 col-lg-4" key={p.id}>
        <TarjetaProducto producto={p} />
      </div>)}
    </div>
  </>;
}
