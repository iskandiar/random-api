const { getRandom } = require('./utils/random')

const getRandomItem = (list) => {
  const splittedList = list.split(/[;\|,]/)

  return splittedList[getRandom(0, splittedList.length - 1)]
}

const formatResponse = (result, rawResult, format) => ({
  statusCode: 200,
  body: JSON.stringify({ 
    result,
    ...(format !== "json" ? { rawResult } : {})
  })
})

exports.handler = async function (event, _context) {
  // type=list|number|dice|weekday|date|uuid

  const { type, list, format } = event.queryStringParameters

  if(type === 'item') {
    const result = getRandomItem(list)
    return formatResponse(result, result, format)
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

