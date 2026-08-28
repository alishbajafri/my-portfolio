import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  projectType: z.string().trim().min(2).max(80),
  budget: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(10).max(4000),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    const to = "alishbafatima2018@gmail.com";
    const from = process.env["CONTACT_FROM_EMAIL"] || "Portfolio <onboarding@resend.dev>";

    if (!apiKey) {
      throw new Error("Email service is not configured yet. Please email directly for now.");
    }

    const escape = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `New project enquiry — ${data.projectType} (${data.name})`,
        html: `
          <h2>New project enquiry</h2>
          <p><strong>Name:</strong> ${escape(data.name)}</p>
          <p><strong>Email:</strong> ${escape(data.email)}</p>
          <p><strong>Project type:</strong> ${escape(data.projectType)}</p>
          <p><strong>Budget:</strong> ${escape(data.budget || "Not specified")}</p>
          <p><strong>Message:</strong></p>
          <p>${escape(data.message).replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Resend error", res.status, body);
      throw new Error("Message could not be sent right now. Please try email instead.");
    }

    return { ok: true as const };
  });
