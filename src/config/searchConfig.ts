// List of trusted Islamic websites to search
export const TRUSTED_WEBSITES: string[] = [
  "islamqa.info",
  "islamweb.net",
  "islamweb.com",
  "dorar.net/en",
];

// Define a type for search results
export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  source: string;
}

// Simple cache to store search results and reduce API calls
const searchCache: Map<string, SearchResult[]> = new Map();

// Get environment variables with type safety for Vite
const getEnvVar = (name: string): string => {
  // In Vite, environment variables are exposed through import.meta.env, not process.env
  const value = import.meta.env[name];
  if (!value) {
    console.warn(`Environment variable ${name} is not defined`);
    return "";
  }
  return value;
};

// Function to search using Google Custom Search API
export const searchWeb = async (query: string): Promise<SearchResult[]> => {
  try {
    // Ensure API keys are available
    const apiKey = getEnvVar("VITE_GOOGLE_API_KEY");
    const searchEngineId = getEnvVar("VITE_SEARCH_ENGINE_ID");

    if (!apiKey || !searchEngineId) {
      throw new Error("API key or Search Engine ID is missing");
    }

    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(
      query
    )}`;

    const response: Response = await fetch(searchUrl);
    const data: any = await response.json();

    if (data.error) {
      if (data.error.code === 403) {
        throw new Error(
          "Daily search quota exceeded. Please try again tomorrow."
        );
      } else if (data.error.code === 429) {
        throw new Error(
          "Rate limit exceeded. Please try again in a few minutes."
        );
      } else {
        throw new Error(
          data.error.message || "An error occurred with the search API"
        );
      }
    }

    if (data.items && data.items.length > 0) {
      return data.items.map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        source: new URL(item.link).hostname,
      }));
    }

    return [];
  } catch (error: unknown) {
    console.error("Search error:", error);
    throw error;
  }
};

// Function to search with caching to reduce API calls
export const searchWebWithCache = async (
  query: string
): Promise<SearchResult[]> => {
  // Normalize the query to ensure consistent cache hits
  const normalizedQuery = query.trim().toLowerCase();

  // Check if we have this query cached
  if (searchCache.has(normalizedQuery)) {
    console.log("Returning cached results for:", normalizedQuery);
    return searchCache.get(normalizedQuery) || [];
  }

  try {
    // Perform the actual search
    const results = await searchWeb(normalizedQuery);

    // Cache the results
    searchCache.set(normalizedQuery, results);

    // Limit cache size to prevent memory issues (keep only the last 50 queries)
    if (searchCache.size > 50) {
      const oldestKey = searchCache.keys().next().value;
      if (oldestKey !== undefined) {
        searchCache.delete(oldestKey);
      }
    }

    return results;
  } catch (error: unknown) {
    // If API limit is reached, try to return mock results instead
    if (error instanceof Error) {
      const errorMessage = error.message;
      if (
        errorMessage.includes("quota exceeded") ||
        errorMessage.includes("rate limit")
      ) {
        console.warn("API limit reached, using mock results");
        return getMockSearchResults(normalizedQuery);
      }
    }
    throw error;
  }
};

// Fallback mock search for development/testing
export const getMockSearchResults = (query: string): SearchResult[] => {
  // Simple keyword matching for demo purposes
  const keywords = query.toLowerCase().split(" ");

  const mockResults: SearchResult[] = [
    {
      title: "Understanding Prayer in Islam - IslamQA",
      link: "https://islamqa.info/en/answers/12305/prayer-in-islam",
      snippet:
        "Prayer is the second pillar of Islam and is the most important pillar after the testimony of faith. Learn about the importance of prayer in Islam.",
      source: "islamqa.info",
    },
    {
      title: "Fasting in Ramadan - IslamQA",
      link: "https://islamqa.info/en/answers/26863/fasting-in-ramadan",
      snippet:
        "Fasting during Ramadan is obligatory upon every Muslim who has reached puberty, is sane, and is able to fast.",
      source: "islamqa.info",
    },
    {
      title: "The Virtues of Charity - IslamWeb",
      link: "https://www.islamweb.net/en/article/134449/the-virtues-of-charity",
      snippet:
        "The example of those who spend their wealth in the way of Allah is like a seed which grows seven spikes; in each spike is a hundred grains.",
      source: "islamweb.net",
    },
    {
      title: "Hajj: The Pilgrimage to Mecca - IslamWeb",
      link: "https://www.islamweb.net/en/article/153750/hajj-guide",
      snippet:
        "Hajj is the fifth pillar of Islam and is mandatory for every Muslim who is physically and financially capable of undertaking the journey.",
      source: "islamweb.net",
    },
    {
      title: "Islamic Ethics and Morality - IslamQA",
      link: "https://islamqa.info/en/answers/10577/islamic-ethics",
      snippet:
        "Islam places great emphasis on moral conduct. Learn about the ethical principles that guide Muslims in their daily lives.",
      source: "islamqa.info",
    },
  ];

  // Filter results based on keywords in the query
  return mockResults.filter((result) =>
    keywords.some(
      (keyword) =>
        result.title.toLowerCase().includes(keyword) ||
        result.snippet.toLowerCase().includes(keyword)
    )
  );
};
