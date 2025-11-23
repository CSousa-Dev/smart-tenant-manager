import { ReactNode } from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  title: string;
  message?: string;
  action?: ReactNode;
}

const EmptyState = ({ title, message, action }: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">📋</div>
      <h3 className="empty-state-title">{title}</h3>
      {message && <p className="empty-state-message">{message}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
};

export default EmptyState;

