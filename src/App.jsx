import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';
import { useState } from 'react';
import RoleModal from './components/navigation/RoleModal';

function Navigation() {
  const location = useLocation();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <nav style={{ 
        padding: '15px 40px', 
        background: '#ffd1dc', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <span style={{ 
          fontWeight: 'bold', 
          color: '#5a1238', 
          marginRight: '20px',
          padding: '5px 12px',
          background: 'rgba(255,255,255,0.4)',
          borderRadius: '10px',
          fontSize: '14px'
        }}>
          {isAdmin ? 'РЕЖИМ:Адміністратор' : 'РЕЖИМ: Користувач'}
        </span>

        {isAdmin ? (
          <>
            <Link to="/admin" style={{ color: '#8b4b5d', textDecoration: 'none', fontWeight: '500' }}>Склад чашок</Link>
            <Link to="/admin/create" style={{ color: '#8b4b5d', textDecoration: 'none', fontWeight: '500' }}>Додати нову</Link>
          </>
        ) : (
          <>
            <Link to="/gallery" style={{ color: '#8b4b5d', textDecoration: 'none', fontWeight: '500' }}>Галерея</Link>
            <Link to="/favorites" style={{ color: '#8b4b5d', textDecoration: 'none', fontWeight: '500' }}>Улюблене </Link>
          </>
        )}

        <button 
          onClick={() => setIsRoleModalOpen(true)}
          style={{
            marginLeft: 'auto',
            padding: '8px 18px',
            background: '#8b4b5d',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
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
    </>
  );
}

function App() {
  return (
    <InventoryProvider>
      <Router>
        <Navigation />
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