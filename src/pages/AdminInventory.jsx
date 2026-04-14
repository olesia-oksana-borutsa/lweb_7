import { useEffect, useState } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import InventoryTable from '../components/inventory/InventoryTable';
import ConfirmModal from '../components/inventory/ConfirmModal'; 
import './AdminInventory.css';

const AdminInventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  
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

  
  const openDeleteModal = (id) => {
    setIdToDelete(id);
    setIsModalOpen(true);
  };

  
  const handleConfirmDelete = async () => {
    try {
      await inventoryApi.delete(idToDelete); 
      fetchItems(); 
    } catch (err) {
      alert("Не вдалося видалити");
    } finally {
      setIsModalOpen(false); 
      setIdToDelete(null);
    }
  };

  return (
    <div className="admin-inventory-container fade-in">
      <h1 className="admin-inventory-title">Склад чашок</h1>
      
      {loading ? (
        <p className="loading-text">Завантаження інвентарю... </p>
      ) : items.length === 0 ? (
        <p className="empty-state">На складі поки немає чашок. </p> 
      ) : (
       
        <InventoryTable items={items} onDelete={openDeleteModal} />
      )}


      <ConfirmModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmDelete}
        title="Ви впевнені, що хочете видалити цю чашку?"
      />
    </div>
  );
};

export default AdminInventory;