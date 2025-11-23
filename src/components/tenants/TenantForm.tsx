import { useState, useEffect } from 'react';
import type { Tenant, CreateTenantRequest, UpdateTenantRequest } from '@/types';
import Button from '@/components/Button/Button';
import './TenantForm.css';

interface TenantFormProps {
  tenant?: Tenant;
  onSubmit: (data: CreateTenantRequest | UpdateTenantRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const TenantForm = ({ tenant, onSubmit, onCancel, isLoading = false }: TenantFormProps) => {
  const [name, setName] = useState(tenant?.name || '');
  const [errors, setErrors] = useState<{ name?: string }>({});

  useEffect(() => {
    if (tenant) {
      setName(tenant.name);
    }
  }, [tenant]);

  const validate = (): boolean => {
    const newErrors: { name?: string } = {};
    
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      newErrors.name = 'O nome é obrigatório';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'O nome deve ter pelo menos 2 caracteres';
    } else if (trimmedName.length > 100) {
      newErrors.name = 'O nome deve ter no máximo 100 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    try {
      await onSubmit({ name: name.trim() });
    } catch (error) {
      // Error handling is done by parent component
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tenant-form">
      <div className="tenant-form-field">
        <label htmlFor="name" className="tenant-form-label">
          Nome <span className="required">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) {
              setErrors({ ...errors, name: undefined });
            }
          }}
          className={`tenant-form-input ${errors.name ? 'error' : ''}`}
          placeholder="Digite o nome do tenant"
          disabled={isLoading}
          autoFocus
        />
        {errors.name && <span className="tenant-form-error">{errors.name}</span>}
      </div>

      <div className="tenant-form-actions">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading || !name.trim()}
        >
          {isLoading ? 'Salvando...' : tenant ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </form>
  );
};

export default TenantForm;

