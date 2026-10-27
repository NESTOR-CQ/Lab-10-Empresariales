import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const emptyForm = {
  descripcion: '',
  precio: '',
  categoria: '',
};

const categories = ['Tecnología', 'Mobiliario', 'Accesorios', 'Papelería', 'Otros'];

function ProductForm({ onSave, editingProduct, onCancelEdit, onFormChange }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProduct) {
      setForm({
        descripcion: editingProduct.descripcion,
        precio: String(editingProduct.precio),
        categoria: editingProduct.categoria,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [editingProduct]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
    onFormChange();
  }

  function handleCategoryChange(value) {
    setForm((currentForm) => ({ ...currentForm, categoria: value }));
    setErrors((currentErrors) => ({ ...currentErrors, categoria: '' }));
    onFormChange();
  }

  function handleClear() {
    setForm(emptyForm);
    setErrors({});
    onFormChange();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};
    const description = form.descripcion.trim();
    const price = Number(form.precio);

    if (!description) {
      nextErrors.descripcion = 'La descripción es obligatoria.';
    } else if (description.length < 3) {
      nextErrors.descripcion = 'Escribe al menos 3 caracteres.';
    }

    if (form.precio === '') {
      nextErrors.precio = 'El precio es obligatorio.';
    } else if (!Number.isFinite(price) || price <= 0) {
      nextErrors.precio = 'El precio debe ser mayor a 0.';
    }

    if (!form.categoria) {
      nextErrors.categoria = 'Selecciona una categoría.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      onFormChange();
      return;
    }

    onSave({
      descripcion: description,
      precio: price,
      categoria: form.categoria,
    });
    setForm(emptyForm);
    setErrors({});
  }

  return (
    <Card>
      <CardHeader>
        <p className="text-sm font-semibold text-indigo-600">{editingProduct ? 'Edición de registro' : 'Nuevo registro'}</p>
        <CardTitle className="text-xl">
          {editingProduct ? `Editar ${editingProduct.codigo}` : 'Registrar producto'}
        </CardTitle>
        <CardDescription>
          {editingProduct ? 'Modifica los datos y guarda los cambios.' : 'Completa los datos para añadir un producto al inventario.'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-5">
          <div>
            <Label htmlFor="descripcion" className="mb-1.5 block text-slate-700">Descripción</Label>
            <Input
              id="descripcion"
              name="descripcion"
              type="text"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Ej. Audífonos inalámbricos"
              aria-invalid={Boolean(errors.descripcion)}
              aria-describedby={errors.descripcion ? 'descripcion-error' : undefined}
              className={errors.descripcion ? 'border-rose-400 focus-visible:ring-rose-300' : ''}
            />
            {errors.descripcion && <p id="descripcion-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-600">{errors.descripcion}</p>}
          </div>

          <div>
            <Label htmlFor="precio" className="mb-1.5 block text-slate-700">Precio</Label>
            <div className="relative">
              <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm text-slate-400">$</span>
              <Input
                id="precio"
                name="precio"
                type="number"
                min="0"
                step="0.01"
                value={form.precio}
                onChange={handleChange}
                placeholder="0.00"
                aria-invalid={Boolean(errors.precio)}
                aria-describedby={errors.precio ? 'precio-error' : undefined}
                className={`pl-8 ${errors.precio ? 'border-rose-400 focus-visible:ring-rose-300' : ''}`}
              />
            </div>
            {errors.precio && <p id="precio-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-600">{errors.precio}</p>}
          </div>

          <div>
            <Label htmlFor="categoria" className="mb-1.5 block text-slate-700">Categoría</Label>
            <Select
              value={form.categoria}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger
                id="categoria"
                aria-invalid={Boolean(errors.categoria)}
                aria-describedby={errors.categoria ? 'categoria-error' : undefined}
                className={errors.categoria ? 'border-rose-400 focus:ring-rose-300' : ''}
              >
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoria && <p id="categoria-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-600">{errors.categoria}</p>}
          </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button type="submit" className="flex-1">
              {editingProduct ? 'Guardar cambios' : 'Registrar producto'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                handleClear();
                if (editingProduct) {
                  onCancelEdit();
                }
              }}
            >
              {editingProduct ? 'Cancelar edición' : 'Limpiar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ProductForm;
