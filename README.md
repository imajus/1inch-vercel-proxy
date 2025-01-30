# Vercel 1inch Proxy

This is a simple REST API proxy that can be deployed to a **free** [Vercel](https://vercel.com/) account. Non-proxied 1inch requests from a web browser will **always** throw a CORS error. This is a simple turnkey solution to help speed up development when building with 1inch. 


## Setup

Because this will be a proxy specifically for your Dev Portal API key, you must deploy and manage it yourself. Luckily, Vercel makes this incredibly simple:

- Create a free `Hobby` account on [vercel.com](https://vercel.com/) 
- When creating a new project, select `Import Third-Party Git Repository` 
- Paste in the `.git` link to this repository
- Once the project is imported, go to `Settings`->`Environment Variables` and add a new environment variable with a key of `API_AUTH_TOKEN` and a value of your Dev Portal API token and press `Save`

## Usage

- On the main `Project` tab, you will see a long string for your proxy's address. Something like this: `1inch-proxy-12345abcd-account_name-projects.vercel.app`
- Whenever you make a call to the 1inch REST api in your code, instead of `api.1inch.dev`, use your new Vercel proxy address
  - Example: `https://api.1inch.dev` becomes `https://1inch-proxy-12345abcd-account_name-projects.vercel.app/orderbook/v4.0/1/count`

And that is it! If there are strange response bodies, errors, or something doesn't work right, please open an issue on this repo here.