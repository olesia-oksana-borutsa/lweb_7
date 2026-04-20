import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';
import { useState } from 'react';
import RoleModal from './components/navigation/RoleModal';

function App() {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  return (
    <InventoryProvider>
      <Router>
        <nav style={{ 
          padding: '20px', 
          background: '#ffd1dc', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <Link to="/admin" style={{ fontWeight: 'bold', color: '#8b4b5d', textDecoration: 'none' }}> Склад чашок</Link>
          <Link to="/admin/create" style={{ color: '#8b4b5d', textDecoration: 'none' }}> Додати нову</Link>
          
          <button 
            onClick={() => setIsRoleModalOpen(true)}
            style={{
              marginLeft: 'auto',
              padding: '8px 15px',
              background: '#8b4b5d',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Змінити режим
          </button>
        </nav>

        <RoleModal 
          isOpen={isRoleModalOpen} 
          onClose={() => setIsRoleModalOpen(false)} 
        />

        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/gallery" />} />
            <Route path="/admin" element={<AdminInventory />} />
            <Route path="/admin/create" element={<AdminInventoryCreate />} />
            <Route path="/admin/details/:id" element={<AdminInventoryDetails />} />
            <Route path="/admin/edit/:id" element={<AdminInventoryEdit />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<div style={{padding: '20px'}}>Сторінку не знайдено </div>} />
          </Routes>
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App;