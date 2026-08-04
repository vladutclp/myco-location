import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database with 10 users (varied spots)...");

  const users = [
    // no spots
    { email: "u1@example.com", firstName: "User", lastName: "One" },
    // single spot
    {
      email: "u2@example.com",
      firstName: "User",
      lastName: "Two",
      spots: {
        create: [
          { title: "Lakeside", latitude: 34.0522, longitude: -118.2437 },
        ],
      },
    },
    // multiple spots
    {
      email: "u3@example.com",
      firstName: "User",
      lastName: "Three",
      spots: {
        create: [
          { title: "Forest patch", latitude: 51.5074, longitude: -0.1278 },
          { title: "River bank", latitude: 51.5007, longitude: -0.1246 },
          { title: "Old bridge", latitude: 51.501, longitude: -0.1416 },
        ],
      },
    },
    // no name, no spots
    { email: "u4@example.com" },
    // many spots
    {
      email: "u5@example.com",
      firstName: "Fiona",
      lastName: "Five",
      spots: {
        create: [
          { title: "Hill top", latitude: 40.7128, longitude: -74.006 },
          { title: "Valley", latitude: 40.706, longitude: -74.01 },
          { title: "Canyon", latitude: 40.7, longitude: -74.012 },
          { title: "Stream", latitude: 40.71, longitude: -74.02 },
        ],
      },
    },
    // single spot, optional fields missing
    {
      email: "u6@example.com",
      spots: {
        create: [{ title: "Field", latitude: 48.8566, longitude: 2.3522 }],
      },
    },
    // no spots
    { email: "u7@example.com", firstName: "Seven" },
    // one spot
    {
      email: "u8@example.com",
      firstName: "Eight",
      spots: {
        create: [{ title: "Dock", latitude: 37.7749, longitude: -122.4194 }],
      },
    },
    // multiple spots
    {
      email: "u9@example.com",
      firstName: "Nine",
      spots: {
        create: [
          { title: "Park", latitude: 35.6895, longitude: 139.6917 },
          { title: "Garden", latitude: 35.688, longitude: 139.692 },
        ],
      },
    },
  ];

  for (const u of users) {
    // ensure email uniqueness; skip if exists
    const exists = await prisma.user.findUnique({ where: { email: u.email } });
    if (exists) {
      console.log("Skipping existing user", u.email);
      continue;
    }
    await prisma.user.create({ data: u as any });
    console.log("Created", u.email);
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
