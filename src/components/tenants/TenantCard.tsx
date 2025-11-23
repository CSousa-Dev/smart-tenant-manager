import type { Tenant } from '@/types';
import Button from '@/components/Button/Button';
import './TenantCard.css';

interface TenantCardProps {
  tenant: Tenant;
  onEdit: (tenant: Tenant) => void;
  onDelete: (tenant: Tenant) => void;
  onView?: (tenant: Tenant) => void;
}

const TenantCard = ({ tenant, onEdit, onDelete, onView }: TenantCardProps) => {
  const truncateId = (id: string) => {
    return `${id.substring(0, 8)}...`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Poderia adicionar um toast aqui se necessário
  };

  return (
    <div className="tenant-card">
      <div className="tenant-card-header">
        <div className="tenant-card-name">{tenant.name}</div>
        <div className="tenant-card-badge">Tenant</div>
      </div>
      
      <div className="tenant-card-body">
        <div className="tenant-card-info">
          <label className="tenant-card-label">ID:</label>
          <div className="tenant-card-id">
            <code>{truncateId(tenant.id)}</code>
            <button
              className="tenant-card-copy"
              onClick={() => copyToClipboard(tenant.id)}
              title="Copiar ID completo"
            >
              📋
            </button>
          </div>
        </div>
      </div>

      <div className="tenant-card-actions">
        {onView && (
          <Button
            variant="secondary"
            size="small"
            onClick={() => onView(tenant)}
          >
            Ver Detalhes
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
    </div>
  );
};

export default TenantCard;

