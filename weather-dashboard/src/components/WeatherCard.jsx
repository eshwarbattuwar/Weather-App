import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm } from 'react-icons/wi';

const weatherIcons = {
  '01': <WiDaySunny className="text-yellow-500" size={80} />,
  '02': <WiDaySunny className="text-yellow-400" size={80} />,
  '03': <WiCloudy className="text-gray-400" size={80} />,
  '04': <WiCloudy className="text-gray-500" size={80} />,
  '09': <WiRain className="text-blue-400" size={80} />,
  '10': <WiRain className="text-blue-500" size={80} />,
  '11': <WiThunderstorm className="text-purple-500" size={80} />,
  '13': <WiSnow className="text-blue-200" size={80} />,
  '50': <WiCloudy className="text-gray-300" size={80} />,
};

export default function WeatherCard({ weatherData }) {
  if (!weatherData) return null;

  const iconCode = weatherData.weather[0].icon.slice(0, 2);
  const date = new Date(weatherData.dt * 1000).toLocaleDateString();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold dark:text-white">{weatherData.name}, {weatherData.sys.country}</h2>
        <span className="text-gray-500 dark:text-gray-300">
          {date}
        </span>
      </div>
      
      <div className="flex items-center justify-center mb-6">
        {weatherIcons[iconCode] || weatherIcons['01']}
        <span className="text-5xl font-bold ml-4 dark:text-white">
          {Math.round(weatherData.main.temp)}°C
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300">Condition</p>
          <p className="font-semibold capitalize dark:text-white">
            {weatherData.weather[0].description}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300">Humidity</p>
          <p className="font-semibold dark:text-white">{weatherData.main.humidity}%</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300">Wind Speed</p>
          <p className="font-semibold dark:text-white">{weatherData.wind.speed} km/h</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300">Feels Like</p>
          <p className="font-semibold dark:text-white">
            {Math.round(weatherData.main.feels_like)}°C
          </p>
        </div>
      </div>
    </div>
  );
}