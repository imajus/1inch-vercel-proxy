export default async function handler(req, res) {
  const { API_AUTH_TOKEN } = process.env;

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
    
    // If there's no content, skip .json()
    const contentLength = response.headers.get("content-length");
    if (!contentLength || parseInt(contentLength, 10) === 0) {
      // Return an empty object (or however you want to handle 0-length)
      return res.status(response.status).json({ error: "No content returned" });
    }
    
    // Otherwise parse JSON
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Error forwarding request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
