import type { Tenant } from '@/types';
import Button from '@/components/Button/Button';
import './TenantDetail.css';

interface TenantDetailProps {
  tenant: Tenant;
  onEdit: () => void;
  onDelete: () => void;
  onClose?: () => void;
}

const TenantDetail = ({ tenant, onEdit, onDelete, onClose }: TenantDetailProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="tenant-detail">
      <div className="tenant-detail-field">
        <label className="tenant-detail-label">ID</label>
        <div className="tenant-detail-value-container">
          <code className="tenant-detail-value">{tenant.id}</code>
          <button
            className="copy-btn"
            onClick={() => copyToClipboard(tenant.id)}
            title="Copiar ID"
          >
            📋 Copiar
          </button>
        </div>
      </div>

      <div className="tenant-detail-field">
        <label className="tenant-detail-label">Nome do Tenant</label>
        <div className="tenant-detail-name-container">
          <div className="tenant-detail-name">{tenant.name}</div>
          <div className="tenant-detail-name-badge">Tenant</div>
        </div>
      </div>

      <div className="tenant-detail-actions">
        {onClose && (
          <Button variant="secondary" onClick={onClose}>
            Voltar
          </Button>
        )}
        <Button variant="secondary" onClick={onEdit}>
          Editar
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Excluir
        </Button>
      </div>
    </div>
  );
};

export default TenantDetail;

