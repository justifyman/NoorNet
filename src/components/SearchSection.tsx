import { useState } from "react";
import {
  searchWebWithCache,
  getMockSearchResults,
  SearchResult,
} from "../config/searchConfig";

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    setIsSearching(true);
    setResults([]);
    setError(null);

    try {
      // Use the cached search function if API keys are available, otherwise use mock data
      let searchResults;

      if (
        import.meta.env.VITE_GOOGLE_API_KEY &&
        import.meta.env.VITE_SEARCH_ENGINE_ID
      ) {
        searchResults = await searchWebWithCache(query);
      } else {
        // Fallback to mock data if no API keys
        console.warn("No API keys found, using mock data");
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
        searchResults = getMockSearchResults(query);
      }

      setResults(searchResults);

      if (searchResults.length === 0) {
        setError("No results found. Try different keywords.");
      }
    } catch (error) {
      console.error("Search error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while searching. Please try again."
      );
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-2xl py-2 md:py-3">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Your Islamic Question..."
            className="w-full bg-[#2a2939] rounded-lg px-3 md:px-4 py-3 md:py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 shadow-[0_3px_rgba(137,100,205,0.25)]"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#3a3949] hover:bg-[#4a4959] text-purple-300 px-3 md:px-4 py-1.5 md:py-2 rounded-md transition-colors duration-200 border border-purple-500/30 text-sm md:text-base"
          >
            {isSearching ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-1.5 md:mr-2 h-3 w-3 md:h-4 md:w-4 text-purple-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching
              </span>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="mt-4 md:mt-6 bg-[#2a2939]/80 rounded-lg p-3 md:p-4 backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_15px_-2px_rgba(137,100,205,0.3)]">
          <h2 className="text-base md:text-lg font-medium text-white mb-3 md:mb-4">
            Search Results
          </h2>
          <div className="space-y-3 md:space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className="border-b border-gray-700 pb-3 last:border-0"
              >
                <h3 className="text-purple-400 font-medium text-sm md:text-base">
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {result.title}
                  </a>
                </h3>
                <p className="text-gray-300 text-xs md:text-sm mt-1">{result.snippet}</p>
                <p className="text-gray-400 text-xs mt-1">
                  Source: {result.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isSearching && (
        <div className="mt-4 md:mt-6 flex justify-center">
          <div className="bg-[#2a2939]/80 rounded-lg p-4 md:p-6 backdrop-blur-sm flex flex-col items-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_15px_-2px_rgba(137,100,205,0.3)]">
            <svg
              className="animate-spin h-6 w-6 md:h-8 md:w-8 text-purple-500 mb-3 md:mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-white text-sm md:text-base">Searching trusted Islamic websites...</p>
            <p className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2">This may take a moment</p>
          </div>
        </div>
      )}

      {!isSearching && error && (
        <div className="mt-4 md:mt-6 bg-[#2a2939]/80 rounded-lg p-3 md:p-4 backdrop-blur-sm text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_15px_-2px_rgba(137,100,205,0.3)]">
          <p className="text-white text-sm md:text-base">{error}</p>
          <p className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2">
            Try different keywords or phrases.
          </p>
        </div>
      )}
    </div>
  );
}
