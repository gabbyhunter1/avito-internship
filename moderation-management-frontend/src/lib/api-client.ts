export async function apiRequest<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    let errorText = 'Something went wrong';

    try {
      const errorData = await response.json();
      errorText = errorData?.res?.message?.message ?? errorText;
    } catch {}
    throw new Error(errorText);
  }

  return await response.json();
}
