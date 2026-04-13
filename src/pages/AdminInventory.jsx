import { useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import { useInventory } from '../store/InventoryContext';
import InventoryTable from '../components/inventory/InventoryTable';
import { Link } from 'react-router-dom';

const AdminInventory = () => {
  const { items, setItems, loading, setLoading, error, setError } = useInventory();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await inventoryApi.getAll();
      setItems(res.data);
      setError(null);
    } catch (err) {
      setError("Не вдалося завантажити чашки");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити цю чашку?")) {
      await inventoryApi.delete(id);
      fetchItems();
    }
  };

  if (loading) return <div>Завантаження чашок...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Склад чашок (Адмін-панель)</h2>
        <Link to="/admin/create" style={{ padding: '10px', background: '#4CAF50', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
           Додати нову чашку
        </Link>
      </div>
      
      {items.length === 0 ? (
        <p>На складі поки порожньо </p>
      ) : (
        <InventoryTable items={items} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default AdminInventory;