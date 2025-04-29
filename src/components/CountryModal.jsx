import React from 'react';
import { X, MapPin, Heart } from 'lucide-react';

function CountryModal({ country, onClose, onFavorite, isFavorite, isLoggedIn }) {
  const formatPopulation = (population) => {
    return new Intl.NumberFormat().format(population);
  };

  const getLanguages = (languages) => {
    return Object.values(languages || {}).join(', ');
  };

  const getCurrencies = (currencies) => {
    return Object.values(currencies || {})
      .map(currency => currency.name)
      .join(', ');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{country.name.common}</h2>
            <div className="flex items-center space-x-2">
              {isLoggedIn && (
                <button
                  onClick={onFavorite}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Heart
                    size={24}
                    className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                  />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="w-full rounded-lg shadow-md"
            />

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Population: </span>
                  {formatPopulation(country.population)}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Region: </span>
                  {country.region}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Capital: </span>
                  {country.capital?.[0] || 'N/A'}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Languages: </span>
                  {getLanguages(country.languages)}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Currencies: </span>
                  {getCurrencies(country.currencies)}
                </p>
              </div>

              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600"
              >
                <MapPin size={20} />
                <span>View on Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryModal;