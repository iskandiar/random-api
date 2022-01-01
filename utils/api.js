const FUNCTION_PATH = '/.netlify/functions/random'

const getUrl = headers => {
  const host = process.env.FUNCTION_HOST || `https://${headers.host}`

  return host + FUNCTION_PATH
}

export const createRequest = async (req, res, type) => {
  const searchParams = new URLSearchParams({
    ...req.query,
    type
  });

  const url = getUrl(req.headers)
  const response = await fetch(url + "?" + searchParams.toString())
  const payload = await response.json()

  if (req.query.format === 'json') {
    res.status(response.status).json(payload)
  }

  res.status(response.status).send(payload.rawResult)
}
