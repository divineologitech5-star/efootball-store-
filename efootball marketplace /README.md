# eFootball Account Marketplace

A marketplace for buying and selling eFootball game accounts.

## Features

- **Buyers**: Browse accounts, filter by strength/price, pay securely
- **Sellers**: Pay ₦2,000 (or equivalent) registration fee, list accounts, earn 80%
- **Security**: Login details hidden until payment confirmed
- **Payments**: Paystack integration (NGN, USD, GBP, EUR, etc.)
- **Revenue Split**: 80% to seller, 20% to platform

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Paystack Inline JS
- LocalStorage (demo data)

## Getting Started

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push to GitHub
2. Import on vercel.com
3. Framework: Vite
4. Deploy

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Buyer | buyer@demo.com | any |
| Seller | seller@demo.com | any |

## Seller Registration Fees

| Country | Currency | Fee |
|---------|----------|-----|
| Nigeria | NGN | ₦2,000 |
| USA | USD | $5 |
| UK | GBP | £4 |
| Canada | CAD | C$7 |
| Ghana | GHS | ₵60 |
| Kenya | KES | KSh 650 |
| South Africa | ZAR | R90 |

## Important: Add Your Paystack Key

Edit `src/contexts/PaystackContext.tsx`:
```tsx
const PAYSTACK_PUBLIC_KEY = 'pk_test_YOUR_KEY_HERE'
```

Get your key from [paystack.com](https://paystack.com)

## License

MIT — Built for the beautiful game ⚽
