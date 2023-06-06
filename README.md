![Gateway - Web3 Credentialing Protocol](/public/social.png)

<a href="https://github.com/Gateway-DAO/ui/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Gateway-DAO/ui?style=flat-square"></a>
<a href="https://discord.gg/tgt3KjcHGs"><img alt="Discord" src="https://img.shields.io/discord/898513755456036925?style=flat-square&label=discord"></a>

# 🚪 Gateway dApp - Source code

This repo contains the code for [Gateway dApp](https://mygateway.xyz) website. Powered by [Next.js](https://nextjs.org).



# 🔧 Installation


Make sure you have [Git](https://git-scm.com/), [Node.js 16 LTS](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed

1. Clone this repo 
```sh
git clone https://github.com/Gateway-DAO/ui
```

2. Install dependencies using pnpm

```sh
pnpm i
```

3. Create the env file. Ask about it to your manager

4. Generate the typings
```sh
pnpm generate
```

5. Start the development server
```sh
pnpm dev
```

6. Read about our development patterns on our [wiki](https://github.com/Gateway-DAO/ui/wiki/Contributing)

# 👍 Contribute
If you want to say thank you and/or support the active development of the `dApp`:

1. Add a [GitHub Star](https://github.com/Gateway-DAO/ui/stargazers) to the project.
2. Talk to us on our [Discord](https://discord.gg/tgt3KjcHGs)
3. Read more on our [wiki](https://github.com/Gateway-DAO/ui/wiki/Contributing)

# ⚗️ Tests

For end-2-end tests we are using [Playwrite](https://playwright.dev/) as our test tool.

## How to test
We added the playwright in the dependencies, but you need to install the browsers, this can be achieve running the test command automatically in our `package.json`.

Before testing, you should build your project.

```sh
pnpm build
```

After your project builded, just run your tests. Note that this tests runs in a production port, **(3000)**.
```sh
pnpm test:e2e
```
