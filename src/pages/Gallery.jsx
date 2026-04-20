import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await inventoryApi.getAll();
        setItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setItems, setLoading]);

  return (
    <div className="gallery-page">
      <header className="gallery-intro">
        <h1>Колекція кераміки</h1>
      </header>

      {items.length === 0 && !loading ? (
        <p className="empty-msg">На складі поки немає чашок. Зайдіть в адмінку, щоб додати!</p>
      ) : (
        <div className="inventory-flex">
          {items.map(item => (
            <InventoryCard 
              key={item.id}
              item={item}
              isFav={isFavorite(item.id)}
              onToggleFav={toggleFavorite}
              onOpenDetails={(cup) => setSelectedItem(cup)}
            />
          ))}
        </div>
      )}

      <InventoryQuickView 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
};

export default Gallery;