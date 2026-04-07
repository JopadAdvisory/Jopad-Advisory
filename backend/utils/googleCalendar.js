const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRETE,
    process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const calendar = google.calendar({
    version: "v3",
    auth: oauth2Client
});

async function createMeeting({ startTime, duration, email, firstName, lastName }) {
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + Number(duration));

    const event = {
        summary: `Jopad Advisory Session - ${firstName} ${lastName}`,
        description: "Jopad Advisory Session",
        start: {
            dateTime: new Date(startTime).toISOString(),
        },
        end: {
            dateTime: endTime.toISOString(),
        },
        attendees: [
            { 
                email,
                responseStatus: "accepted"

            }
        ],
        conferenceData: {
            createRequest: {
                requestId: "jopad-" + Date.now(),
                conferenceSolutionKey: {
                    type: "hangoutsMeet"
                }
            }
        },
        guestsCanModify: false,
        guestsCanInviteOthers: false,
        guestsCanSeeOtherGuests: false
    };

    const response = await calendar.events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: "all"
    });

    const meetLink = response.data.conferenceData.entryPoints[0].uri;

    return meetLink;
}

module.exports = { createMeeting };
