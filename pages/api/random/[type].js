import { createRequest } from '@utils/api'

const availableTypes = [
  'dice', 'item', 'number', 'uuid'
]

export default async function handler(req, res) {
  const { type } = req.query

  if (availableTypes.includes(type)) {
    await createRequest(req, res, type)
  } else {
    res.status(400).json({
      error: "Type is not supported"
    })
  }
  
}
