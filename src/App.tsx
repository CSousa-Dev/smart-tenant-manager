import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './contexts/ToastContext'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import TenantsPage from './pages/TenantsPage/TenantsPage'

function App() {
  return (
    <ToastProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tenants" element={<TenantsPage />} />
          </Routes>
        </Layout>
      </Router>
    </ToastProvider>
  )
}

export default App

