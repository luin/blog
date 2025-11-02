This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on GitHub Pages

This project is configured to be deployed on GitHub Pages with automatic deployment on every push to the main branch.

### Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to your repository settings
   - Navigate to "Pages" in the sidebar
   - Under "Build and deployment", select "GitHub Actions" as the source

2. **Configure the base path:**
   - Open `next.config.mjs`
   - Update the `basePath` and `assetPrefix` to match your repository name:
     - For user pages (username.github.io), use `'/'`
     - For project pages (username.github.io/repo-name), use `'/repo-name'`

3. **Push to main branch:**
   - The GitHub Action will automatically build and deploy your site
   - Check the Actions tab in your repository to monitor the deployment progress

### Manual Build

To build the static site locally:

```bash
npm run build
```

The static files will be generated in the `out` directory.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
