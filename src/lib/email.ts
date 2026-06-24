import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_EMAIL = "HESP <onboarding@resend.dev>"
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "info@riyada-ventures.com"

export async function sendQuoteNotification(data: {
  name: string; company: string; email: string; phone: string
  partName?: string; partNumber?: string; brand?: string; quantity?: string; details?: string
}) {
  if (!resend) return
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Quote Request — ${data.partName || "Part Inquiry"} from ${data.company || data.name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#111318;color:#F1F5F9;border-radius:12px;">
          <h2 style="color:#D97706;margin-bottom:20px;">New Quote Request</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#64748B;width:120px;">Name</td><td style="padding:8px 0;color:#F1F5F9;">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:#64748B;">Company</td><td style="padding:8px 0;color:#F1F5F9;">${data.company || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#64748B;">Email</td><td style="padding:8px 0;color:#F1F5F9;">${data.email || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#64748B;">Phone</td><td style="padding:8px 0;color:#F1F5F9;">${data.phone}</td></tr>
            ${data.partNumber ? `<tr><td style="padding:8px 0;color:#64748B;">Part Number</td><td style="padding:8px 0;color:#F1F5F9;">${data.partNumber}</td></tr>` : ""}
            ${data.brand ? `<tr><td style="padding:8px 0;color:#64748B;">Brand</td><td style="padding:8px 0;color:#F1F5F9;">${data.brand}</td></tr>` : ""}
            ${data.quantity ? `<tr><td style="padding:8px 0;color:#64748B;">Quantity</td><td style="padding:8px 0;color:#F1F5F9;">${data.quantity}</td></tr>` : ""}
          </table>
          ${data.details ? `<div style="margin-top:16px;padding:12px;background:#1E2330;border-radius:8px;color:#94A3B8;">${data.details}</div>` : ""}
          <p style="margin-top:20px;color:#64748B;font-size:12px;">— HESP Admin Panel</p>
        </div>
      `,
    })
  } catch (err) {
    console.error("Failed to send quote notification email:", err)
  }
}

export async function sendContactNotification(data: {
  name: string; email: string; phone?: string; company?: string; message: string
}) {
  if (!resend) return
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Message from ${data.name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#111318;color:#F1F5F9;border-radius:12px;">
          <h2 style="color:#D97706;margin-bottom:20px;">New Contact Message</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#64748B;width:120px;">Name</td><td style="padding:8px 0;color:#F1F5F9;">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:#64748B;">Email</td><td style="padding:8px 0;color:#F1F5F9;">${data.email || "—"}</td></tr>
            ${data.phone ? `<tr><td style="padding:8px 0;color:#64748B;">Phone</td><td style="padding:8px 0;color:#F1F5F9;">${data.phone}</td></tr>` : ""}
            ${data.company ? `<tr><td style="padding:8px 0;color:#64748B;">Company</td><td style="padding:8px 0;color:#F1F5F9;">${data.company}</td></tr>` : ""}
          </table>
          <div style="margin-top:16px;padding:12px;background:#1E2330;border-radius:8px;color:#94A3B8;">${data.message}</div>
          <p style="margin-top:20px;color:#64748B;font-size:12px;">— HESP Admin Panel</p>
        </div>
      `,
    })
  } catch (err) {
    console.error("Failed to send contact notification email:", err)
  }
}

export async function sendAutoReply(data: {
  to: string; name: string; isArabic?: boolean; refType: "quote" | "contact"
}) {
  if (!resend || !data.to) return
  try {
    const isAr = data.isArabic
    const subject = data.refType === "quote"
      ? (isAr ? "تم استلام طلب عرض السعر الخاص بك" : "We received your quote request")
      : (isAr ? "تم استلام رسالتك" : "We received your message")

    const body = data.refType === "quote"
      ? (isAr
        ? `<p>مرحباً ${data.name}،</p><p>شكراً لطلبك عرض سعر من ريادة فنتشرز. سنقوم بالرد خلال ساعتين عمل.</p><p>مع أطيب التحيات،<br/>فريق ريادة فنتشرز</p>`
        : `<p>Hi ${data.name},</p><p>Thank you for your quote request. Our team will respond within 2 business hours.</p><p>Best regards,<br/>Riyada Ventures Team</p>`)
      : (isAr
        ? `<p>مرحباً ${data.name}،</p><p>شكراً لتواصلك معنا. سنقوم بالرد في أقرب وقت.</p><p>مع أطيب التحيات،<br/>فريق ريادة فنتشرز</p>`
        : `<p>Hi ${data.name},</p><p>Thank you for contacting us. We'll get back to you shortly.</p><p>Best regards,<br/>Riyada Ventures Team</p>`)

    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#111318;color:#F1F5F9;border-radius:12px;${isAr ? "direction:rtl;text-align:right;" : ""}">
          <div style="text-align:center;margin-bottom:20px;">
            <h1 style="color:#D97706;font-size:24px;margin:0;">Riyada Ventures</h1>
            <p style="color:#64748B;font-size:12px;margin:4px 0 0;">Heavy Equipment Spare Parts</p>
          </div>
          <div style="color:#F1F5F9;line-height:1.6;">${body}</div>
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #2A3144;text-align:center;">
            <p style="color:#64748B;font-size:11px;">Riyada Ventures · Al Faisaliyyah, Riyadh 12882, KSA</p>
            <p style="color:#64748B;font-size:11px;">+966 55 228 2868 · info@riyada-ventures.com</p>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error("Failed to send auto-reply email:", err)
  }
}
