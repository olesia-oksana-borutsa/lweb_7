import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import './AdminForm.css'; 


const AdminInventoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [currentPhoto, setCurrentPhoto] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    inventoryApi.getOne(id)
      .then(res => {
        setName(res.data.name);
        setDescription(res.data.description);
        setCurrentPhoto(res.data.photo_url);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdateText = async (e) => {
    e.preventDefault();
    try {
      await inventoryApi.updateText(id, { name, description });
      alert("Дані оновлено успішно! ");
    } catch (err) {
      alert("Не вдалося оновити текст ");
    }
  };

  const handleUpdatePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const fd = new FormData();
    fd.append('photo', file);
    
    try {
      await inventoryApi.updatePhoto(id, fd);
      alert("Фотографію змінено! ");
      navigate('/admin');
    } catch (err) {
      alert("Помилка при завантаженні фото");
    }
  };

  if (loading) return <div className="loading-text">Завантаження даних... </div>;

  return (
    <div className="admin-form-container" style={{ maxWidth: '1000px' }}>
      <div className="back-link-container">
        <Link to="/admin" className="back-link">
          ← Повернутись до складу
        </Link>
      </div>

      <h1 className="admin-form-title">Редагування чашки</h1>

      <div className="edit-grid">
        {/*  Форма з текстом */}
        <section>
          <form onSubmit={handleUpdateText} className="form-paper-card">
            <h3 style={{ color: '#8b4b5d', marginBottom: '20px' }}>Інформація про модель</h3>
            
            <div className="input-group">
              <label className="input-label">Назва:</label>
              <input 
                className="admin-input"
                value={name} 
                onChange={e => setName(e.target.value)} 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Опис:</label>
              <textarea 
                className="admin-textarea"
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                rows="8"
              />
            </div>

            <button type="submit" className="btn-submit">
              Зберегти текст
            </button>
          </form>
        </section>

        {/*  Фото */}
        <section>
          <div className="photo-card">
            <h3 style={{ color: '#8b4b5d', marginBottom: '20px' }}>Поточне фото</h3>
            {currentPhoto && (
              <img 
                src={`http://localhost:3000${currentPhoto}`} 
                alt="Cup preview" 
                className="current-photo"
              />
            )}
            <label className="file-upload-label">
              <span>Замінити фото </span>
              <input type="file" onChange={handleUpdatePhoto} style={{ display: 'none' }} />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminInventoryEdit;