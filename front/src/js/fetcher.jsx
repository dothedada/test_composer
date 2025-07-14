export async function fetcher({
  url,
  method = "GET",
  headers = {},
  body = null,
}) {
  const controller = new AbortController();

  try {
    const response = await fetch(url, {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `Cannot get the data from the server: ${response.status} - ${response.statusText}`,
      );
    }

    const fetchedData = await response.json();

    if (!fetchedData) {
      throw new Error("Cannot parse the response from the server");
    }

    return fetchedData;
  } finally {
    controller.abort();
  }
}
