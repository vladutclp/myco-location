export function authorizedFetch(url: string, options: RequestInit = {}) {
  const token = sessionStorage.getItem("token");

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}
