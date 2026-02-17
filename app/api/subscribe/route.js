export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 })
    }

    const rawKey = process.env.GOOGLE_PRIVATE_KEY
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
    const sheetId = process.env.GOOGLE_SHEET_ID

    if (!rawKey || !clientEmail || !sheetId) {
      console.error('Missing env vars')
      return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500 })
    }

    // Handle all possible newline encodings Vercel might use
    const privateKey = rawKey
      .replace(/\\n/g, '\n')
      .replace(/\\\\n/g, '\n')

    const token = await getAccessToken(clientEmail, privateKey)

    const range = 'Sheet1!A:B'
    const values = [[email, new Date().toISOString()]]

    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values }),
      }
    )

    if (!res.ok) {
      const err = await res.text()
      console.error('Sheets API error:', err)
      return new Response(JSON.stringify({ error: 'Failed to save' }), { status: 500 })
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error('Subscribe error:', err)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}

async function getAccessToken(clientEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }

  const jwt = await signJWT(payload, privateKey)

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  })

  const data = await res.json()
  if (!data.access_token) throw new Error('Failed to get access token: ' + JSON.stringify(data))
  return data.access_token
}

async function signJWT(payload, privateKeyPem) {
  const header = { alg: 'RS256', typ: 'JWT' }

  const enc = (obj) =>
    btoa(JSON.stringify(obj))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')

  const signingInput = `${enc(header)}.${enc(payload)}`

  // Strip PEM headers and all whitespace
  const keyData = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\s+/g, '')
    .trim()

  const binaryKey = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0))

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(signingInput)
  )

  const sigBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  return `${signingInput}.${sigBase64}`
}
