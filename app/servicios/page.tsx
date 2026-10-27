"use client";
import { useState } from 'react';
export default function Servicios() {
  const [enviado, setEnviado] = useState(false);
  const servicios = [['🔧', 'Cambio de componentes', 'Desde $10.000 (sin repuestos)'], ['🧹', 'Mantenimiento preventivo', 'Limpieza y revisión del equipo'], ['🚀', 'Optimización de computadores', 'Mejoras de rendimiento y configuración']];
  return <>
    <h1>
      Servicios técnicos
    </h1>
    <p>
      Soluciones para computadores y notebooks.
    </p>
    <div className="row g-4">
      {servicios.map(([e, t, d]) => <div className="col-md-4" key={t}>
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
    <section className="card p-4 mt-5" id="solicitar">
      <h2>
        Solicita una evaluación técnica
      </h2>{enviado ? <div role="status" className="alert alert-success">
        Solicitud registrada para esta demostración. No se ha enviado a un servidor.
      </div> : <form onSubmit={e => {
        e.preventDefault();
        setEnviado(true);
      }} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">
            Nombre
          </label>
          <input required minLength={2} className="form-control" />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            Correo
          </label>
          <input type="email" required className="form-control" />
        </div>
        <div className="col-12">
          <label className="form-label">
            Problema del equipo
          </label>
          <textarea className="form-control" required minLength={10} />
        </div>
        <div className="col-12">
          <button className="btn btn-primary">
            Registrar solicitud (demo)
          </button>
        </div>
      </form>}
    </section>
  </>;
}
