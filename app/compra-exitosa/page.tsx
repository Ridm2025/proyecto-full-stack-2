"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatoCLP } from '../../data/catalogo';
export default function Exito() {
  const [orden, setOrden] = useState<any>(null);
  useEffect(() => {
    try {
      const x = sessionStorage.getItem('sting_ultima_orden');
      if (x)
        setOrden(JSON.parse(x));
    }
    catch { }
  }, []);
  return <div className="card p-5 text-center">
    <h1>
      ✅ Compra simulada exitosa
    </h1>{orden ? <>
      <p>
        Orden:
        <strong>
          {orden.id}
        </strong>
      </p>
      <p>
        Cliente: {orden.datos.nombre} {orden.datos.apellido}
      </p>
      <p>
        Total:
        <strong>
          {formatoCLP(orden.total)}
        </strong>
      </p>
    </> : <p>
      No hay una orden reciente para mostrar.
    </p>}
    <p>
      No se ha procesado ningún pago real.
    </p>
    <Link href="/productos" className="btn btn-primary mx-auto">
      Volver a la tienda
    </Link>
  </div>;
}
