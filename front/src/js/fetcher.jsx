export async function fetcher({
  path,
  method = "GET",
  headers = {},
  body = null,
}) {
  const controller = new AbortController();

  try {
    console.log(">>>", import.meta.env.BACK_PATH);
    const response = await fetch(
      `${import.meta.env.VITE_BACK_PATH}:${import.meta.env.VITE_BACK_PORT}/api${path}`,
      {
        method: method,
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
        signal: controller.signal,
      },
    );

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
