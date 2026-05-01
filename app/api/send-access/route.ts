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

    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?token=${token}`;

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
  subject: "Quick one — your signal access",

  replyTo: process.env.SMTP_USER, // important to keep for replies

  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial; line-height:1.5; color:#111; padding:20px;">
      
      <p>Hey,</p>

      <p>
        Saw you checked out the signal database — sharing your access below.
      </p>

      <p>
        <a href="${link}" style="color:#2563eb; text-decoration:underline;">
        Download your sample
        </a>
      </p>

      <p>
        This is a small preview with 3 free samples, of how we're tracking live ad formats, narratives, and patterns across brands.
      </p>

      <p>
        Would genuinely love your thoughts as in what works, what feels missing, anything you'd want deeper.
      </p>

      <p>
        You can just reply to this email. I read everything.
      </p>

      <br/>

      <p style="font-size:12px; color:#666;">
        Link expires in 30 mins. If it breaks, just reply and Ill resend.
      </p>

      <br/>

      <p>
        — Shashank  
        <br/>
        Myadbreak
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