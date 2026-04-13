import { useEffect, useState } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import InventoryTable from '../components/inventory/InventoryTable';
import './AdminInventory.css';

const AdminInventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await inventoryApi.getAll();
      setItems(res.data);
    } catch (err) {
      console.error("Помилка завантаження:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити цю чашку?")) {
      try {
        await inventoryApi.delete(id);
        fetchItems();
      } catch (err) {
        alert("Не вдалося видалити");
      }
    }
  };

  return (
    <div className="admin-inventory-container fade-in">
      <h1 className="admin-inventory-title">Склад чашок</h1>
      {loading ? (
        <p className="loading-text">Завантаження інвентарю... </p>
      ) : (
        <InventoryTable items={items} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default AdminInventory;