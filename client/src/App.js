import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import AddPlantForm from './components/AddPlantForm'; 
import './App.css';

function App() {
  console.log("====== SPY CHECK START ======");
  console.log("The API URL my app is using is:", process.env.REACT_APP_API_URL);
  console.log("All ENV Vars (frontend):", process.env);
  console.log("====== SPY CHECK END ======");

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