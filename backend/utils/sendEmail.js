const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);


async function sendBookingEmails({ 
    email, 
    firstName, 
    lastName, 
    dayString, 
    referral, 
    dateString, 
    description,
    number, 
    timeString, 
    timeRange, 
    meetLink 
}) {
    try {
        const clientMail =  await resend.emails.send({
        from: `Jogos Partners & Advisory LP <bookings@jopadconsulting.com>`,
        reply_to: process.env.EMAIL_USER, 
        to: email,
        subject: "Your Advisory Session is Booked",
        html: `
        <!-- Wrapper -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:0;margin:0;">
            <tr>
            <td align="center" style="padding:0;margin:0;">

                <!-- Email Container -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

                <!-- Teal Accent Bar -->
                <tr>
                    <td style="height:4px;background-color:#0d9488;font-size:0;line-height:0;">&nbsp;</td>
                </tr>

                <!-- Logo -->
                <tr>
                    <td align="center" style="padding:32px 20px 8px 20px;">
                         <a href="https://jopadconsulting.com" style="text-decoration:none;padding: 0 0 10px 0">
                            <img src="https://jopadconsulting.com/images/jopad-advisory-optimize.png" alt="Jopad Advisory" width="130" style="display:block;border:0;max-width:130px;outline:none;text-decoration:none;height:auto;" />
                        </a>
                        <p style="margin:0 0 15px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                        Jogos Partners & Advisory (LP)
                    </p>
                    </td>
                </tr>

                  <!-- Divider -->
                <tr>
                    <td style="padding:0 20px;">
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
                    </td>
                </tr>

                <!-- Greeting -->
                <tr>
                    <td style="padding:16px 20px 0 20px;">
                    <h1 style="margin:0 0 8px 0;font-size:24px;font-weight:700;color:#1a1a1a;line-height:1.3;">Booking Confirmed</h1>
                    <p style="margin:0 0 8px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                        Hi ${lastName} ${firstName},
                    </p>
                    <p style="margin:0 0 24px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                        Your advisory session has been successfully booked. Here are the details:
                    </p>
                    </td>
                </tr>

                <!-- Booking Details Card -->
                <tr>
                    <td style="padding:0 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7fafa;border:1px solid #e2e8e7;border-radius:10px;">
                        <tr>
                        <td style="padding:15px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="padding:0 0 15px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;letter-spacing:1px;display:inline-block;padding: 0 0 5px 0;color:#0d9488;font-weight:700;">Date</span><br/>
                                <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${dayString} ${dateString}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#0d9488;display:inline-block;padding: 0 0 5px 0;font-weight:700;">Time</span><br/>
                                <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${timeString}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;display:inline-block;letter-spacing:1px;padding: 0 0 5px 0;color:#0d9488;font-weight:700;">Duration</span><br/>
                                <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${timeRange}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px 0 0 0;">
                                <span style="font-size:12px;text-transform:uppercase;display:inline-block;letter-spacing:1px;color:#0d9488;font-weight:700;padding: 0 0 5px 0  ;">Meeting Link</span><br/>
                                <a href="${meetLink}" target="_blank" style="font-size:16px;color:#1a1a1a;font-weight:600;text-decoration:none">${meetLink}</a>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>

                <!-- Message -->
                <tr>
                    <td style="padding:20px 20px 0 20px;">
                        <h3 style="margin:0 0 12px 0;font-size:24px;font-weight:700;color:#1a1a1a;line-height:1.3;">Description</h3>
                        <p style="margin:0;font-size:16px;font-weight:500;color:#4a4a4a;line-height:1.6;">
                            ${description}
                        </p>
                    </td>
                </tr>

                <!-- Join Meeting Button -->
                <tr>
                    <td align="center" style="padding:28px 20px 0 20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                        <td align="center" style="border-radius:10px;background-color:#1a1a1a;">
                            <a href="${meetLink}" target="_blank" style="display:inline-block;padding:15px 30px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px;background-color:#1a1a1a;">Join with Google Meet</a>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>

                <!-- Visit Website Button -->
                <tr>
                    <td align="center" style="padding:12px 20px 0 20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                        <td align="center" style="border-radius:10px;border:2px solid #1a1a1a;">
                            <a href="https://jopadconsulting.com" target="_blank" style="display:inline-block;padding: 12px 24px;font-size:14px;font-weight:600;color:#1a1a1a;text-decoration:none;border-radius:10px;">Visit Website</a>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>

                <!-- Reminder Section -->
                <tr>
                    <td style="padding:28px 20px 0 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fffbeb;border-left:3px solid #f59e0b;border-radius:0 10px 10px 0;">
                        <tr>
                        <td style="padding:15px;">
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
                    <td style="padding:28px 20px 0 20px;">
                    <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;">
                        If you need to reschedule or have any questions, please contact us at <a href="mailto:${process.env.EMAIL_USER}" style="color:#0d9488;text-decoration:none;font-weight:600;">${process.env.EMAIL_USER}</a>.
                    </p>
                    </td>
                </tr>

                <!-- Divider -->
                <tr>
                    <td style="padding:32px 20px 0 20px;">
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td align="center" style="padding:24px 20px 32px 20px;">
                    <a href="https://jopadconsulting.com" style="text-decoration:none;padding: 0 0 10px 0">
                            <img src="https://jopadconsulting.com/images/jopad-advisory-optimized.png" alt="Jopad Advisory" width="130" style="display:block;border:0;max-width:130px;outline:none;text-decoration:none;height:auto;" />
                        </a>
                        <p style="margin:0 0 5px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                        Jogos Partners & Advisory (LP)
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
            `
        });

        const adminMail = await resend.emails.send({
            from: `Jogos Partners & Advisory LP <bookings@jopadconsulting.com>`,
            reply_to: process.env.EMAIL_USER, 
            to: process.env.EMAIL_USER,
            subject: "New Advisory Booking",
            html: `
          <!-- Wrapper -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:0;margin:0;">
            <tr>
            <td align="center" style="padding:0;margin:0;">

                <!-- Email Container -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

                <!-- Teal Accent Bar -->
                <tr>
                    <td style="height:4px;background-color:#0d9488;font-size:0;line-height:0;">&nbsp;</td>
                </tr>

                <!-- Logo -->
                <tr>
                    <td align="center" style="padding:32px 8px 24px 20px;">
                        <a href="https://jopadconsulting.com" style="text-decoration:none;padding: 0 0 10px 0">
                            <img src="https://jopadconsulting.com/images/jopad-advisory-optimized.png" alt="Jopad Advisory" width="130" style="display:block;max-width:130px;height:auto;" />
                            <p style="margin:0 0 15px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                        Jogos Partners & Advisory (LP)
                    </p>
                        </a>
                    </td>
                </tr>

                 <!-- Divider -->
                <tr>
                    <td style="padding:0 20px;">
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
                    </td>
                </tr>

                <!-- Greeting -->
                <tr>
                    <td style="padding:16px 20px 0 20px;">
                        <h1 style="margin:0 0 8px 0;font-size:24px;font-weight:700;color:#1a1a1a;line-height:1.3;">New Advisory Booking</h1>
                        <p style="margin:0 0 8px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                            A new session has been booked. Details below.
                        </p>
                    </td>
                </tr>

                <!-- Booking Details Card -->
                <tr>
                    <td style="padding:0 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7fafa;border:1px solid #e2e8e7;border-radius:10px;">
                        <tr>
                        <td style="padding:15px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="padding:0 0 15px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;letter-spacing:1px;display:inline-block;padding: 0 0 5px 0;color:#0d9488;font-weight:700;">Full Name</span><br/>
                                <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${lastName} ${firstName}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#0d9488;display:inline-block;padding: 0 0 5px 0;font-weight:700;">Email</span><br/>
                                <a href="mailto:${email}" target="_blank" style="font-size:16px;color:#1a1a1a;font-weight:600;text-decoration:none;">${email}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;display:inline-block;letter-spacing:1px;padding: 0 0 5px 0;color:#0d9488;font-weight:700;">WhatsApp Number</span><br/>
                                <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${number}</span>
                                </td>
                            </tr>
                            <tr>
                            <tr>
                                <td style="padding:15px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;display:inline-block;letter-spacing:1px;padding: 0 0 5px 0;color:#0d9488;font-weight:700;">Date</span><br/>
                                <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${dayString} ${dateString}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;display:inline-block;letter-spacing:1px;padding: 0 0 5px 0;color:#0d9488;font-weight:700;">Time</span><br/>
                                <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${timeString}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;display:inline-block;letter-spacing:1px;padding: 0 0 5px 0;color:#0d9488;font-weight:700;">Duration</span><br/>
                                <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${timeRange}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;display:inline-block;letter-spacing:1px;padding: 0 0 5px 0;color:#0d9488;font-weight:700;">How did you hear about us?</span><br/>
                                <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${referral}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px 0 0 0;">
                                <span style="font-size:12px;text-transform:uppercase;display:inline-block;letter-spacing:1px;color:#0d9488;font-weight:700;padding: 0 0 5px 0;">Meeting Link</span><br/>
                                <a href="${meetLink}" target="_blank" style="font-size:16px;color:#1a1a1a;font-weight:600;text-decoration:none">${meetLink}</a>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>

                <!-- Message -->
                <tr>
                    <td style="padding:20px 20px 0 20px;">
                        <h3 style="margin:0 0 12px 0;font-size:24px;font-weight:700;color:#1a1a1a;line-height:1.3;">Description</h3>
                        <p style="margin:0;font-size:16px;font-weight:500;color:#4a4a4a;line-height:1.6;">
                            ${description}
                        </p>
                    </td>
                </tr>

                <!-- Join Meeting Button -->
                <tr>
                    <td align="center" style="padding:28px 20px 0 20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                        <td align="center" style="border-radius:10px;background-color:#1a1a1a;">
                            <a href="${meetLink}" target="_blank" style="display:inline-block;padding:15px 30px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px;background-color:#1a1a1a;">Join with Google Meet</a>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>

                <!-- Support -->
                <tr>
                    <td style="padding:28px 20px 0 20px;">
                    <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;">
                        If you need to reschedule or have any questions, please contact us at <a href="mailto:${process.env.EMAIL_USER}" style="color:#0d9488;text-decoration:none;font-weight:600;">${process.env.EMAIL_USER}</a>.
                    </p>
                    </td>
                </tr>

                <!-- Divider -->
                <tr>
                    <td style="padding:32px 20px 0 20px;">
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td align="center" style="padding:24px 20px 32px 20px;">
                    <a href="https://jopadconsulting.com" style="text-decoration:none;">
                            <img src="https://jopadconsulting.com/images/jopad-advisory-optimized.png" alt="Jopad Advisory" width="130" style="display:block;max-width:130px;height:auto;padding: 0 0 5px 0" />
                        </a>
                        <p style="margin:0 0 5px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                        Jogos Partners & Advisory (LP)
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
            `
        });
        console.log("Client email:", clientMail);
        console.log("Admin email:", adminMail);
    } catch (err) {
        console.log("Resend error:", err)
    }
}

