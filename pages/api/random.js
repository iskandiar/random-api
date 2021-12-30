const FUNCTION_PATH = '/.netlify/functions/random'

const getUrl= headers => {
  const host = process.env.FUNCTION_HOST || `https://${headers.host}`

  return host + FUNCTION_PATH
}

export default async function handler(req, res) {
  const url = getUrl(req.headers)
  const response = await fetch(url)
  const payload = await response.json()

  res.status(200).send(payload)
}
