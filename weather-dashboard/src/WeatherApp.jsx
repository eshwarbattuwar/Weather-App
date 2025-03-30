// src/WeatherApp.jsx
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import RecentSearches from './components/RecentSearches';
import { useWeatherData } from './hooks/useWeather';

export default function WeatherApp() {
  const { weatherData, loading, error, recentSearches, fetchWeather } = useWeatherData();
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Weather Dashboard</h1>
        
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
        
        <SearchBar onSearch={fetchWeather} />
        
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2">Loading weather data...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>Error: {error}</p>
          </div>
        )}
        
        {weatherData && <WeatherCard weatherData={weatherData} />}
        
        <RecentSearches recentSearches={recentSearches} onSearch={fetchWeather} />
      </div>
    </div>
  );
}