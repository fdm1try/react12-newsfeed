export const fetchNews = async (params: object = {}) => {
  const searchParams = new URLSearchParams({...params});
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/news?${searchParams}`);
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
}