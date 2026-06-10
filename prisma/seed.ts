import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function daysFromNow(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

async function main() {
  await prisma.booking.deleteMany();
  await prisma.contactMessage.deleteMany();

  await prisma.booking.createMany({
    data: [
      {
        reference: "MGH-A1B2C",
        guestName: "Elif Yılmaz",
        email: "elif@example.com",
        phone: "+90 532 111 22 33",
        roomId: "garden-suite",
        roomName: "Garden Suite",
        checkIn: daysFromNow(7),
        checkOut: daysFromNow(10),
        guests: 2,
        specialRequests: "Geç giriş yapacağız.",
        status: "pending",
      },
      {
        reference: "MGH-D4E5F",
        guestName: "John Carter",
        email: "john@example.com",
        phone: "+44 7700 900123",
        roomId: "treehouse-cabin",
        roomName: "Treehouse Cabin",
        checkIn: daysFromNow(14),
        checkOut: daysFromNow(17),
        guests: 4,
        specialRequests: null,
        status: "confirmed",
      },
      {
        reference: "MGH-G7H8J",
        guestName: "Mehmet Demir",
        email: "mehmet@example.com",
        phone: "+90 533 444 55 66",
        roomId: "mystery-room",
        roomName: "Mystery Room",
        checkIn: daysFromNow(3),
        checkOut: daysFromNow(5),
        guests: 2,
        specialRequests: "Yıldönümü kutlaması.",
        status: "cancelled",
      },
    ],
  });

  await prisma.contactMessage.create({
    data: {
      name: "Ayşe Kaya",
      email: "ayse@example.com",
      phone: "+90 535 777 88 99",
      message: "Merhaba, grup rezervasyonu hakkında bilgi alabilir miyim?",
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
