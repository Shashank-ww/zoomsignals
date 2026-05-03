import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // store subscriber (no duplicates)
    await prisma.subscriber.upsert({
      where: { email: normalizedEmail },
      update: {},
      create: { email: normalizedEmail },
    });

    // create token
    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 min

    await prisma.accessToken.create({
      data: {
        email: normalizedEmail,
        token,
        expiresAt,
      },
    });

    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/download/${token}`;

    // email transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // send email
 await transporter.sendMail({
  from: process.env.EMAIL_FROM,
  to: normalizedEmail,
  subject: "Here is your signal data! From Myadbreak.com",

  html: `
    <div>

      <p>Hey There!</p>
      
      <p>
      I see you accessed the database. Sharing your custom link:
      </p>

      <p> 
      <a href="${link}"> 
      Download here! 
      </a> 
      </p>

      <p>
      This sample has 3 signals. It is a small slice of how we're tracking live ad formats, narratives, and patterns across brands.
      </p>

      <p>
      If you need more info, a larger dataset, insights, feel something missing, or anything you'd want deeper understanding on.
      </p>

      <p>
      You can also reply to this email. I read everything.
      </p>

      <p>
      Thanks,
      </p>
      <p>
      Shashank Sriv.
      <br/>
      Founder, CEO
      <br/>
      Myadbreak, insights on live ad formats
      </p>

      <p>
      P.S. This link expires in 30 mins. If it doesn’t work, you can reply to request a fresh one.
      </p>

    </div>
  `,
});

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("SEND ACCESS ERROR:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}