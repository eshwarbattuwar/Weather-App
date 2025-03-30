import { createContext, useReducer, useContext } from 'react';

const WeatherContext = createContext();

const initialState = {
  weatherData: null,
  loading: false,
  error: null,
  recentSearches: [],
};

function weatherReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        weatherData: action.payload,
        recentSearches: [
          action.payload.name,
          ...state.recentSearches.filter(city => city !== action.payload.name),
        ].slice(0, 5),
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}