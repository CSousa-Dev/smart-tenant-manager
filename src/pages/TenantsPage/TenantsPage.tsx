import { useState, useEffect, useMemo } from 'react';
import { useTenants } from '@/hooks/useTenants';
import { useToastContext } from '@/contexts/ToastContext';
import type { Tenant, CreateTenantRequest, UpdateTenantRequest } from '@/types';
import TenantList from '@/components/tenants/TenantList';
import TenantForm from '@/components/tenants/TenantForm';
import TenantDetail from '@/components/tenants/TenantDetail';
import TenantSearch from '@/components/tenants/TenantSearch';
import EmptyState from '@/components/shared/EmptyState';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Modal from '@/components/shared/Modal';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import Button from '@/components/Button/Button';
import './TenantsPage.css';

const TenantsPage = () => {
  const { tenants, loading, error, fetchTenants, createTenant, updateTenant, deleteTenant } = useTenants();
  const toast = useToastContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [viewingTenant, setViewingTenant] = useState<Tenant | null>(null);
  const [deletingTenant, setDeletingTenant] = useState<Tenant | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTenants().catch((err) => {
      toast.error(err.message || 'Erro ao carregar tenants');
    });
  }, [fetchTenants, toast]);

  const filteredTenants = useMemo(() => {
    if (!searchTerm.trim()) {
      return tenants;
    }
    const term = searchTerm.toLowerCase();
    return tenants.filter((tenant) =>
      tenant.name.toLowerCase().includes(term) ||
      tenant.id.toLowerCase().includes(term)
    );
  }, [tenants, searchTerm]);

  const handleCreate = async (data: CreateTenantRequest) => {
    setIsSubmitting(true);
    try {
      await createTenant(data);
      toast.success('Tenant criado com sucesso!');
      setIsCreateModalOpen(false);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro desconhecido');
      toast.error(error.message || 'Erro ao criar tenant');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: UpdateTenantRequest) => {
    if (!editingTenant) return;
    
    setIsSubmitting(true);
    try {
      await updateTenant(editingTenant.id, data);
      toast.success('Tenant atualizado com sucesso!');
      setEditingTenant(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro desconhecido');
      toast.error(error.message || 'Erro ao atualizar tenant');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingTenant) return;
    
    setIsSubmitting(true);
    try {
      await deleteTenant(deletingTenant.id);
      toast.success('Tenant excluído com sucesso!');
      setDeletingTenant(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro desconhecido');
      toast.error(error.message || 'Erro ao excluir tenant');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && tenants.length === 0) {
    return <LoadingSpinner message="Carregando tenants..." />;
  }

  if (error && tenants.length === 0) {
    return (
      <div className="tenants-page-error">
        <p>Erro ao carregar tenants: {error.message}</p>
        <Button onClick={() => fetchTenants()}>Tentar novamente</Button>
      </div>
    );
  }

  return (
    <div className="tenants-page">
      <div className="tenants-page-header">
        <div className="tenants-page-header-content">
          <div>
            <h1>Gerenciar Tenants</h1>
            <p className="tenants-page-subtitle">
              {tenants.length === 0 
                ? 'Nenhum tenant cadastrado' 
                : `${tenants.length} ${tenants.length === 1 ? 'tenant cadastrado' : 'tenants cadastrados'}`
              }
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            + Criar Tenant
          </Button>
        </div>
      </div>

      <div className="tenants-page-content">
        {tenants.length > 0 && (
          <TenantSearch
            value={searchTerm}
            onChange={setSearchTerm}
            resultCount={filteredTenants.length}
          />
        )}

        {filteredTenants.length === 0 && tenants.length > 0 ? (
          <div className="tenants-page-empty-search">
            <p>Nenhum tenant encontrado com o termo "{searchTerm}"</p>
            <Button variant="secondary" onClick={() => setSearchTerm('')}>
              Limpar busca
            </Button>
          </div>
        ) : filteredTenants.length === 0 ? (
          <EmptyState
            title="Nenhum tenant cadastrado"
            message="Comece criando seu primeiro tenant"
            action={
              <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
                Criar Primeiro Tenant
              </Button>
            }
          />
        ) : (
          <TenantList
            tenants={filteredTenants}
            onEdit={setEditingTenant}
            onDelete={setDeletingTenant}
            onView={setViewingTenant}
          />
        )}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Criar Novo Tenant"
        preventClose={isSubmitting}
      >
        <TenantForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={isSubmitting}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingTenant}
        onClose={() => setEditingTenant(null)}
        title={editingTenant ? `Editar: ${editingTenant.name}` : 'Editar Tenant'}
        preventClose={isSubmitting}
      >
        {editingTenant && (
          <TenantForm
            tenant={editingTenant}
            onSubmit={handleUpdate}
            onCancel={() => setEditingTenant(null)}
            isLoading={isSubmitting}
          />
        )}
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={!!viewingTenant}
        onClose={() => setViewingTenant(null)}
        title={viewingTenant ? `Detalhes: ${viewingTenant.name}` : 'Detalhes do Tenant'}
      >
        {viewingTenant && (
          <TenantDetail
            tenant={viewingTenant}
            onEdit={() => {
              setViewingTenant(null);
              setEditingTenant(viewingTenant);
            }}
            onDelete={() => {
              setViewingTenant(null);
              setDeletingTenant(viewingTenant);
            }}
            onClose={() => setViewingTenant(null)}
          />
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingTenant}
        title="Excluir Tenant"
        message={
          deletingTenant
            ? `Tem certeza que deseja excluir o tenant "${deletingTenant.name}"? Esta ação não pode ser desfeita.`
            : ''
        }
        confirmText="Excluir"
        cancelText="Cancelar"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeletingTenant(null)}
      />
    </div>
  );
};

export default TenantsPage;

