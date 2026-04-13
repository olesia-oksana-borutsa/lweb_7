import { useState } from 'react';
import './InventoryForm.css';

const InventoryForm = ({ onSubmit, initialData = {} }) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Назва чашки обов'язкова! ");

    const formData = new FormData();
    formData.append('inventory_name', name); 
    formData.append('description', description);
    if (photo) formData.append('photo', photo);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="inventory-form">
      <div className="form-group">
        <label className="form-label">Назва чашки:</label>
        <input 
          className="form-input"
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="наприклад: Gingerbread Man Mug"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Опис:</label>
        <textarea 
          className="form-textarea"
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Опишіть вашу чашку..."
          rows="4"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Додати фото:</label>
        <div className="file-input-wrapper">
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setPhoto(e.target.files[0])} 
          />
        </div>
      </div>

      <button type="submit" className="btn-submit-form">
        Зберегти у колекцію
      </button>
    </form>
  );
};

export default InventoryForm;