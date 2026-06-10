/**
 * Email notification stub.
 *
 * For now this logs a formatted message to the server console. The template is
 * ready so a real provider (Nodemailer / Resend / SES) can be dropped in later
 * by replacing the body of `sendMail`.
 */

interface MailInput {
  to: string;
  subject: string;
  body: string;
}

async function sendMail({ to, subject, body }: MailInput) {
  // TODO: integrate SMTP / transactional email provider here.
  console.log("\n========== EMAIL (stub) ==========");
  console.log("To:      ", to);
  console.log("Subject: ", subject);
  console.log("----------------------------------");
  console.log(body);
  console.log("==================================\n");
}

export async function sendBookingNotification(booking: {
  reference: string;
  guestName: string;
  email: string;
  phone: string;
  roomName: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  specialRequests?: string | null;
}) {
  const fmt = (d: Date) => d.toISOString().split("T")[0];
  const notifyEmail =
    process.env.NOTIFY_EMAIL || "info@mysterygardenhouse.com";

  // Notify the host
  await sendMail({
    to: notifyEmail,
    subject: `New reservation request — ${booking.reference}`,
    body: [
      `Reference: ${booking.reference}`,
      `Guest:     ${booking.guestName} (${booking.email}, ${booking.phone})`,
      `Room:      ${booking.roomName}`,
      `Dates:     ${fmt(booking.checkIn)} → ${fmt(booking.checkOut)}`,
      `Guests:    ${booking.guests}`,
      `Requests:  ${booking.specialRequests || "-"}`,
    ].join("\n"),
  });

  // Acknowledge the guest
  await sendMail({
    to: booking.email,
    subject: `Mystery Garden House — request received (${booking.reference})`,
    body: [
      `Dear ${booking.guestName},`,
      ``,
      `We have received your reservation request. Our team will contact you`,
      `shortly to confirm availability.`,
      ``,
      `Reference: ${booking.reference}`,
      `Room:      ${booking.roomName}`,
      `Dates:     ${fmt(booking.checkIn)} → ${fmt(booking.checkOut)}`,
      ``,
      `Warm regards,`,
      `Mystery Garden House`,
    ].join("\n"),
  });
}
