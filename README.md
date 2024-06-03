# blockchain inventory management system (bims)
A frontend web application for brainbox research instiute

## Getting Started

Install dependencies
```
npm install
```

Install dependencies using `make`
```
make install
```

Start the development server:

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

## Resources: Get help from the following resources 
To learn more about Next.js, take a look at the following resources:
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [NextUI Documentation](https://nextui.org/docs/guide/introduction) - learn about NextUI features, components and API
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation) - learn about Tailwind CSS, it features, components and API
- [React Icons](https://react-icons.github.io/react-icons/) - A link to `react-icons` main page


## Useful Git Commands
 -  ### Delete Local Branches Not In Remote
```bash
git fetch -p && for branch in $(git for-each-ref --format '%(refname) %(upstream:track)' refs/heads | awk '$2 == "[gone]" {sub("refs/heads/", "", $1); print $1}'); do git branch -D $branch; done
```
