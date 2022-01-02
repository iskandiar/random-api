const { getRandom, getRandomUuid } = require('./utils/random')
const { addRecord, getRecord } = require('./utils/db')

const generateRange = len => Array.from(Array(len).keys())

const getRandomItem = (list) => {
  const item = list[getRandom(0, list.length - 1)]

  return [item, list.filter(_item => item !== _item)]
}

const itemHandler = (rawList, pick = 1) => {
  const list = rawList.split(/[;\|,]/)

  return generateRange(pick).reduce((acc, _item) => {
    if(acc.list.length === 0) return acc

    const [resultItem, newList] = getRandomItem(acc.list)

    return {
      list: newList,
      results: [...acc.results, resultItem]
    }
  }, {list, results: []}).results
}

const formatResponse = ({ result, rawResult, format, requestId}) => ({
  statusCode: 200,
  body: JSON.stringify({ 
    result,
    ...(requestId ? { requestId } : {}),
    ...(format !== "json" ? { rawResult: rawResult || result } : { }),
    format
  })
})

const getQueryStrings = async (queryStringParameters) => {
  const { id } = queryStringParameters

  if (!id) return queryStringParameters

  const record = await getRecord(id)
  return JSON.parse(record.search)
}

const getRequestId = async ({ save, ...restParams }) => {
  if (!save) return null

  const reqId = await addRecord(JSON.stringify(restParams))

  return reqId
}

exports.handler = async function (event, _context) {
  const queryStrings = await getQueryStrings(event.queryStringParameters)
  console.log('queryStrings', queryStrings)
  const { type, format } = queryStrings

  const requestId = await getRequestId(queryStrings)
  // if (save === 'true') {
  //   const { save, ...restParams } = queryStrings

  //   const reqId = await addRecord(JSON.stringify(restParams))

  //   // TO-DO return in response as href
  //   // console.log('id', id)

  // }

  if(type === 'item') {
    const { list, pick } = queryStrings
    const result = itemHandler(list, parseInt(pick))

    return formatResponse({ result, rawResult: result.join(", "), format, requestId})
  }

  if (type === 'dice') {
    const { rolls = 1 } = queryStrings
    const result = generateRange(parseInt(rolls)).map(() => getRandom(1, 6))
    return formatResponse({ result, rawResult: result.join(", "), format, requestId})
  }

  if (type === 'number') {
    const { min = 0, max = 100 } = queryStrings
    const result = getRandom(min, max)

    return formatResponse({ result, format, requestId})
  }

  if (type === 'uuid') {
    const result = getRandomUuid()

    return formatResponse({ result, format, requestId})
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" })
  };
}

