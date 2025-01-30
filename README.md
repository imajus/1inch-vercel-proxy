# Vercel 1inch Proxy

This is a simple REST API proxy that can be deployed to a **free** [Vercel](https://vercel.com/) account. Non-proxied 1inch requests from a web browser will **always** throw a CORS error. This is a simple turnkey solution to help speed up development when building with 1inch. 


## Setup

In order to hide API requests from web browsers, 1inch requires all API requests are proxied through some backend server. This project gives users a simple step-by-step path to creating a free cloud proxy:

- Create a free `Hobby` account on [vercel.com](https://vercel.com/) 
- When creating a new project, select `Import Third-Party Git Repository` 
- Paste in the `.git` link to this repository
- Once the project is imported, go to `Settings`->`Environment Variables` and add a new environment variable with a key of `API_AUTH_TOKEN` and a value of your Dev Portal API token and press `Save`

## Usage

- On the main `Project` tab, you will see a long string for your proxy's address. Something like this: `1inch-proxy-12345abcd-account_name-projects.vercel.app`
- Whenever you make a call to the 1inch REST api in your code, instead of `api.1inch.dev`, use your new Vercel proxy address with `/api` appended to it
  - Example: `https://api.1inch.dev` becomes `https://1inch-proxy-12345abcd-account_name-projects.vercel.app/api/orderbook/v4.0/1/count`
  - Note the sneaky addition of `/api` between the proxy address and the 1inch API path