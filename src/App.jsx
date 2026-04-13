import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

function App() {
  return (
    <InventoryProvider>
      <Router>
        <nav style={{ 
          padding: '20px', 
          background: '#ffd1dc', 
          display: 'flex', 
          gap: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          {/*  Link замість <a> для React Router */}
          <Link to="/admin" style={{ fontWeight: 'bold', color: '#8b4b5d', textDecoration: 'none' }}> Склад чашок</Link>
          <Link to="/admin/create" style={{ color: '#8b4b5d', textDecoration: 'none' }}> Додати нову</Link>
        </nav>

        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/admin" />} />
            <Route path="/admin" element={<AdminInventory />} />
            <Route path="/admin/create" element={<AdminInventoryCreate />} />
            <Route path="/admin/details/:id" element={<AdminInventoryDetails />} />
            <Route path="/admin/edit/:id" element={<AdminInventoryEdit />} />
            {/* Catch-all route для помилок */}
            <Route path="/" element={<Navigate to="/admin" />} />
            <Route path="*" element={<div style={{padding: '20px'}}>Сторінку не знайдено </div>} />
          </Routes>
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App;