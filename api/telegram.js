const MAX_BODY_SIZE = 16_000

function readBody(request) {
  if (typeof request.body === 'string') return JSON.parse(request.body)
  return request.body ?? {}
}

function clean(value, maxLength) {
  return String(value ?? '').trim().slice(0, maxLength)
}

function field(label, value) {
  return `${label}:\n${value}`
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const contentLength = Number(request.headers['content-length'] ?? 0)
  if (contentLength > MAX_BODY_SIZE) {
    return response.status(413).json({ error: 'Request terlalu besar' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.error('Telegram environment variables are not configured')
    return response.status(500).json({ error: 'Layanan konsultasi belum siap' })
  }

  let body
  try {
    body = readBody(request)
  } catch {
    return response.status(400).json({ error: 'Data tidak valid' })
  }

  const lead = {
    name: clean(body.name, 100),
    business: clean(body.business, 120),
    contact: clean(body.contact, 120),
    industry: clean(body.industry, 80),
    plan: clean(body.plan, 60),
    moduleCount: clean(body.moduleCount, 10),
    modules: clean(body.modules, 2_000),
    total: clean(body.total, 80),
    pageUrl: clean(body.pageUrl, 300),
  }

  if (!lead.name || !lead.business || !lead.contact || !lead.industry) {
    return response.status(400).json({ error: 'Data wajib belum lengkap' })
  }

  const submittedAt = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Asia/Jakarta',
  }).format(new Date())

  const text = [
    'Permintaan Konsultasi / Pembelian Frayukti',
    field('Nama', lead.name),
    field('Bisnis', lead.business),
    field('Kontak', lead.contact),
    field('Bidang', lead.industry),
    field('Paket awal', lead.plan || '-'),
    field('Jumlah modul', lead.moduleCount || '-'),
    field('Pilihan modul', lead.modules || '-'),
    field('Total beli putus', lead.total || '-'),
    field('Dikirim', submittedAt),
    lead.pageUrl ? field('Sumber', lead.pageUrl) : '',
  ]
    .filter(Boolean)
    .join('\n\n')

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          disable_web_page_preview: true,
        }),
      },
    )

    if (!telegramResponse.ok) {
      console.error(`Telegram API returned ${telegramResponse.status}`)
      return response.status(502).json({ error: 'Pesan belum dapat dikirim' })
    }

    return response.status(200).json({ success: true })
  } catch {
    console.error('Telegram request failed')
    return response.status(502).json({ error: 'Pesan belum dapat dikirim' })
  }
}
