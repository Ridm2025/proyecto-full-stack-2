import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import TarjetaProducto from "../components/TarjetaProducto";
import { TiendaProvider } from "../components/TiendaProvider";
import { iniciales } from "../data/catalogo";

// React 19 requiere habilitar act para las pruebas fuera de Jest.
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

describe("TarjetaProducto React - renderizado, props y eventos", () => {
  let contenedor: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    localStorage.clear();
    contenedor = document.createElement("div");
    document.body.appendChild(contenedor);
    root = createRoot(contenedor);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    contenedor.remove();
    localStorage.clear();
  });

  async function renderizar(producto = iniciales[0]) {
    await act(async () => {
      root.render(
        <TiendaProvider>
          <TarjetaProducto producto={producto} />
        </TiendaProvider>
      );
    });
  }

  it("6. renderiza el nombre recibido mediante props", async () => {
    await renderizar(iniciales[0]);
    expect(contenedor.textContent).toContain("Memoria RAM 16 GB DDR4");
  });

  it("7. renderiza la categoría y precio del producto", async () => {
    await renderizar(iniciales[1]);
    expect(contenedor.textContent).toContain("Almacenamiento");
    expect(contenedor.textContent).toContain("65.990");
  });

  it("8. muestra la etiqueta Oferta de forma condicional", async () => {
    await renderizar(iniciales[0]);
    expect(contenedor.textContent).toContain("Oferta");
    await renderizar(iniciales[2]);
    expect(contenedor.textContent).not.toContain("Oferta");
  });

  it("9. deshabilita agregar cuando no hay stock", async () => {
    await renderizar({ ...iniciales[0], stock: 0 });
    const boton = contenedor.querySelector("button") as HTMLButtonElement;
    expect(boton.disabled).toBeTrue();
    expect(boton.textContent).toContain("Agotado");
  });

  it("10. responde al clic y actualiza el carrito en localStorage", async () => {
    await renderizar(iniciales[0]);
    const boton = contenedor.querySelector("button") as HTMLButtonElement;
    await act(async () => boton.click());
    const guardado = JSON.parse(localStorage.getItem("sting_carrito") || "[]");
    expect(guardado).toEqual([{ id: 1, cantidad: 1 }]);
  });
});
