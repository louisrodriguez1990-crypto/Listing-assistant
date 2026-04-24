import { Resend } from 'resend'

function getResend() {
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is not set')
  return new Resend(process.env.RESEND_API_KEY)
}

export interface LeadEmailParams {
  agentName: string
  agentEmail: string
  leadName: string
  leadEmail: string
  propertyInterest?: string
}

export async function sendLeadFollowUpEmail(params: LeadEmailParams) {
  const { agentName, agentEmail, leadName, leadEmail, propertyInterest } = params
  const propertyLine = propertyInterest
    ? `your inquiry about <strong>${propertyInterest}</strong>`
    : 'your real estate inquiry'

  const { data, error } = await getResend().emails.send({
    from: `${agentName} via ListingAssistant <leads@listingassistant.net>`,
    to: [leadEmail],
    replyTo: agentEmail,
    subject: `Hi ${leadName} — thanks for reaching out!`,
    html: `
      <div style="font-family:'Inter',Arial,sans-serif;max-width:560px;margin:0 auto;color:#0E1726">
        <div style="background:#1B3A6B;padding:24px 32px;border-radius:10px 10px 0 0">
          <span style="color:white;font-size:17px;font-weight:600;letter-spacing:-0.01em">ListingAssistant</span>
        </div>
        <div style="background:#fff;padding:32px;border:1px solid #E7E4DC;border-top:none;border-radius:0 0 10px 10px">
          <p style="font-size:17px;margin:0 0 16px">Hi <strong>${leadName}</strong>,</p>
          <p style="margin:0 0 16px;line-height:1.6;color:#3A4557">
            Thanks so much for ${propertyLine}. I'm <strong>${agentName}</strong>, and I'd love to help you find exactly what you're looking for.
          </p>
          <p style="margin:0 0 24px;line-height:1.6;color:#3A4557">
            I'll be reaching out by phone shortly to answer any questions and schedule a showing at your convenience.
          </p>
          <a href="mailto:${agentEmail}" style="display:inline-block;background:#F5820A;color:white;padding:13px 24px;border-radius:8px;text-decoration:none;font-weight:500;font-size:15px">
            Reply to ${agentName}
          </a>
          <p style="margin:24px 0 0;font-size:13px;color:#A0A7B4">
            This message was sent automatically via ListingAssistant on behalf of ${agentName}.
          </p>
        </div>
      </div>
    `,
  })
  if (error) throw error
  return data
}

export async function sendAgentReminderEmail(params: {
  agentEmail: string
  agentName: string
  leadName: string
  leadPhone?: string
  leadEmail?: string
  propertyInterest?: string
  leadId: string
}) {
  const { agentEmail, agentName, leadName, leadPhone, leadEmail, propertyInterest, leadId } = params
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://listingassistant.net'

  const { data, error } = await getResend().emails.send({
    from: 'ListingAssistant Reminders <reminders@listingassistant.net>',
    to: [agentEmail],
    subject: `⏰ Reminder: Call ${leadName} now`,
    html: `
      <div style="font-family:'Inter',Arial,sans-serif;max-width:560px;margin:0 auto;color:#0E1726">
        <div style="background:#1B3A6B;padding:24px 32px;border-radius:10px 10px 0 0">
          <span style="color:white;font-size:17px;font-weight:600">ListingAssistant</span>
        </div>
        <div style="background:#fff;padding:32px;border:1px solid #E7E4DC;border-top:none;border-radius:0 0 10px 10px">
          <div style="background:#FFF4E6;border:1px solid rgba(245,130,10,.2);border-radius:8px;padding:16px 20px;margin-bottom:24px">
            <p style="margin:0;font-size:13px;font-weight:600;color:#DB6F00;text-transform:uppercase;letter-spacing:.06em">1-Hour Follow-Up Reminder</p>
          </div>
          <p style="font-size:17px;margin:0 0 16px">Hi <strong>${agentName}</strong>,</p>
          <p style="margin:0 0 16px;line-height:1.6;color:#3A4557">
            It's been an hour since <strong>${leadName}</strong> submitted their inquiry${propertyInterest ? ` about <strong>${propertyInterest}</strong>` : ''}. We sent them an email and SMS — now it's your turn.
          </p>
          <table style="width:100%;border:1px solid #E7E4DC;border-radius:8px;border-spacing:0;overflow:hidden;margin-bottom:24px">
            ${leadPhone ? `<tr><td style="padding:12px 16px;border-bottom:1px solid #E7E4DC;font-size:13px;color:#667085;width:100px">Phone</td><td style="padding:12px 16px;border-bottom:1px solid #E7E4DC;font-size:14px;font-weight:500"><a href="tel:${leadPhone}" style="color:#1B3A6B">${leadPhone}</a></td></tr>` : ''}
            ${leadEmail ? `<tr><td style="padding:12px 16px;border-bottom:1px solid #E7E4DC;font-size:13px;color:#667085">Email</td><td style="padding:12px 16px;border-bottom:1px solid #E7E4DC;font-size:14px;font-weight:500"><a href="mailto:${leadEmail}" style="color:#1B3A6B">${leadEmail}</a></td></tr>` : ''}
            ${propertyInterest ? `<tr><td style="padding:12px 16px;font-size:13px;color:#667085">Property</td><td style="padding:12px 16px;font-size:14px;font-weight:500">${propertyInterest}</td></tr>` : ''}
          </table>
          <a href="${appUrl}/dashboard" style="display:inline-block;background:#1B3A6B;color:white;padding:13px 24px;border-radius:8px;text-decoration:none;font-weight:500;font-size:15px">
            Mark as Contacted →
          </a>
          <p style="margin:24px 0 0;font-size:13px;color:#A0A7B4">Lead ID: ${leadId}</p>
        </div>
      </div>
    `,
  })
  if (error) throw error
  return data
}
