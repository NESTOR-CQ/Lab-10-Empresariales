import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function ProductTable({ products, onEdit, onDelete }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 border-b px-5 py-5 sm:px-6">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-indigo-600">Catálogo</p>
          <CardTitle className="text-xl">Productos registrados</CardTitle>
        </div>
        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {products.length} {products.length === 1 ? 'producto' : 'productos'}
        </span>
      </CardHeader>

      <CardContent className="p-0">
        <Table className="min-w-[760px]">
          <TableHeader className="bg-slate-50 text-xs uppercase tracking-wide">
            <TableRow className="hover:bg-slate-50">
              <TableHead className="px-6 font-semibold">Código</TableHead>
              <TableHead className="px-6 font-semibold">Descripción</TableHead>
              <TableHead className="px-6 font-semibold">Categoría</TableHead>
              <TableHead className="px-6 text-right font-semibold">Precio</TableHead>
              <TableHead className="px-6 text-right font-semibold">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.codigo}>
                <TableCell className="whitespace-nowrap px-6">
                  <span className="rounded-md bg-indigo-50 px-2 py-1 font-mono text-xs font-semibold text-indigo-700">{product.codigo}</span>
                </TableCell>
                <TableCell className="px-6 font-medium text-slate-800">{product.descripcion}</TableCell>
                <TableCell className="whitespace-nowrap px-6">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{product.categoria}</span>
                </TableCell>
                <TableCell className="whitespace-nowrap px-6 text-right font-semibold tabular-nums text-slate-800">
                  {product.precio.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                </TableCell>
                <TableCell className="whitespace-nowrap px-6 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(product)}
                      aria-label={`Editar ${product.codigo}`}
                    >
                      <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
                      Editar
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(product)}
                      aria-label={`Eliminar ${product.codigo}`}
                    >
                      <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No hay productos registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ProductTable;
