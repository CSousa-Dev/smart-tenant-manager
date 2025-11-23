import { useState } from 'react';
import type { Tenant } from '@/types';
import TenantTable from './TenantTable';
import TenantCard from './TenantCard';
import './TenantList.css';

interface TenantListProps {
  tenants: Tenant[];
  onEdit: (tenant: Tenant) => void;
  onDelete: (tenant: Tenant) => void;
  onView?: (tenant: Tenant) => void;
}

type ViewMode = 'cards' | 'table';

const TenantList = ({ tenants, onEdit, onDelete, onView }: TenantListProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  return (
    <div className="tenant-list">
      <div className="tenant-list-header">
        <div className="tenant-list-title">
          <h2>Tenants Cadastrados</h2>
          <span className="tenant-list-count">{tenants.length} {tenants.length === 1 ? 'tenant' : 'tenants'}</span>
        </div>
        <div className="tenant-list-view-toggle">
          <button
            className={`view-toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => setViewMode('cards')}
            title="Visualização em cards"
          >
            🎴 Cards
          </button>
          <button
            className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            title="Visualização em tabela"
          >
            📊 Tabela
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="tenant-list-cards">
          {tenants.map((tenant) => (
            <TenantCard
              key={tenant.id}
              tenant={tenant}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </div>
      ) : (
        <TenantTable
          tenants={tenants}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      )}
    </div>
  );
};

export default TenantList;

