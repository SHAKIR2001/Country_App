import React, { useState, useEffect } from 'react';
import { Search, Globe2, Heart } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './components/Navbar';
import CountryCard from './components/CountryCard';
import CountryModal from './components/CountryModal';
import Filters from './components/Filters';
import LoginModal from './components/LoginModal';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      const savedFavorites = localStorage.getItem(`favorites_${JSON.parse(savedUser).username}`) || '[]';
      setFavorites(JSON.parse(savedFavorites));
    }
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,languages,currencies,maps');
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch countries. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = countries.filter(country => {
      const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = !selectedRegion || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
    setFilteredCountries(filtered);
  }, [searchTerm, selectedRegion, countries]);

  const handleLogin = (username, password) => {
    // Simple login logic (in real app, this would be more secure)
    if (username && password) {
      const userData = { username };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      const savedFavorites = localStorage.getItem(`favorites_${username}`) || '[]';
      setFavorites(JSON.parse(savedFavorites));
      setIsLoginModalOpen(false);
      toast.success('Successfully logged in!');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('user');
    toast.success('Successfully logged out!');
  };

  const toggleFavorite = (country) => {
    if (!user) {
      toast.error('Please log in to add favorites!');
      return;
    }

    const newFavorites = favorites.some(fav => fav.name.common === country.name.common)
      ? favorites.filter(fav => fav.name.common !== country.name.common)
      : [...favorites, country];

    setFavorites(newFavorites);
    localStorage.setItem(`favorites_${user.username}`, JSON.stringify(newFavorites));
    toast.success(
      newFavorites.length > favorites.length
        ? 'Added to favorites!'
        : 'Removed from favorites!'
    );
  };

  const isCountryFavorite = (country) => {
    return favorites.some(fav => fav.name.common === country.name.common);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Navbar user={user} onLogin={() => setIsLoginModalOpen(true)} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for a country..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Filters
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
        </div>

        {user && favorites.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Favorites</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((country) => (
                <CountryCard
                  key={country.name.common}
                  country={country}
                  onClick={() => setSelectedCountry(country)}
                  onFavorite={() => toggleFavorite(country)}
                  isFavorite={true}
                />
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">All Countries</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCountries.map((country) => (
                <CountryCard
                  key={country.name.common}
                  country={country}
                  onClick={() => setSelectedCountry(country)}
                  onFavorite={() => toggleFavorite(country)}
                  isFavorite={isCountryFavorite(country)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
          onFavorite={() => toggleFavorite(selectedCountry)}
          isFavorite={isCountryFavorite(selectedCountry)}
          isLoggedIn={!!user}
        />
      )}

      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;