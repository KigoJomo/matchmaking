// app/api/submit/route.js

import { google } from 'googleapis'

export async function POST(req) {
  try {
    const {
      names,
      email,
      gender,
      age,
      occupation,
      location,
      faith,
      children,
      aboutYou,
      mpesaCode,
      lookingFor,
    } = await req.json()

    // Validate required fields
    if (
      !names ||
      !email ||
      !gender ||
      !age ||
      !occupation ||
      !location ||
      !children ||
      !aboutYou ||
      !mpesaCode ||
      !lookingFor
    ) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'All required fields must be filled.',
        }),
        { status: 400 }
      )
    }

    // Google Sheets API setup
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:J',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [
              names,
              email,
              gender,
              age,
              occupation,
              location,
              faith,
              children,
              aboutYou,
              mpesaCode,
              lookingFor,
            ],
          ],
        },
      })
    } catch (sheetError) {
      console.error('Error appending to Google Sheets:', sheetError)
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Failed to append data to Google Sheets.',
        }),
        { status: 500 }
      )
    }

    // Construct WhatsApp message
    const message = `*Name:* ${names}\n*Email:* ${email}\n*Gender:* ${gender}\n*Age:* ${age}\n*Occupation:* ${occupation}\n*Location:* ${location}\n*Faith:* ${faith}\n*Children:* ${children}\n*About You:* ${aboutYou}\n*MPESA Code:* ${mpesaCode}\n*Looking For:* ${lookingFor}`
    const whatsappNumber = process.env.WHATSAPP_NUMBER

    const url = createWhatsAppUrl(whatsappNumber, message)

    // Return the WhatsApp URL
    return new Response(JSON.stringify({ status: 'success', url }), {
      status: 200,
    })
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'An error occurred while processing your request.',
      }),
      { status: 500 }
    )
  }
}

function createWhatsAppUrl(whatsappNumber, message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}
