import { useState, useRef, useEffect } from 'react';
import { regexpPatterns } from '../utils';

export function useMediaLoader(urls: Array<string>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setURL] = useState<string>();
  const abortController = useRef<AbortController>();

  async function isAvailable(url: string) : Promise<boolean> {
    abortController.current = new AbortController();
    try {      
      const response = await fetch(url, {
        method: 'HEAD',
        signal: abortController.current?.signal,
      });
      return response.ok
    } catch (error) {
      return false;
    } finally {
      abortController.current = undefined;
    }
  }

  async function handleUrlListChange() {
    setLoading(true);
    for (const url of urls) {
      if (!regexpPatterns.RE_URL.test(url)) continue;
      const available = await isAvailable(url);
      if (available) {
        setURL(url);
        break;
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    handleUrlListChange();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls])

  useEffect(() => {
    return () => abortController.current?.abort();
  }, []);

  return { loading, url };
}