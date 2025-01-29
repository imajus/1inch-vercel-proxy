export default async function handler(req, res) {
    const { API_AUTH_TOKEN } = process.env;
  
    if (!API_AUTH_TOKEN) {
      return res.status(500).json({ error: "API_AUTH_TOKEN is missing from env" });
    }
  
    try {
      const apiPath = req.url.replace("/api/proxy", ""); // Adjust path
      const response = await fetch(`https://api.1inch.dev${apiPath}`, {
        method: req.method,
        headers: {
          ...req.headers,
          Authorization: `Bearer ${API_AUTH_TOKEN}`,
        },
        body: req.method !== "GET" ? req.body : undefined,
      });
  
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (error) {
      console.error("Error forwarding request:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  