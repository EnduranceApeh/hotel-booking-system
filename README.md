# Hotel Booking Web Application

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?style=for-the-badge&logo=postgresql)

A production-ready, single-hotel direct booking web application. It features a modern, luxury-focused user interface, a robust core booking engine, and a secure admin dashboard for managing reservations and rooms.

## ✨ Features

### Client-Facing
- **Premium UI/UX:** Luxury-focused design utilizing Tailwind CSS and animated micro-interactions.
- **Dynamic Booking Engine:** Real-time room availability calculation and reservation locking.
- **Quick Book Widget:** Intuitive date-picker widget powered by `react-day-picker` and `date-fns`.
- **Marketing Pages:** Storytelling-driven "About Us", "Amenities", and Hero sections.

### Admin Dashboard
- **Secure Authentication:** Protected admin routes utilizing NextAuth with credential-based login (`bcryptjs`).
- **Dashboard Overview:** Aggregated statistics for bookings, revenue, and room availability.
- **Room Management:** Toggle room status, update details, and manage inventory.
- **Reservation Management:** View, search, and cancel bookings via interactive Server Actions.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/), [@base-ui/react](https://base-ui.com/), Lucide Icons
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL (via `pg` and Prisma PG adapter)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL database

### Installation

1. **Clone the repository** (if applicable) and navigate to the project directory:
   ```bash
   cd hotel-booking-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` or `.env.local` file in the root of the project and add the necessary variables:
   ```env
   # Database Connection
   DATABASE_URL="postgresql://user:password@localhost:5432/hotel_db?schema=public"

   # NextAuth Configuration
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key"
   ```

4. **Initialize the database:**
   Run Prisma migrations to create the schema in your PostgreSQL database:
   ```bash
   npx prisma migrate dev
   ```

5. **Seed the database:**
   Populate the database with initial room data, default cancellation policies, and an initial admin user:
   ```bash
   npx prisma db seed
   ```
   *(Note: The default admin credentials will be specified in your `prisma/seed.ts` file)*

6. **Start the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The Admin Dashboard is accessible at `/admin`.

## 📂 Project Structure

```text
├── prisma/               # Prisma schema and database seed scripts
├── src/
│   ├── app/              # Next.js App Router pages and API routes
│   │   ├── (admin)/      # Protected admin dashboard routes
│   │   ├── (marketing)/  # Client-facing marketing pages
│   │   ├── api/          # Next.js API endpoints (NextAuth, etc.)
│   │   └── ...
│   ├── components/       # Reusable UI components (shadcn/ui, custom)
│   ├── lib/              # Utility functions, Prisma client, NextAuth config
│   └── ...
├── middleware.ts         # NextAuth middleware for route protection
├── tailwind.config.ts    # Tailwind CSS configuration
└── package.json          # Project dependencies and scripts
```

## 🏗️ Build and Deployment

To build the project for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

This project is optimized for deployment on [Vercel](https://vercel.com/), but can be hosted on any platform that supports Node.js and Next.js applications. Ensure your `DATABASE_URL` points to your production PostgreSQL database and your `NEXTAUTH_URL` is updated to your production domain.

## 📄 License

This project is licensed under the MIT License.
