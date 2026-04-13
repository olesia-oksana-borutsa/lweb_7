import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

const AdminInventoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    inventoryApi.getOne(id).then(res => {
      setName(res.data.name);
      setDescription(res.data.description);
    });
  }, [id]);

  const handleUpdateText = async (e) => {
    e.preventDefault();
    try {
      await inventoryApi.updateText(id, { name, description });
      alert("Опис чашки оновлено! ");
    } catch (err) {
      alert("Помилка при оновленні тексту");
    }
  };

  const handleUpdatePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('photo', file);
    try {
      await inventoryApi.updatePhoto(id, fd);
      alert("Фото оновлено! ");
      navigate('/admin');
    } catch (err) {
      alert("Помилка при завантаженні фото");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2 style={{ color: '#d87093' }}>Редагування чашки</h2>
      
      <form onSubmit={handleUpdateText} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px', padding: '20px', background: '#fff', borderRadius: '15px' }}>
        <h3>Змінити інформацію</h3>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Назва" />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Опис" rows="4" />
        <button type="submit">Оновити текст</button>
      </form>

      <div style={{ padding: '20px', background: '#fff', borderRadius: '15px', border: '2px dashed #ffb6c1' }}>
        <h3>Оновити фотографію</h3>
        <input type="file" onChange={handleUpdatePhoto} />
      </div>
    </div>
  );
};

export default AdminInventoryEdit;