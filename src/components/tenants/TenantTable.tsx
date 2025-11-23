import { useState } from 'react';
import type { Tenant } from '@/types';
import Button from '@/components/Button/Button';
import './TenantTable.css';

interface TenantTableProps {
  tenants: Tenant[];
  onEdit: (tenant: Tenant) => void;
  onDelete: (tenant: Tenant) => void;
  onView?: (tenant: Tenant) => void;
}

type SortField = 'name' | 'id';
type SortOrder = 'asc' | 'desc';

const TenantTable = ({ tenants, onEdit, onDelete, onView }: TenantTableProps) => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedTenants = [...tenants].sort((a, b) => {
    let aValue: string;
    let bValue: string;

    if (sortField === 'name') {
      aValue = a.name.toLowerCase();
      bValue = b.name.toLowerCase();
    } else {
      aValue = a.id;
      bValue = b.id;
    }

    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const truncateId = (id: string) => {
    return `${id.substring(0, 8)}...`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="tenant-table-container">
      <table className="tenant-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')} className="sortable">
              ID
              {sortField === 'id' && (
                <span className="sort-indicator">{sortOrder === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </th>
            <th onClick={() => handleSort('name')} className="sortable">
              Nome
              {sortField === 'name' && (
                <span className="sort-indicator">{sortOrder === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedTenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>
                <div className="tenant-id-cell">
                  <span title={tenant.id}>{truncateId(tenant.id)}</span>
                  <button
                    className="copy-id-btn"
                    onClick={() => copyToClipboard(tenant.id)}
                    title="Copiar ID completo"
                  >
                    📋
                  </button>
                </div>
              </td>
              <td>
                <div className="tenant-name-cell">
                  <span className="tenant-name">{tenant.name}</span>
                  <span className="tenant-name-badge">Tenant</span>
                </div>
              </td>
              <td>
                <div className="tenant-actions">
                  {onView && (
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => onView(tenant)}
                    >
                      Ver
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => onEdit(tenant)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => onDelete(tenant)}
                  >
                    Excluir
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenantTable;

