import React, { useState } from 'react';
import './AddPlantForm.css'; 

const AddPlantForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categories: '',
    available: true,
    imageUrl: '',
    description: '',
    careLevel: 'Easy',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!formData.name || !formData.price || !formData.categories) {
      setError('Name, Price, and Categories are required.');
      return;
    }

    const plantData = {
      ...formData,
      price: Number(formData.price),
      categories: formData.categories.split(',').map(cat => cat.trim()), 
    };

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/plants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plantData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to add plant.');
      }

      setMessage(`Successfully added ${result.name}!`);
      setFormData({
        name: '', price: '', categories: '', available: true,
        imageUrl: '', description: '', careLevel: 'Easy',
      });

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Add a New Plant</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Plant Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Categories (comma-separated)</label>
          <input type="text" name="categories" value={formData.categories} onChange={handleChange} placeholder="e.g., Indoor, Air Purifying" required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Care Level</label>
          <select name="careLevel" value={formData.careLevel} onChange={handleChange}>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="form-group checkbox">
          <label>Available</label>
          <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
        </div>
        
        <button type="submit" className="submit-btn">Add Plant</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddPlantForm;