import { useState } from 'react';

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
    <form onSubmit={handleSubmit} style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '15px', 
      maxWidth: '400px', 
      background: 'white', 
      padding: '25px', 
      borderRadius: '15px', 
      boxShadow: '0 5px 15px rgba(255, 182, 193, 0.2)' 
    }}>
      <label style={{ fontWeight: 'bold', color: '#8b4b5d' }}>Назва чашки:</label>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="наприклад: Gingerbread Man Mug"
      />

      <label style={{ fontWeight: 'bold', color: '#8b4b5d' }}>Опис:</label>
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Опишіть вашу чашку..."
        rows="4"
      />

      <label style={{ fontWeight: 'bold', color: '#8b4b5d' }}>Додати фото:</label>
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setPhoto(e.target.files[0])} 
        style={{ border: 'none' }}
      />

      <button type="submit">Зберегти у колекцію </button>
    </form>
  );
};

export default InventoryForm;