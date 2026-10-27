import Link from 'next/link';
export default function Home() {
  return <>
    <section className="hero">
      <span className="badge bg-warning text-dark mb-3">
        SERVICIO TÉCNICO PROFESIONAL
      </span>
      <h1>
        Tu computador en
        <span className="accent">
          las mejores manos.
        </span>
      </h1>
      <p className="lead col-lg-8">
        Reparamos, mantenemos y optimizamos computadores y notebooks. Ahora también encuentras componentes y accesorios para tu equipo.
      </p>
      <div className="d-flex gap-3 flex-wrap mt-4">
        <Link className="btn btn-warning btn-lg" href="/servicios">
          Solicitar servicio
        </Link>
        <Link className="btn btn-outline-light btn-lg" href="/productos">
          Ver productos
        </Link>
      </div>
    </section>
    <section className="my-5">
      <h2 className="mb-4">
        ¿Qué hacemos?
      </h2>
      <div className="row g-4">
        {[['🔧', 'Reparación', 'Diagnóstico y solución de fallas'], ['🚀', 'Optimización', 'Mantenimiento y mejora de rendimiento'], ['💻', 'Componentes', 'Accesorios y repuestos para tu computador']].map(([e, t, d]) => <div className="col-md-4" key={t}>
          <div className="card p-4 h-100">
            <div className="fs-1">
              {e}
            </div>
            <h3 className="h5">
              {t}
            </h3>
            <p>
              {d}
            </p>
          </div>
        </div>)}
      </div>
    </section>
  </>;
}
