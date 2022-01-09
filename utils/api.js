const FUNCTION_PATH = '/.netlify/functions/random'

const getFunctionRequestUrl = () => process.env.FUNCTION_HOST + FUNCTION_PATH

const getAppUrl = (headers, id) => `http://${headers.host}/api/random/${id}`

const formatPayload = (headers, {requestId,  format, ...payload}) => ({
  ...payload,
  ...(requestId ? { url: getAppUrl(headers, requestId)} : {})
})

export const createRequest = async (req, res, params) => {
  const searchParams = new URLSearchParams({
    ...req.query,
    ...params
  });
  const url = getFunctionRequestUrl()
  const response = await fetch(url + "?" + searchParams.toString())
  const payload = await response.json()
  const formattedPayload = formatPayload(req.headers, payload)

  if (payload.format === 'json') {
    res.status(response.status).json(formattedPayload)
  }

  res.status(response.status).send(formattedPayload.rawResult)
}
