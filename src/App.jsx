import { useState } from 'react';
import { Check, ChartLine, Grid2X2, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';

const initialProducts = [
  { codigo: 'PRD-001', descripcion: 'Laptop Lenovo IdeaPad 3', precio: 649.99, categoria: 'Tecnología' },
  { codigo: 'PRD-002', descripcion: 'Monitor Full HD 24 pulgadas', precio: 189.5, categoria: 'Tecnología' },
  { codigo: 'PRD-003', descripcion: 'Silla ergonómica ejecutiva', precio: 239.99, categoria: 'Mobiliario' },
  { codigo: 'PRD-004', descripcion: 'Teclado mecánico inalámbrico', precio: 79.9, categoria: 'Accesorios' },
  { codigo: 'PRD-005', descripcion: 'Escritorio de oficina compacto', precio: 179, categoria: 'Mobiliario' },
];

function getNextProductCode(products) {
  const usedCodes = new Set(products.map((product) => product.codigo));
  let sequence = 1;

  while (usedCodes.has(`PRD-${String(sequence).padStart(3, '0')}`)) {
    sequence += 1;
  }

  return `PRD-${String(sequence).padStart(3, '0')}`;
}

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [notice, setNotice] = useState('');

  function handleSave(productData) {
    if (editingProduct) {
      setProducts((currentProducts) => currentProducts.map((product) => (
        product.codigo === editingProduct.codigo
          ? { ...productData, codigo: editingProduct.codigo }
          : product
      )));
      setNotice(`El producto ${editingProduct.codigo} se actualizó correctamente.`);
      setEditingProduct(null);
      return;
    }

    const newProduct = { ...productData, codigo: getNextProductCode(products) };
    setProducts((currentProducts) => [...currentProducts, newProduct]);
    setNotice(`El producto ${newProduct.codigo} se registró correctamente.`);
  }

  function handleDelete(product) {
    const confirmed = window.confirm(`¿Deseas eliminar el producto ${product.codigo} - ${product.descripcion}?`);

    if (!confirmed) {
      return;
    }

    setProducts((currentProducts) => currentProducts.filter((item) => item.codigo !== product.codigo));
    if (editingProduct?.codigo === product.codigo) {
      setEditingProduct(null);
    }
    setNotice(`El producto ${product.codigo} se eliminó correctamente.`);
  }

  const categories = new Set(products.map((product) => product.categoria)).size;
  const averagePrice = products.reduce((total, product) => total + product.precio, 0) / products.length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <Package aria-hidden="true" className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-indigo-600">Panel de administración</p>
              <h1 className="text-xl font-bold tracking-tight">Gestión de productos</h1>
            </div>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Datos temporales
          </div>
        </header>

        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Resumen general</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryCard label="Productos registrados" value={products.length} detail="Elementos en el inventario" icon="box" />
            <SummaryCard label="Categorías activas" value={categories} detail="Tipos de producto" icon="grid" />
            <SummaryCard
              label="Precio promedio"
              value={averagePrice.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
              detail="Valor promedio por producto"
              icon="chart"
            />
          </div>
        </section>

        {notice && (
          <div role="status" className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Check aria-hidden="true" className="h-4 w-4" />
            </span>
            {notice}
          </div>
        )}

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(300px,0.78fr)_minmax(0,1.7fr)]">
          <ProductForm
            onSave={handleSave}
            editingProduct={editingProduct}
            onCancelEdit={() => setEditingProduct(null)}
            onFormChange={() => setNotice('')}
          />
          <ProductTable
            products={products}
            onEdit={(product) => {
              setEditingProduct(product);
              setNotice('');
            }}
            onDelete={handleDelete}
          />
        </div>

        <footer className="pt-8 text-center text-xs text-slate-400">
          Los cambios son temporales y se perderán al recargar la página. No se utiliza una base de datos.
        </footer>
      </div>
    </main>
  );
}

function SummaryCard({ label, value, detail, icon }) {
  const iconPaths = { box: Package, grid: Grid2X2, chart: ChartLine };
  const Icon = iconPaths[icon];

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
        </div>
        <p className="mt-3 text-xs text-slate-400">{detail}</p>
      </CardContent>
    </Card>
  );
}

export default App;
