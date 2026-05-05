import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const ROOMS = [
  {
    name: 'Ocean View Standard',
    type: 'Standard',
    description: 'A beautifully appointed room with a private balcony overlooking the ocean. Perfect for couples or solo travelers looking for a serene getaway.',
    basePrice: 299,
    maxAdults: 2,
    maxChildren: 1,
    totalUnits: 10,
    images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200'],
    amenities: ['Ocean View', 'King Bed', 'Free Wi-Fi', 'Mini Bar', 'Smart TV'],
    isActive: true,
  },
  {
    name: 'Premium Deluxe',
    type: 'Deluxe',
    description: 'Spacious corner room featuring panoramic views, an oversized soaking tub, and premium linens. Ideal for longer stays and honeymooners.',
    basePrice: 450,
    maxAdults: 2,
    maxChildren: 2,
    totalUnits: 5,
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200'],
    amenities: ['Panoramic View', 'King Bed', 'Soaking Tub', 'Room Service', 'Espresso Machine'],
    isActive: true,
  },
  {
    name: 'Executive Suite',
    type: 'Suite',
    description: 'A luxurious suite with a separate living area, dining space, and dual balconies. Experience the ultimate in comfort and space.',
    basePrice: 850,
    maxAdults: 4,
    maxChildren: 2,
    totalUnits: 2,
    images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200'],
    amenities: ['Separate Living Area', 'Two King Beds', 'Butler Service', 'Lounge Access', 'Premium Bar'],
    isActive: true,
  },
];

async function main() {
  console.log('Seeding Database...');

  // Optional: clear existing rooms (be careful with foreign constraints if Bookings exist)
  // await prisma.room.deleteMany(); 
  
  for (const room of ROOMS) {
    const existing = await prisma.room.findFirst({
      where: { name: room.name }
    });

    if (!existing) {
      const created = await prisma.room.create({
        data: room
      });
      console.log(`Created Room: ${created.name}`);
    } else {
      console.log(`Room ${existing.name} already exists. Skipping.`);
    }
  }

  // Also create a default Cancellation Policy for bookings
  const existingPolicy = await prisma.cancellationPolicy.findFirst({
    where: { isDefault: true }
  });

  if (!existingPolicy) {
    await prisma.cancellationPolicy.create({
      data: {
        name: 'Standard Policy',
        isDefault: true,
        rules: {
          freeCancellationWithinHours: 72
        }
      }
    });
    console.log('Created Default Cancellation Policy');
  }

  // Seed Admin User
  const adminEmail = 'admin@example.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    // We are importing bcrypt dynamically so it works after npm install is done
    const bcrypt = require('bcryptjs');
    const passwordHash = await bcrypt.hash('password123', 10);
    
    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: adminEmail,
        passwordHash,
        role: 'ADMIN',
        isActive: true,
      }
    });
    console.log('Created Default Admin User (admin@example.com / password123)');
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
