# eFootball Store

A beautiful, modern e-commerce website for football gear — inspired by Vercel's design language.

## Features

- ⚡ **Vercel-inspired dark UI** with gradient accents
- 🌓 **Light/Dark mode toggle**
- 🛒 **Full shopping cart** with add/remove/quantity controls
- 💳 **Paystack payment integration**
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- 🎨 **Smooth animations** with Framer Motion and Tailwind CSS
- 🏷️ **Product tags** — NEW, HOT, SALE badges
- 🔔 **Toast notifications** for user feedback
- 🔒 **Type-safe** with TypeScript

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- shadcn/ui design patterns
- Lucide React (icons)
- Framer Motion (animations)
- Paystack Inline JS (payments)

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Paystack Setup

1. Sign up at [paystack.com](https://paystack.com)
2. Go to **Settings → API Keys**
3. Copy your **Public Key** (starts with `pk_test_` for test, `pk_live_` for live)
4. Replace `PAYSTACK_PUBLIC_KEY` in `src/contexts/PaystackContext.tsx`

## Deploy to Vercel

1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Framework preset: **Vite**
4. Click **Deploy**

Your site will be live at `https://your-repo-name.vercel.app`

## Project Structure

```
efootball-store/
├── src/
│   ├── components/       # React components
│   ├── contexts/         # Theme, Cart, Toast, Paystack providers
│   ├── data/             # Product data
│   ├── types/            # TypeScript interfaces
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles + Tailwind
├── public/               # Static assets
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── vercel.json           # SPA routing config
└── README.md
```

## Customization

- **Products**: Edit `src/data/products.ts`
- **Colors**: Modify CSS variables in `src/index.css`
- **Stats**: Update `src/data/products.ts` → `stats` array
- **Features**: Update `src/data/products.ts` → `features` array

## License

MIT — Built with passion for the beautiful game ⚽
