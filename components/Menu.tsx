"use client";
import Link from 'next/link';
import { usarTienda } from './TiendaProvider';
export default function Menu() {
  const { carrito } = usarTienda();
  return <>
    <div className="topbar">
      🔧 Servicio técnico profesional · Venta de componentes
    </div>
    <header className="sticky-top bg-white border-bottom shadow-sm">
      <nav className="container navbar navbar-expand-lg gap-3">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" href="/">
          <img src="/logo.png" alt="Logo Sting Tech" width="52" height="52" style={{ objectFit: 'contain' }} />Sting Tech
        </Link>
        <div className="d-flex flex-wrap gap-3 align-items-center ms-lg-auto navlinks">
          <Link href="/">
            Inicio
          </Link>
          <Link href="/servicios">
            Servicios
          </Link>
          <Link href="/productos">
            Productos
          </Link>
          <Link href="/ofertas">
            Ofertas
          </Link>
          <Link href="/nosotros">
            Nosotros
          </Link>
          <Link href="/contacto">
            Contacto
          </Link>
          <Link href="/admin">
            Administración
          </Link>
          <Link className="btn btn-primary btn-sm text-white" href="/carrito">
            🛒 Carrito ({carrito.reduce((s, x) => s + x.cantidad, 0)})
          </Link>
        </div>
      </nav>
    </header>
  </>;
}
