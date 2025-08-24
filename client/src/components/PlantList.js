import React from 'react';
import PlantCard from './PlantCard';

const PlantList = ({ plants, loading, error }) => {
  if (loading) {
    return <div className="centered">Loading plants...</div>;
  }

  if (error) {
    return <div className="centered">{error}</div>;
  }

  if (plants.length === 0) {
    return <div className="centered">No plants match your criteria.</div>;
  }

  return (
    <div className="plant-list">
      {plants.map((plant, index) => (
        <PlantCard key={plant._id || index} plant={plant} index={index} />
      ))}
    </div>
  );
};

export default PlantList;