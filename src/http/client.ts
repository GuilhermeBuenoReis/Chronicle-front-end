import Cookies from 'universal-cookie';

async function getHeaders(headers: HeadersInit): Promise<HeadersInit> {
  const cookie = new Cookies();

  const token = cookie.get('chonicle-token');
  console.log(token);

  if (token) {
    return { ...headers, Authorization: `Bearer ${token}` };
  }

  return headers ?? {};
}

export async function http<T>(path: string, options: RequestInit): Promise<T> {
  const headers = await getHeaders(options.headers ?? []);

  const url = new URL(path, import.meta.env.VITE_API_URL);

  const request = new Request(url, {
    ...options,
    headers,
  });

  const response = await fetch(request);

  if (response.ok) {
    if (response.headers.get('content-type')?.includes('application/json')) {
      const data = await response.json();

      return data as T;
    }

    const data = await response.text();

    return data as T;
  }

  return Promise.reject(response);
}
