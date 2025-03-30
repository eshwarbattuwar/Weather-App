export default function RecentSearches({ recentSearches, onSearch }) {
  if (!recentSearches?.length) return null;

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-2 dark:text-white">Recent Searches</h3>
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((city, index) => (
          <button
            key={index}
            onClick={() => onSearch(city)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors dark:text-white"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}