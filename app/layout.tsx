import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { TiendaProvider } from '../components/TiendaProvider';
import Menu from '../components/Menu';
export const metadata = { title: 'Sting Tech Solutions | Tienda y soporte', description: 'Servicios técnicos y accesorios computacionales' };
export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return <html lang="es">
    <body>
      <TiendaProvider>
        <Menu />
        <main className="container py-5 min-vh-75">
          {children}
        </main>
        <footer className="text-center py-4 mt-5 bg-dark text-white">
          Sting Tech Solutions · Proyecto académico · Compra simulada
        </footer>
      </TiendaProvider>
    </body>
  </html>;
}
