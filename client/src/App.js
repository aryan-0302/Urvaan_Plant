import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import AddPlantForm from './components/AddPlantForm'; 
import './App.css';

function App() {
  return (
    
    <CartProvider>
      <Router>
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin/add" element={<AddPlantForm />} /> 
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;