export const config = {
    matcher: "/api/:path*",
  };
  
  export default async function middleware(req) {
    const url = new URL(req.url);
    const apiPath = url.pathname.replace("/api", "");
  
    // Forward request to 1inch API with authentication
    const response = await fetch(`https://api.1inch.dev${apiPath}`, {
      method: req.method,
      headers: {
        ...Object.fromEntries(req.headers.entries()),
        Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
      },
      body: req.method !== "GET" ? req.body : undefined,
    });
  
    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  }
  