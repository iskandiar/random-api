const { getRandom } = require('./utils/random')

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

const formatResponse = ({result, rawResult, format}) => ({
  statusCode: 200,
  body: JSON.stringify({ 
    result,
    ...(format !== "json" ? { rawResult } : {})
  })
})

exports.handler = async function (event, _context) {
  // type=list|number|dice|weekday|date|uuid

  const { type, format } = event.queryStringParameters

  if(type === 'item') {
    const { list, pick } = event.queryStringParameters
    const result = itemHandler(list, parseInt(pick))
    
    return formatResponse({result, rawResult: result.join(", "), format})
  }

  if (type === 'dice') {
    const result = getRandom(1, 6)
    return formatResponse(result, result, format)
  }


  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" })
  };
}

