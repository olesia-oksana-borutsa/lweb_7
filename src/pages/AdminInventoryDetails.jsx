import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

const AdminInventoryDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    inventoryApi.getOne(id).then(res => setItem(res.data));
  }, [id]);

  if (!item) return <div style={{ color: '#d87093', padding: '20px' }}>Шукаємо вашу чашку... </div>;

  return (
    <div style={{ padding: '20px', background: 'white', borderRadius: '15px', maxWidth: '600px', margin: '20px auto', boxShadow: '0 10px 25px rgba(255, 182, 193, 0.2)' }}>
      <Link to="/admin" style={{ color: '#ff69b4', textDecoration: 'none', fontWeight: 'bold' }}>← Повернутися до складу</Link>
      
      <h1 style={{ color: '#8b4b5d', marginTop: '20px' }}>{item.name}</h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>{item.description}</p>
      
      {item.photo_url && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <img 
            src={`http://localhost:3000${item.photo_url}`} 
            alt={item.name} 
            style={{ maxWidth: '100%', borderRadius: '15px', border: '5px solid #ffd1dc' }} 
          />
        </div>
      )}
    </div>
  );
};

export default AdminInventoryDetails;