const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendBookingEmails({ 
    email, 
    firstName, 
    lastName, 
    dayString, 
    referral, 
    description, 
    dateString, 
    number, 
    timeString, 
    timeRange, 
    meetLink 
}) {
    const clientMail = {
        from: `Jopad Advisory <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Advisory Session is Booked",
        html: `
            <div style="margin:0;padding:0;background-color:#f0f4f3;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4f3;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Email Container -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <!-- Teal Accent Bar -->
          <tr>
            <td style="height:4px;background-color:#0d9488;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Logo -->
          <tr>
            <td align="center" style="padding:32px 40px 24px 40px;">
              <a href="https://jopadconsulting.com" style="text-decoration:none;">
                    <img src="../../frontend.images/jopad-advisory-optimized.webp" alt="Jopad Advisory" width="160" style="display:block;max-width:160px;height:auto;" />
                </a>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:0 40px;">
              <h1 style="margin:0 0 8px 0;font-size:24px;font-weight:700;color:#1a1a1a;line-height:1.3;">Booking Confirmed</h1>
              <p style="margin:0 0 24px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                Hi ${firstName} ${lastName},<br/>
                Your advisory session has been successfully booked. Here are the details:
              </p>
            </td>
          </tr>

          <!-- Booking Details Card -->
          <tr>
            <td style="padding:0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7fafa;border:1px solid #e2e8e7;border-radius:6px;">
                <tr>
                  <td style="padding:24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding:0 0 14px 0;border-bottom:1px solid #e2e8e7;">
                          <span style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#0d9488;font-weight:700;">Date</span><br/>
                          <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${dayString} ${dateString}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 0;border-bottom:1px solid #e2e8e7;">
                          <span style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#0d9488;font-weight:700;">Time</span><br/>
                          <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${timeString}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 0;border-bottom:1px solid #e2e8e7;">
                          <span style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#0d9488;font-weight:700;">Duration</span><br/>
                          <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${timeRange}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 0 0 0;">
                          <span style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#0d9488;font-weight:700;">Meeting Link</span><br/>
                          <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${meetLink}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Join Meeting Button -->
          <tr>
            <td align="center" style="padding:28px 40px 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="border-radius:6px;background-color:#1a1a1a;">
                    <a href="${meetLink}" target="_blank" style="display:inline-block;padding:14px 40px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:6px;background-color:#1a1a1a;">Join with Google Meet →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Visit Website Button -->
          <tr>
            <td align="center" style="padding:12px 40px 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="border-radius:6px;border:2px solid #1a1a1a;">
                    <a href="https://jopadconsulting.com" target="_blank" style="display:inline-block;padding:12px 32px;font-size:14px;font-weight:600;color:#1a1a1a;text-decoration:none;border-radius:6px;">Visit Website</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reminder Section -->
          <tr>
            <td style="padding:28px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fffbeb;border-left:3px solid #f59e0b;border-radius:0 6px 6px 0;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;font-size:14px;color:#92400e;line-height:1.5;font-weight:600;">📅 Reminder</p>
                    <p style="margin:6px 0 0 0;font-size:14px;color:#92400e;line-height:1.5;">
                      Please accept the calendar invite sent to your email. A calendar file (.ics) is also attached to this email for your convenience.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Support -->
          <tr>
            <td style="padding:28px 40px 0 40px;">
              <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;">
                If you need to reschedule or have any questions, please reply to this email or contact us at <a href="mailto:${process.env.EMAIL_USER}" style="color:#0d9488;text-decoration:none;font-weight:600;">${process.env.EMAIL_USER}</a>.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:32px 40px 0 40px;">
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 40px 32px 40px;">
              <a href="https://jopadconsulting.com" style="text-decoration:none;">
                    <img src="../../frontend.images/jopad-advisory-optimized.webp" alt="Jopad Advisory" width="160" style="display:block;max-width:160px;height:auto;" />
                </a>
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                © ${new Date().getFullYear()} Jopad Advisory. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</div>
        `
    }

    const adminEmail = {
        from: `"Jopad Advisory" <${process.env.Email_USER}>`,
        to: process.env.EMAIL_USER,
        subject: "New Advisory Booking",
        html: `
            
<div style="margin:0;padding:0;background-color:#f0f4f3;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4f3;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <!-- Teal Accent Bar -->
          <tr>
            <td style="height:4px;background-color:#0d9488;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Logo -->
          <tr>
            <td align="center" style="padding:32px 40px 16px 40px;">
              <a href="https://jopadconsulting.com" style="text-decoration:none;">
                    <img src="../../frontend.images/jopad-advisory-optimized.webp" alt="Jopad Advisory" width="160" style="display:block;max-width:160px;height:auto;" />
                </a>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:0 40px 24px 40px;">
              <h1 style="margin:0 0 4px 0;font-size:22px;font-weight:700;color:#1a1a1a;line-height:1.3;">New Advisory Booking</h1>
              <p style="margin:0;font-size:14px;color:#6b7280;">A new session has been booked. Details below.</p>
            </td>
          </tr>

          <!-- Details Table -->
          <tr>
            <td style="padding:0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e2e8e7;border-radius:6px;overflow:hidden;">
                <!-- Row: Full Name -->
                <tr>
                  <td style="padding:12px 16px;background-color:#f7fafa;border-bottom:1px solid #e2e8e7;width:140px;">
                    <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.8px;color:#0d9488;font-weight:700;">Full Name</span>
                  </td>
                  <td style="padding:12px 16px;border-bottom:1px solid #e2e8e7;">
                    <span style="font-size:15px;color:#1a1a1a;font-weight:600;">${firstName} ${lastName}</span>
                  </td>
                </tr>
                <!-- Row: Email -->
                <tr>
                  <td style="padding:12px 16px;background-color:#f7fafa;border-bottom:1px solid #e2e8e7;">
                    <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.8px;color:#0d9488;font-weight:700;">Email</span>
                  </td>
                  <td style="padding:12px 16px;border-bottom:1px solid #e2e8e7;">
                    <a href="mailto:${email}" style="font-size:15px;color:#0d9488;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <!-- Row: Phone -->
                <tr>
                  <td style="padding:12px 16px;background-color:#f7fafa;border-bottom:1px solid #e2e8e7;">
                    <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.8px;color:#0d9488;font-weight:700;">WhatsApp Number</span>
                  </td>
                  <td style="padding:12px 16px;border-bottom:1px solid #e2e8e7;">
                    <span style="font-size:15px;color:#1a1a1a;">${number}</span>
                  </td>
                </tr>
                <!-- Row: Date -->
                <tr>
                  <td style="padding:12px 16px;background-color:#f7fafa;border-bottom:1px solid #e2e8e7;">
                    <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.8px;color:#0d9488;font-weight:700;">Date</span>
                  </td>
                  <td style="padding:12px 16px;border-bottom:1px solid #e2e8e7;">
                    <span style="font-size:15px;color:#1a1a1a;font-weight:600;">${dayString} ${dateString}</span>
                  </td>
                </tr>
                <!-- Row: Time -->
                <tr>
                  <td style="padding:12px 16px;background-color:#f7fafa;border-bottom:1px solid #e2e8e7;">
                    <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.8px;color:#0d9488;font-weight:700;">Time</span>
                  </td>
                  <td style="padding:12px 16px;border-bottom:1px solid #e2e8e7;">
                    <span style="font-size:15px;color:#1a1a1a;font-weight:600;">${timeString}</span>
                  </td>
                </tr>
                <!-- Row: Duration -->
                <tr>
                  <td style="padding:12px 16px;background-color:#f7fafa;border-bottom:1px solid #e2e8e7;">
                    <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.8px;color:#0d9488;font-weight:700;">Duration</span>
                  </td>
                  <td style="padding:12px 16px;border-bottom:1px solid #e2e8e7;">
                    <span style="font-size:15px;color:#1a1a1a;">${timeRange}</span>
                  </td>
                </tr>
                <!-- Row: Referral -->
                <tr>
                  <td style="padding:12px 16px;background-color:#f7fafa;border-bottom:1px solid #e2e8e7;">
                    <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.8px;color:#0d9488;font-weight:700;">Referral Source</span>
                  </td>
                  <td style="padding:12px 16px;border-bottom:1px solid #e2e8e7;">
                    <span style="font-size:15px;color:#1a1a1a;">${referral}</span>
                  </td>
                </tr>
                <!-- Row: Description -->
                <tr>
                  <td style="padding:12px 16px;background-color:#f7fafa;vertical-align:top;">
                    <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.8px;color:#0d9488;font-weight:700;">Message</span>
                  </td>
                  <td style="padding:12px 16px;">
                    <span style="font-size:14px;color:#4a4a4a;line-height:1.5;">${description}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Join Meeting Button -->
          <tr>
            <td align="center" style="padding:28px 40px 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="border-radius:6px;background-color:#1a1a1a;">
                    <a href="${meetLink}" target="_blank" style="display:inline-block;padding:14px 40px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:6px;background-color:#1a1a1a;">Join with Google Meet →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Website Link -->
          <tr>
            <td align="center" style="padding:12px 40px 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="border-radius:6px;border:2px solid #1a1a1a;">
                    <a href="https://jopadconsulting.com" target="_blank" style="display:inline-block;padding:12px 32px;font-size:14px;font-weight:600;color:#1a1a1a;text-decoration:none;border-radius:6px;">Visit Website</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:32px 40px 0 40px;">
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 40px 32px 40px;">
              <p style="margin:0 0 4px 0;font-size:13px;color:#6b7280;">
                <a href="https://jopadconsulting.com" style="text-decoration:none;">
                    <img src="../../frontend.images/jopad-advisory-optimized.webp" alt="Jopad Advisory" width="160" style="display:block;max-width:160px;height:auto;" />
                </a>
              </p>
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                © ${new Date().getFullYear()} Jopad Advisory. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</div>    
        `
    };

    await transporter.sendMail(clientMail);
    await transporter.sendMail(adminMail);
}

module.exports = { sendBookingEmails };