import express from 'express';
import { Resend } from 'resend';

const router = express.Router();

const logger = {
  error: (msg) => process.env.NODE_ENV !== 'production' && console.error(msg),
  info:  (msg) => process.env.NODE_ENV !== 'production' && console.log(msg),
};

// Simple server-side email validator
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

router.post('/api/contact', async (req, res) => {
  const { name, email, company, service, message } = req.body ?? {};

  // ── Validation ────────────────────────────────────────────────────────────
  const errors = {};
  if (!name?.trim())                         errors.name    = 'Name is required.';
  if (!email?.trim())                        errors.email   = 'Email is required.';
  else if (!isValidEmail(email))             errors.email   = 'Invalid email address.';
  if (!message?.trim())                      errors.message = 'Project brief is required.';

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ error: 'Validation failed', fields: errors });
  }

  // ── Send via Resend ───────────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    logger.error('[contact] RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'Email service not configured.' });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from:    'Quonote Contact Form <onboarding@resend.dev>', // swap for verified domain sender once domain is added in Resend
      to:      ['info@quonote.com'],
      replyTo: email.trim(),
      subject: `Quonote enquiry: ${service ?? 'General Enquiry'} — ${name.trim()}`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
          <div style="background:#2563eb;padding:24px 32px;border-radius:12px 12px 0 0;">
            <h1 style="color:#ffffff;margin:0;font-size:20px;font-weight:700;">New enquiry from Quonote.com</h1>
          </div>
          <div style="background:#f8fafc;padding:32px;border:1px solid #e2e8f0;border-radius:0 0 12px 12px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;font-weight:600;width:130px;color:#64748b;">Name</td><td style="padding:8px 0;">${name.trim()}</td></tr>
              <tr><td style="padding:8px 0;font-weight:600;color:#64748b;">Email</td><td style="padding:8px 0;"><a href="mailto:${email.trim()}" style="color:#2563eb;">${email.trim()}</a></td></tr>
              <tr><td style="padding:8px 0;font-weight:600;color:#64748b;">Company</td><td style="padding:8px 0;">${company?.trim() || '—'}</td></tr>
              <tr><td style="padding:8px 0;font-weight:600;color:#64748b;">Service</td><td style="padding:8px 0;">${service ?? '—'}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
            <p style="font-weight:600;color:#64748b;margin:0 0 8px;">Project Brief</p>
            <p style="margin:0;white-space:pre-wrap;line-height:1.7;">${message.trim()}</p>
          </div>
          <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:16px;">Sent via quonote.com contact form</p>
        </div>
      `,
      text: [
        `New enquiry from Quonote.com`,
        ``,
        `Name:    ${name.trim()}`,
        `Email:   ${email.trim()}`,
        `Company: ${company?.trim() || '—'}`,
        `Service: ${service ?? '—'}`,
        ``,
        `Project Brief:`,
        message.trim(),
      ].join('\n'),
    });

    if (error) {
      logger.error(`[contact] Resend error: ${JSON.stringify(error)}`);
      return res.status(502).json({ error: 'Failed to send email. Please try again.' });
    }

    logger.info(`[contact] Email sent from ${email}`);
    return res.status(200).json({ ok: true });

  } catch (err) {
    logger.error(`[contact] Unexpected error: ${err.message}`);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
