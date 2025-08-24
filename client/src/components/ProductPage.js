import React, { useState, useEffect, useCallback } from 'react';
import PlantList from './PlantList';
import FilterControls from './FilterControls';

const ProductPage = () => {
  console.log("====== SPY CHECK START ======");
  console.log("The API URL my app is using is:", process.env.REACT_APP_API_URL);
  console.log("====== SPY CHECK END ======");


  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default'); 

   const fetchPlants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (sortOption !== 'default') params.append('sort', sortOption);
      
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/plants?${params.toString()}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setPlants(data);
    } catch (err) {
      setError('Failed to fetch plants. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, sortOption]); 

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/plants`);
        const data = await response.json();
        const uniqueCategories = [...new Set(data.flatMap(p => p.categories))];
        setCategories(uniqueCategories.sort());
      } catch (err) {
        console.error("Could not fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <FilterControls
        categories={categories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOption={sortOption}
        setSortOption={setSortOption} 
      />
      <PlantList plants={plants} loading={loading} error={error} />
    </>
  );
};

export default ProductPage;