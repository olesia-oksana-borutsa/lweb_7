import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import './AdminInventoryDetails.css';

const AdminInventoryDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    inventoryApi.getOne(id)
      .then(res => setItem(res.data))
      .catch(err => console.error("Помилка:", err));
  }, [id]);

  if (!item) return <div className="searching-text">Шукаємо вашу чашку... </div>;

  return (
    <div className="details-page-container">
      <Link to="/admin" className="details-back-link">
        ← Повернутись до складу
      </Link>
      
      <h1 className="details-header">{item.name}</h1>
      <p className="details-text">{item.description}</p>
      
      {item.photo_url && (
        <div className="details-image-wrapper">
          <img 
            src={`http://localhost:3000${item.photo_url}`} 
            alt={item.name} 
            className="details-full-image"
          />
        </div>
      )}
    </div>
  );
};

export default AdminInventoryDetails;