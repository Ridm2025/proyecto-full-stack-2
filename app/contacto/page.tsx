"use client";
import { useState } from 'react';
export default function Contacto() {
  const [ok, setOk] = useState(false);
  return <div className="card p-4 mx-auto" style={{ maxWidth: 650 }}>
    <h1>
      Contacto
    </h1>{ok ? <div className="alert alert-success">
      Formulario validado correctamente (demostración sin envío real).
    </div> : <form onSubmit={e => {
      e.preventDefault();
      setOk(true);
    }} className="d-grid gap-3">
      <label>
        Nombre
        <input className="form-control" required minLength={2} />
      </label>
      <label>
        Correo
        <input className="form-control" type="email" required />
      </label>
      <label>
        Mensaje
        <textarea className="form-control" required minLength={10} />
      </label>
      <button className="btn btn-primary">
        Enviar (demo)
      </button>
    </form>}
  </div>;
}
