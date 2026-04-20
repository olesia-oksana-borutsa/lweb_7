import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryDetails from '../components/inventory/InventoryDetails'; 
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
      
      
      <InventoryDetails item={item} /> 
      
    </div>
  );
};

export default AdminInventoryDetails;