async function sendIntakeEmails({
    intakeName,
    intakeEmail,
    intakeNumber,
    intakeCompany,
    intakeSubject,
    intakeMessage,
}) {
    try {
        const clientMail =  await resend.emails.send({
        from: `Jogos Partners & Advisory LP <intakes@jopadconsulting.com>`,
        reply_to: process.env.EMAIL_USER, 
        to: intakeEmail,
        subject: "Your Advisory Session is Booked",
        html: `
        <!-- Wrapper -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:0;margin:0;">
            <tr>
            <td align="center" style="padding:0;margin:0;">

                <!-- Email Container -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

                <!-- Teal Accent Bar -->
                <tr>
                    <td style="height:4px;background-color:#0d9488;font-size:0;line-height:0;">&nbsp;</td>
                </tr>

                <!-- Logo -->
                <tr>
                    <td align="center" style="padding:32px 20px 8px 20px;">
                         <a href="https://jopadconsulting.com" style="text-decoration:none;padding: 0 0 10px 0">
                            <img src="https://jopadconsulting.com/images/jopad-advisory-optimized.png" alt="Jopad Advisory" width="130" style="display:block;max-width:130px;border:0;outline:none;text-decoration:none;height:auto;" />
                        </a>
                        <p style="margin:0 0 15px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                        Jogos Partners & Advisory (LP)
                    </p>
                    </td>
                </tr>

                <!-- Divider -->
                <tr>
                    <td style="padding:0 20px;">
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
                    </td>
                </tr>

                <!-- Greeting -->
                <tr>
                    <td style="padding:16px 20px 0 20px;">
                    <h1 style="margin:0 0 8px 0;font-size:24px;font-weight:700;color:#1a1a1a;line-height:1.3;">We Received Your Intake Form</h1>
                    <p style="margin:0 0 8px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                        Hi ${intakeName},
                    </p>
                    <p style="margin:0 0 24px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                        Thank you for submitting your intake form. We've received your information and our advisory team is reviewing it now. 
                    </p>
                    <p style="margin:0 0 24px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                        This is the first step in our structured advisory process. We'll be in touch shortly with next steps tailored to your situation. 
                    </p>
                    </td>
                </tr>

                <!-- Booking Details Card -->
                <tr>
                    <td style="padding:0 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7fafa;border:1px solid #e2e8e7;border-radius:10px;">
                        <tr>
                        <td style="padding:15px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="padding:0 0 7.5px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:16px;text-transform:uppercase;letter-spacing:1px;display:inline-block;padding:0;color:#0d9488;font-weight:700;">Submission Summary</span><br/>
                            </tr>
                            <tr>
                                <td style="padding:7.5px 0 15px 0 ;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#0d9488;display:inline-block;padding: 0 0 5px 0;font-weight:700;">Name</span><br/>
                                <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${intakeName}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;display:inline-block;letter-spacing:1px;padding: 0 0 5px 0;color:#0d9488;font-weight:700;">Email</span><br/>
                                <a href="mailto:${intakeEmail}" target="_blank" style="font-size:16px;color:#1a1a1a;font-weight:600;text-decoration:none;">${intakeEmail}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px 0 0 0">
                                <span style="font-size:12px;text-transform:uppercase;display:inline-block;letter-spacing:1px;padding: 0 0 5px 0;color:#0d9488;font-weight:700;">Subject</span><br/>
                                <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${intakeSubject}</span>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                
                <!-- Message -->
                <tr>
                    <td style="padding:20px 20px 0 20px;">
                        <h3 style="margin:0 0 12px 0;font-size:24px;font-weight:700;color:#1a1a1a;line-height:1.3;">Description</h3>
                        <p style="margin:0;font-size:16px;font-weight:500;color:#4a4a4a;line-height:1.6;">
                            ${intakeMessage}
                        </p>
                    </td>
                </tr>

                <!-- Next Steps -->
                <tr>
                    <td style="padding:20px 20px 0 20px;">
                        <h3 style="margin:0 0 12px 0;font-size:24px;font-weight:700;color:#1a1a1a;line-height:1.3;">What happens next?</h3>
                        <p style="margin:0;font-size:16px;font-weight:500;color:#4a4a4a;line-height:1.6;">
                            <span style="color:#0d9488;">1.</span> Our team reviews your submission and assesses your needs.<br/>
                            <span style="color:#0d9488;">2.</span> We'll reach out to discuss your situation in more detail.<br/>
                            <span style="color:#0d9488;">3.</span> You may be invited for an initial advisory session.
                        </p>
                    </td>
                </tr>

                <!-- Visit Website Button -->
                <tr>
                    <td align="center" style="padding:28px 20px 0 20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                        <td align="center" style="border-radius:10px;background-color:#1a1a1a;">
                            <a href="https://jopadconsulting.com" target="_blank" style="display:inline-block;padding:15px 30px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px;background-color:#1a1a1a;">Visit Website</a>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>


                <!-- Support -->
                <tr>
                    <td style="padding:28px 20px 0 20px;">
                    <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;">
                        If you have any questions, please contact us at <a href="mailto:${process.env.EMAIL_USER}" style="color:#0d9488;text-decoration:none;font-weight:600;">${process.env.EMAIL_USER}</a>.
                    </p>
                    </td>
                </tr>

                <!-- Divider -->
                <tr>
                    <td style="padding:32px 20px 0 20px;">
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td align="center" style="padding:24px 20px 32px 20px;">
                    <a href="https://jopadconsulting.com" style="text-decoration:none;padding: 0 0 10px 0">
                            <img src="https://jopadconsulting.com/images/jopad-advisory-optimized.png" alt="Jopad Advisory" width="130" style="display:block;border:0;max-width:130px;outline:none;text-decoration:none;height:auto;" />
                        </a>
                        <p style="margin:0 0 5px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                        Jogos Partners & Advisory (LP)
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
            `
        });

        const adminMail = await resend.emails.send({
            from: `Jogos Partners & Advisory LP <intakes@jopadconsulting.com>`,
            reply_to: process.env.EMAIL_USER, 
            to: process.env.EMAIL_USER,
            subject: "New Intake Submission",
            html: `
          <!-- Wrapper -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:0;margin:0;">
            <tr>
            <td align="center" style="padding:0;margin:0;">

                <!-- Email Container -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

                <!-- Teal Accent Bar -->
                <tr>
                    <td style="height:4px;background-color:#0d9488;font-size:0;line-height:0;">&nbsp;</td>
                </tr>

                <!-- Logo -->
                <tr>
                    <td align="center" style="padding:32px 20px 8px 20px;">
                        <a href="https://jopadconsulting.com" style="text-decoration:none;padding: 0 0 10px 0">
                            <img src="https://jopadconsulting.com/images/jopad-advisory-optimized.png" alt="Jopad Advisory" width="130" style="display:block;max-width:130px;height:auto;" />
                            <p style="margin:0 0 15px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                        Jogos Partners & Advisory (LP)
                    </p>
                        </a>
                    </td>
                </tr>

                <!-- Divider -->
                <tr>
                    <td style="padding:0 20px;">
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
                    </td>
                </tr>

                <!-- Greeting -->
                <tr>
                    <td style="padding:16px 20px 0 20px;">
                        <h1 style="margin:0 0 8px 0;font-size:24px;font-weight:700;color:#1a1a1a;line-height:1.3;">New Advisory Booking</h1>
                        <p style="margin:0 0 8px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                            A new intake form has been submitted. Details below.
                        </p>
                    </td>
                </tr>

                <!-- Booking Details Card -->
                <tr>
                    <td style="padding:0 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7fafa;border:1px solid #e2e8e7;border-radius:10px;">
                        <tr>
                        <td style="padding:15px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="padding:0 0 15px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;letter-spacing:1px;display:inline-block;padding: 0 0 5px 0;color:#0d9488;font-weight:700;">Full Name</span><br/>
                                <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${intakeName}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#0d9488;display:inline-block;padding: 0 0 5px 0;font-weight:700;">Email</span><br/>
                                <a href="mailto:${intakeEmail}" target="_blank" style="font-size:16px;color:#1a1a1a;font-weight:600;text-decoration:none;">${intakeEmail}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;display:inline-block;letter-spacing:1px;padding: 0 0 5px 0;color:#0d9488;font-weight:700;">WhatsApp Number</span><br/>
                                <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${intakeNumber}</span>
                                </td>
                            </tr>
                            <tr>
                            <tr>
                                <td style="padding:15px 0;border-bottom:1px solid #e2e8e7;">
                                <span style="font-size:12px;text-transform:uppercase;display:inline-block;letter-spacing:1px;padding: 0 0 5px 0;color:#0d9488;font-weight:700;">Company</span><br/>
                                <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${intakeCompany}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px 0 0 0">
                                <span style="font-size:12px;text-transform:uppercase;display:inline-block;letter-spacing:1px;padding: 0 0 5px 0;color:#0d9488;font-weight:700;">Subject</span><br/>
                                <span style="font-size:16px;color:#1a1a1a;font-weight:600;">${intakeSubject}</span>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>

                <!-- Message -->
                <tr>
                    <td style="padding:20px 20px 0 20px;">
                        <h3 style="margin:0 0 12px 0;font-size:24px;font-weight:700;color:#1a1a1a;line-height:1.3;">Description</h3>
                        <p style="margin:0;font-size:16px;font-weight:500;color:#4a4a4a;line-height:1.6;">
                            ${intakeMessage}
                        </p>
                    </td>
                </tr>


                <!-- Divider -->
                <tr>
                    <td style="padding:32px 20px 0 20px;">
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td align="center" style="padding:24px 20px 32px 20px;">
                    <a href="https://jopadconsulting.com" style="text-decoration:none;">
                            <img src="https://jopadconsulting.com/images/jopad-advisory-optimized.png" alt="Jopad Advisory" width="130" style="display:block;max-width:130px;height:auto;padding: 0 0 5px 0" />
                        </a>
                        <p style="margin:0 0 5px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">
                        Jogos Partners & Advisory (LP)
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
            `
        });
        console.log("Client email:", clientMail);
        console.log("Admin email:", adminMail);
    } catch (err) {
        console.log("Resend error:", err)
    }
}

module.exports = { sendBookingEmails, sendIntakeEmails };