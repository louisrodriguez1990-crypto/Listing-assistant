function getTwilioClient() {
  const twilio = require('twilio')
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    throw new Error('Twilio credentials not set')
  }
  return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return digits.startsWith('1') ? `+${digits}` : `+1${digits}`
}

export async function sendLeadFollowUpSms(params: {
  to: string
  agentName: string
  leadName: string
  propertyInterest?: string
}) {
  const { to, agentName, leadName, propertyInterest } = params
  const propertyLine = propertyInterest ? ` about ${propertyInterest}` : ''
  const body =
    `Hi ${leadName}, this is ${agentName}! Thanks for reaching out${propertyLine}. ` +
    `I'd love to connect — I'll be calling you shortly. Feel free to text back with any questions.`

  return getTwilioClient().messages.create({
    body,
    from: process.env.TWILIO_PHONE_NUMBER!,
    to: formatPhone(to),
  })
}
