// src/app/productos/page.tsx
import type { Metadata } from 'next';
import CatalogView from '@/components/catalog/CatalogView';

export const metadata: Metadata = {
  title: 'Catálogo de Piezas • Origen Mates',
  description: 'Explora nuestra colección de mates de calabaza, alpaca y accesorios artesanales.',
};

export default function ProductosPage() {
  return <CatalogView />;
}