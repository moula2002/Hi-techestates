import { useState, useEffect } from 'react';

const memoryCache = new Map();
const fetchDedupe = new Map(); // For deduping concurrent requests

/**
 * A custom hook to fetch data with caching.
 * Implements a Stale-While-Revalidate (SWR) pattern.
 * Returns cached data immediately for fast loading, but fetches fresh data
 * in the background to ensure updates from the admin panel reflect instantly.
 * 
 * @param {string} url - The URL to fetch data from
 * @param {string} key - A unique string key for sessionStorage
 */
export const useApiCache = (url, key) => {
  const [data, setData] = useState(() => {
    // 1. Initialize state synchronously from memory cache if available
    if (memoryCache.has(key)) {
      return memoryCache.get(key).data;
    }
    // 2. Fallback to sessionStorage synchronously
    try {
      const sessionCached = sessionStorage.getItem(key);
      if (sessionCached) {
        const { data: cachedData } = JSON.parse(sessionCached);
        return cachedData;
      }
    } catch (e) {
      console.warn('SessionStorage access failed', e);
    }
    return null;
  });

  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (!data) setLoading(true);

        // Deduplicate concurrent fetch requests for the same URL
        if (!fetchDedupe.has(url)) {
          const fetchPromise = fetch(url, { cache: 'no-store' }).then(async (res) => {
            if (!res.ok) throw new Error(`Failed to fetch from ${url}`);
            return res.json();
          });
          fetchDedupe.set(url, fetchPromise);
        }

        const result = await fetchDedupe.get(url);

        // Update caches
        const cacheObj = { data: result, timestamp: Date.now() };
        memoryCache.set(key, cacheObj);
        try {
          sessionStorage.setItem(key, JSON.stringify(cacheObj));
        } catch (e) {
          // ignore sessionStorage errors
        }

        // Update state if mounted
        if (isMounted) {
          // Deep compare if necessary, but setting state with same data usually causes re-render unless primitives.
          // For simplicity, we update the state to trigger re-render with fresh data.
          setData(result);
          setError(null);
        }
      } catch (err) {
        console.error(`Error fetching ${key}:`, err);
        if (isMounted) {
          if (!data) {
            setError(err.message || 'Failed to load data.');
          }
        }
      } finally {
        if (isMounted) setLoading(false);
        // Clear dedupe promise after a short delay so subsequent renders can fetch again
        setTimeout(() => fetchDedupe.delete(url), 2000);
      }
    };

    if (url) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [url, key]);

  return { data, loading, error };
};
