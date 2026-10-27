import {
  iniciales,
  crearProducto,
  editarProducto,
  eliminarProducto,
  formatoCLP
} from "../data/catalogo";

const nuevo = {
  nombre: "Ventilador PC",
  categoria: "Componentes",
  precio: 12990,
  stock: 5,
  oferta: false,
  emoji: "🖥️"
};

describe("Catálogo Sting Tech - pruebas de lógica", () => {
  it("1. carga el catálogo inicial", () => {
    expect(iniciales.length).toBe(6);
    expect(iniciales[0].nombre).toContain("RAM");
  });

  it("2. crea un producto y asigna un ID único", () => {
    const resultado = crearProducto(iniciales, nuevo);
    expect(resultado.length).toBe(iniciales.length + 1);
    expect(resultado[resultado.length - 1].id).toBe(7);
    expect(resultado[resultado.length - 1].nombre).toBe("Ventilador PC");
  });

  it("3. edita un producto sin alterar los demás", () => {
    const resultado = editarProducto(iniciales, 2, { precio: 9990 });
    expect(resultado.find((p: any) => p.id === 2)?.precio).toBe(9990);
    expect(resultado.find((p: any) => p.id === 1)?.precio).toBe(34990);
  });

  it("4. elimina solamente el producto indicado", () => {
    const resultado = eliminarProducto(iniciales, 3);
    expect(resultado.length).toBe(5);
    expect(resultado.some((p: any) => p.id === 3)).toBeFalse();
  });

  it("5. muestra los precios en pesos chilenos", () => {
    const precio = formatoCLP(34990);
    expect(precio).toContain("34.990");
    expect(precio).toContain("$");
  });
});
