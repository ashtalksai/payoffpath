# PayoffPath

**See Your Debt Disappear** - Financial command center for people who respect data over debt.

## Features

- 📊 **Dashboard** - Real-time overview with runway charts and debt timelines
- 💳 **Debt Tracking** - Snowball, avalanche, or custom payoff strategies
- 📝 **Transactions** - Manual entry or PDF bank statement import
- 💰 **Budgets** - Category-based spending limits with visual alerts
- 📈 **Reports** - Generate and export financial reports
- 🌙 **Dark Mode** - Professional, data-dense interface

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** shadcn/ui + Tailwind CSS
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Database:** PostgreSQL + Prisma
- **Auth:** NextAuth.js

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/ashtalksai/payoffpath.git
cd payoffpath

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and secrets

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
```

## Project Structure

```
src/
├── app/
│   ├── (app)/           # Authenticated app routes
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   ├── debts/
│   │   ├── budgets/
│   │   ├── reports/
│   │   └── settings/
│   ├── (auth)/          # Authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── (marketing)/     # Public marketing pages
│   │   ├── about/
│   │   ├── pricing/
│   │   └── deck/
│   ├── api/             # API routes
│   └── page.tsx         # Landing page
├── components/
│   ├── layout/          # Layout components
│   └── ui/              # shadcn/ui components
├── lib/                 # Utilities
└── prisma/              # Database schema
```

## Deployment

This app is configured for deployment on Coolify with:

- Memory limit: 256MB
- Health check endpoint: `/api/health`
- Auto-deploy from GitHub

## License

MIT
