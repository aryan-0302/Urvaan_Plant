import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import NotifyModal from './NotifyModal'; // Import the modal

const PlantCard = ({ plant, index }) => {
  const { addToCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const fontClasses = ['font-poppins', 'font-lora', 'font-roboto-slab'];
  const fontClass = fontClasses[index % fontClasses.length];

  const renderActionButton = () => {
    if (plant.available) {
      return (
        <button onClick={() => addToCart(plant)} className="cart-btn">
          Add to Cart
        </button>
      );
    } else {
      return (
        <button onClick={() => setIsModalOpen(true)} className="cart-btn notify-btn">
          Notify Me
        </button>
      );
    }
  };

  return (
    <>
      <div className={`plant-card ${fontClass}`}>
        <div className="plant-image-container">
          <img 
            src={plant.imageUrl || 'https://placehold.co/600x400/eeeeee/cccccc?text=No+Image'} 
            alt={plant.name} 
            className="plant-image" 
          />
          <span className="care-level">{plant.careLevel || 'Moderate'}</span>
        </div>
        <div className="plant-info">
          <h2>{plant.name}</h2>
          <p className="description">{plant.description || 'A beautiful plant to brighten your space.'}</p>
          <div className="categories">
            {plant.categories.map(cat => (
              <span key={cat} className="category-badge">{cat}</span>
            ))}
          </div>
          <div className="card-footer">
            <p className="price">₹{plant.price}</p>
            {renderActionButton()}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <NotifyModal 
          plantName={plant.name} 
          plantId={plant._id} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default PlantCard;