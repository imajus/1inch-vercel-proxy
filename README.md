# 1inch Vercel Proxy

This is a simple REST API proxy that can be deployed to a **free** [Vercel](https://vercel.com/) account. Non-proxied 1inch requests from a web browser will **always** throw a CORS error. This is a simple turnkey solution to help speed up development when building with 1inch. 

## Setup

This proxy will contain your personal Dev Portal API key, so it must be deployed and configured manually. Luckily, Vercel makes this incredibly simple:

- Create a free `Hobby` account on [vercel.com](https://vercel.com/) 
- When creating a new project, select `Import Third-Party Git Repository` 
- Paste in the `.git` link to this repository
- Once the project is imported, go to `Settings`->`Environment Variables` and add a new environment variable with a key of `API_AUTH_TOKEN` and a value of your Dev Portal API token and press `Save`

## Usage

- On the main `Project` tab, you will see a long string for your proxy's address. Something like this: `1inch-proxy-12345abcd-account_name-projects.vercel.app`
- All 1inch REST API calls should now be use your new Vercel proxy address instead of the standard `api.1inch.dev` address.
  - Example: `https://api.1inch.dev/orderbook/v4.0/1/count` becomes `https://1inch-proxy-12345abcd-account_name-projects.vercel.app/orderbook/v4.0/1/count`

And that is it! If there are strange response bodies, errors, or something doesn't work right, please open an [Issue](https://github.com/Tanz0rz/1inch-vercel-proxy/issues) here on GitHub.