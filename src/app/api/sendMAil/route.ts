// pages/api/sendEmail.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ResponseData = {
  success: boolean;
  message?: string;
};

export default async function POST(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  return NextResponse.json("users", {status:200});
  console.log("TEST");
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  const { senderEmail, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "MTY",
    to: 'abdallah3162@gmail.com', // Replace with your email
    subject: 'New message from your website',
    text: "message",
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
}


// export async function GET(){


//   return NextResponse.json("users", {status:200});
// }