import { useState, useEffect, useMemo } from 'react';
import { useInventory } from '../store/InventoryContext';
import { useFavorites } from '../hooks/useFavorites';
import { inventoryApi } from '../services/inventoryApi';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import './Gallery.css';

const Gallery = () => {
  const { items, setItems, loading, setLoading } = useInventory();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await inventoryApi.getAll();
      setItems(res.data);
    } catch (err) {
      setError(' Не вдалося завантажити чашки.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>
        <button className="retry-btn" onClick={loadData}>Спробувати ще раз</button>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <header className="gallery-intro">
        <h1>Колекція кераміки</h1>
        <input 
          type="text" 
          placeholder="Пошук чашки за назвою..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <div className="inventory-flex">
        {loading ? (
            
          [1, 2, 3, 4].map(n => (
            <div key={n} className="skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
            </div>
          ))
        ) : filteredItems.length === 0 ? (
          <p className="empty-msg">Нічого не знайдено </p>
        ) : (
          filteredItems.map(item => (
            <InventoryCard 
              key={item.id}
              item={item}
              isFav={isFavorite(item.id)}
              onToggleFav={toggleFavorite}
              onOpenDetails={(cup) => setSelectedItem(cup)}
            />
          ))
        )}
      </div>

      <InventoryQuickView 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
};

export default Gallery;