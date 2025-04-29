import React from 'react';
import { Heart } from 'lucide-react';

function CountryCard({ country, onClick, onFavorite, isFavorite }) {
  const formatPopulation = (population) => {
    return new Intl.NumberFormat().format(population);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden group">
      <div
        className="cursor-pointer transform transition-transform hover:scale-105"
        onClick={onClick}
      >
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{country.name.common}</h2>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Population:</span> {formatPopulation(country.population)}</p>
            <p><span className="font-medium">Region:</span> {country.region}</p>
            <p><span className="font-medium">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavorite();
        }}
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
      >
        <Heart
          size={20}
          className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
        />
      </button>
    </div>
  );
}

export default CountryCard;