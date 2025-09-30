# WalkieRentals

A modern, full-stack walkie-talkie rental platform built with Next.js 15, TypeScript, and Prisma.

## Features

✨ **User Features**
- Browse rental equipment and packages
- Shop for accessories
- Real-time availability checking
- Shopping cart with rental date selection
- Secure authentication (Email/Password, Google, GitHub OAuth)
- Dark mode support

🔐 **Admin Features**
- Product and package management
- Inventory tracking
- Order management
- Image uploads via UploadThing
- Dashboard analytics

⚡ **Technical Features**
- Next.js 15 with App Router and Turbopack
- TypeScript with strict mode
- Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- NextAuth.js for authentication
- Tailwind CSS v4 with modern design system
- Responsive design with mobile support
- Optimized for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd walkierentals
   ```

2. **Install dependencies**
   ```bash
   npm ci
   ```

3. **Set up environment variables**
   
   Copy `.env.local` and configure:
   ```bash
   cp .env.local .env.local.example
   ```
   
   Required variables:
   - `DATABASE_URL` - Your database connection string
   - `NEXTAUTH_SECRET` - Random secret (generate with `openssl rand -base64 32`)
   - `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)

4. **Initialize the database**
   ```bash
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
walkierentals/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (signin, register)
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── cart/              # Shopping cart
│   ├── rentals/           # Rental products
│   └── packages/          # Rental packages
├── components/            # React components
├── lib/                   # Utilities and configurations
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Type check with TypeScript
- `npm run db:push` - Push database schema changes
- `npm run prisma:generate` - Generate Prisma client

## Documentation

- **[Deployment Guide](./DEPLOYMENT.md)** - Complete Vercel deployment instructions
- **[OAuth Setup](./OAUTH_SETUP.md)** - Configure Google and GitHub OAuth
- **[WARP Guide](./WARP.md)** - Project structure and development guide

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [Prisma ORM](https://www.prisma.io/) + SQLite/PostgreSQL
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **File Uploads**: [UploadThing](https://uploadthing.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## Deploy to Vercel

The fastest way to deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lschneiderny/walkierental)

**For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

### Quick Deploy Steps:

1. Push code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy!

Vercel will automatically:
- Detect Next.js and configure build settings
- Enable edge functions and middleware
- Set up automatic deployments on push
- Provide preview deployments for PRs

## Environment Variables

### Required
- `NEXTAUTH_URL` - Your application URL
- `NEXTAUTH_SECRET` - Secret for session encryption
- `DATABASE_URL` - Database connection string

### Optional (OAuth)
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`

### Optional (Image Uploads)
- `UPLOADTHING_SECRET` & `UPLOADTHING_APP_ID`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete environment variable guide.

## Performance

✅ Optimized for production:
- Image optimization (WebP/AVIF)
- Automatic code splitting
- Static page generation where possible
- Compression (Gzip/Brotli)
- Security headers
- Long-term caching for static assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Support

For issues and questions:
- Check the [documentation](./DEPLOYMENT.md)
- Open an issue on GitHub
- Contact the development team
