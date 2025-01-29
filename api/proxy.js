export default async function handler(req, res) {
  console.log("hello");
  const { API_AUTH_TOKEN } = process.env;

  if (!API_AUTH_TOKEN) {
    return res.status(500).json({ error: "API_AUTH_TOKEN is missing from env" });
  }

  try {
    // req.url typically looks like "/api/tokens/balance/xyz"
    // Let's manually capture the part after "/api/"
    const match = req.url.match(/^\/api\/(.*)/);
    if (!match || !match[1]) {
      return res.status(400).json({ error: "Missing path parameter" });
    }

    // match[1] will be "tokens/balance/xyz" for "/api/tokens/balance/xyz"
    const pathSegments = match[1].split("/");
    console.log("Segments found:", pathSegments);

    // Construct the target URL
    const targetUrl = `https://api.1inch.dev/${pathSegments.join("/")}`;
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

    // Pass along the HTTP method & body
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    // Stream JSON response back
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Error forwarding request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
