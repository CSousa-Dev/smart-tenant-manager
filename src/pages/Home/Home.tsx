import { Link } from 'react-router-dom'
import Button from '@/components/Button/Button'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <div className="home-content">
        <h2>Bem-vindo ao Tenant Manager</h2>
        <p>
          Sistema de gerenciamento de tenants para o Smart Chat.
          Gerencie seus tenants de forma simples e eficiente.
        </p>
        
        <div className="home-actions">
          <Link to="/tenants">
            <Button variant="primary" size="large">
              Gerenciar Tenants
            </Button>
          </Link>
        </div>
        
        <div className="home-features">
          <div className="feature-card">
            <h3>📋 Gerenciamento Completo</h3>
            <p>Crie, edite e exclua tenants facilmente</p>
          </div>
          
          <div className="feature-card">
            <h3>🔍 Busca Inteligente</h3>
            <p>Encontre tenants rapidamente com busca em tempo real</p>
          </div>
          
          <div className="feature-card">
            <h3>✨ Interface Moderna</h3>
            <p>Design responsivo e intuitivo para melhor experiência</p>
          </div>
          
          <div className="feature-card">
            <h3>⚡ Performance</h3>
            <p>Carregamento rápido e operações otimizadas</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

