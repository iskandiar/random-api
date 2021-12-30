const FUNCTION_PATH = '/.netlify/functions/random'

const getUrl = headers => {
  const host = process.env.FUNCTION_HOST || `https://${headers.host}`

  return host + FUNCTION_PATH
}

export default async function handler(req, res) {
  const searchParams = new URLSearchParams({
    ...req.query,
    type: 'list'
  });

  const url = getUrl(req.headers)
  const response = await fetch(url + "?" + searchParams.toString())

  const payload = await response.json()

  if (req.query.format === 'json') {
    res.status(200).json(payload)
  }

  res.status(200).send(payload.rawResult)
}
