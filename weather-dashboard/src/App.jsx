// src/App.jsx
import { WeatherProvider } from './context/WeatherContext';
import WeatherApp from './WeatherApp';

export default function App() {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
}