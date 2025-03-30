import axios from 'axios';
import { useWeather } from '../context/WeatherContext';
import { useEffect } from 'react';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Cache for storing API responses
const weatherCache = new Map();

export function useWeatherData() {
  const { state, dispatch } = useWeather();

  const fetchWeather = async (city) => {
    // Check cache first
    if (weatherCache.has(city.toLowerCase())) {
      const cachedData = weatherCache.get(city.toLowerCase());
      dispatch({ type: 'FETCH_SUCCESS', payload: cachedData });
      return;
    }

    dispatch({ type: 'FETCH_START' });
    
    try {
      const response = await axios.get(
        `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      // Update cache
      weatherCache.set(city.toLowerCase(), response.data);
      
      // Set cache expiration (1 hour)
      setTimeout(() => {
        weatherCache.delete(city.toLowerCase());
      }, 60 * 60 * 1000);

      dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
    } catch (error) {
      let errorMsg = 'Failed to fetch weather data';
      
      if (error.response) {
        // Handle different API error cases
        if (error.response.status === 404) {
          errorMsg = 'City not found. Please try another location.';
        } else if (error.response.status === 401) {
          errorMsg = 'Invalid API key. Please check your configuration.';
        } else if (error.response.data?.message) {
          errorMsg = error.response.data.message;
        }
      } else if (error.request) {
        errorMsg = 'Network error. Please check your internet connection.';
      }
      
      dispatch({ type: 'FETCH_ERROR', payload: errorMsg });
    }
  };

  // Optional: Fetch weather for default location on initial load
  useEffect(() => {
    if (!state.weatherData && !state.loading && !state.error) {
      fetchWeather('London'); // Default city
    }
  }, []);

  return { 
    fetchWeather, 
    weatherData: state.weatherData,
    loading: state.loading,
    error: state.error,
    recentSearches: state.recentSearches,
    clearError: () => dispatch({ type: 'FETCH_ERROR', payload: null })
  };
}