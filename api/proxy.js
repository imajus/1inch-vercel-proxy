export default async function handler(req, res) {
  console.log('hello');
  const { API_AUTH_TOKEN } = process.env;
  console.log('auth', API_AUTH_TOKEN);

  if (!API_AUTH_TOKEN) {
    return res.status(500).json({ error: "API_AUTH_TOKEN is missing from env" });
  }

  try {
    // Remove the leading "/api/" from req.url
    // e.g. "/api/foo/bar" -> "foo/bar"
    const path = req.url.replace(/^\/api\//, '');

    if (!path) {
      return res.status(400).json({ error: "Missing path parameter" });
    }

    // Build the target URL
    const targetUrl = `https://api.1inch.dev/${path}`;
    console.log("Forwarding request to:", targetUrl);

    // Prepare headers
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${API_AUTH_TOKEN}`);

    // Copy client headers, excluding host
    for (let [key, value] of Object.entries(req.headers)) {
      if (key.toLowerCase() !== "host") {
        headers.set(key, value);
      }
    }

    // Make the proxied request
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });


    // Log raw response object details before parsing JSON
    console.log("Raw response object:", {
      url: response.url,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });

    console.log("Parsing response");

    // Return the response as JSON
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Error forwarding request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
