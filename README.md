# 1inch Vercel Proxy

This is a simple proxy for the 1inch API that can be deployed to a **free** [Vercel](https://vercel.com/) account.

## Why use a proxy with the 1inch API?

Non-proxied 1inch API requests from a web browser will **always** throw a CORS error. This is done to keep 1inch API keys off of frontends where nefarious users can extract them while listening to network calls. By executing 1inch API requests on a separate backend, the API key is no longer living in the same environment as the users.

## Setup

This proxy will contain your personal Dev Portal API key, so it must be deployed and configured manually. Luckily, Vercel makes this incredibly simple:

- Create a free `Hobby` account on [vercel.com](https://vercel.com/) 
- When creating a new project, select `Import Third-Party Git Repository` 
- Paste in the `.git` link to this repository
- Once the project is imported, you will need to change two settings before anything will work:
  - First, go to `Settings`->`Environment Variables` and add a new environment variable with a key of `API_AUTH_TOKEN` and a value of your Dev Portal API token and press `Save`
  - Second, go to `Settings`->`Deployment Protection` and disable `Vercel Authentication`. This is critical for unauthenticated requests to reach the server

## Usage

- On the main `Project` tab, in the `Product Deployment` section, get your proxy's address in the `Domains` section. It will look something like this: `my-1inch-vercel-proxy.vercel.app`
- All 1inch REST API calls should now be use your new Vercel proxy address instead of the standard `api.1inch.dev` address.
  - Example: `https://api.1inch.dev/orderbook/v4.0/1/count` becomes `https://my-1inch-vercel-proxy.vercel.app/orderbook/v4.0/1/count`

And that is it! If there are strange response bodies, errors, or something doesn't work right, please open an [Issue](https://github.com/Tanz0rz/1inch-vercel-proxy/issues) here on GitHub.