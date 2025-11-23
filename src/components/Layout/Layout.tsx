import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useToastContext } from '@/contexts/ToastContext'
import ToastContainer from '@/components/shared/ToastContainer'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const toast = useToastContext()

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="layout-header-content">
          <Link to="/" className="layout-header-title">
            <h1>Smart Chat</h1>
            <p>Tenant Manager</p>
          </Link>
          <nav className="layout-nav">
            <Link to="/" className="layout-nav-link">Home</Link>
            <Link to="/tenants" className="layout-nav-link">Tenants</Link>
          </nav>
        </div>
      </header>
      <main className="layout-main">
        {children}
      </main>
      <footer className="layout-footer">
        <p>&copy; 2024 Smart Chat. Tenant Manager Module.</p>
      </footer>
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </div>
  )
}

export default Layout

