import { createRequest } from '@utils/api'

const availableTypes = [
  'dice', 'item', 'number', 'uuid'
]

export default async function handler(req, res) {
  const { typeOrId } = req.query

  if (availableTypes.includes(typeOrId)) {
    await createRequest(req, res, {type: typeOrId})
  } else if (typeOrId) {
    await createRequest(req, res, {id: typeOrId})
  }
}
