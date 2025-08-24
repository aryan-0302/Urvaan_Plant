import React, { useState, useEffect, useCallback } from 'react';
import PlantList from './PlantList';
import FilterControls from './FilterControls';

const ProductPage = () => {
  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default'); // Add sort state

  const fetchPlants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (sortOption !== 'default') params.append('sort', sortOption); // Add sort to params
      
      const response = await fetch(`/api/plants?${params.toString()}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setPlants(data);
    } catch (err) {
      setError('Failed to fetch plants. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, sortOption]); // Add sortOption to dependencies

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  // ... fetchCategories useEffect remains the same ...
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/plants');
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
        sortOption={sortOption} // Pass sort state down
        setSortOption={setSortOption} // Pass setter down
      />
      <PlantList plants={plants} loading={loading} error={error} />
    </>
  );
};

export default ProductPage;