import { useNavigate, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';
import './AdminForm.css'; 

const AdminInventoryCreate = () => {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await inventoryApi.create(formData);
      alert("Чашку успішно додано до колекції! ");
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert("Не вдалося додати чашку. Перевірте дані.");
    }
  };
  

  return (
    <div className="admin-form-container">
      <div className="back-link-container">
        <Link to="/admin" className="back-link">
          ← Повернутися до складу
        </Link>
      </div>

      <h1 className="admin-form-title">
        Додати нову чашку
      </h1>

      <div className="form-paper-card">
        <InventoryForm onSubmit={handleCreate} />
      </div>
    </div>
  );
};

export default AdminInventoryCreate;