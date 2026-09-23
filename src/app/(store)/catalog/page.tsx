// src/app/productos/page.tsx
import CatalogView from '@/features/catalog/components/CatalogView';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Catálogo de Piezas • Origen Mates',
  description: 'Explora nuestra colección de mates de calabaza, alpaca y accesorios artesanales.',
};

export default function ProductosPage() {
  return <CatalogView/>
}