import { useState, useEffect } from 'react';

const memoryCache = new Map();

/**
 * A custom hook to fetch data with caching.
 * It checks sessionStorage first to reduce unnecessary API calls across page navigations.
 * 
 * @param {string} url - The URL to fetch data from
 * @param {string} key - A unique string key for sessionStorage
 * @param {number} ttl - Time to live in milliseconds (default: 1 hour)
 */
export const useApiCache = (url, key, ttl = 3600000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Check in-memory cache first (fastest)
        if (memoryCache.has(key)) {
          const { data: cachedData, timestamp } = memoryCache.get(key);
          if (Date.now() - timestamp < ttl) {
            if (isMounted) setData(cachedData);
            setLoading(false);
            return;
          }
        }

        // 2. Check sessionStorage
        try {
          const sessionCached = sessionStorage.getItem(key);
          if (sessionCached) {
            const { data: cachedData, timestamp } = JSON.parse(sessionCached);
            if (Date.now() - timestamp < ttl) {
              memoryCache.set(key, { data: cachedData, timestamp }); // update memory
              if (isMounted) setData(cachedData);
              setLoading(false);
              return;
            }
          }
        } catch (e) {
          console.warn('SessionStorage access failed', e);
        }

        // 3. Fetch from API if no valid cache
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch from ${url}`);
        const result = await response.json();

        // Save to caches
        const cacheObj = { data: result, timestamp: Date.now() };
        memoryCache.set(key, cacheObj);
        try {
          sessionStorage.setItem(key, JSON.stringify(cacheObj));
        } catch (e) {
          // sessionStorage might be full or disabled, ignore
        }

        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        console.error(`Error fetching ${key}:`, err);
        if (isMounted) setError(err.message || 'Failed to load data.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [url, key, ttl]);

  return { data, loading, error };
};
