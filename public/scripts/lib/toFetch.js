const formatResponse = async (fetchObj, format) => {
  const formats = {
    text: async () => await fetchObj.text(),
    json: async () => await fetchObj.json()
  }
  return await formats[format] ? formats[format]() : formats.json()
}

const toFetch = async (url, format, fetchOptions) => {
  const fetching = await fetch(url, fetchOptions)
  const formattedResponse = await formatResponse(fetching, format)
  return { status: fetching.status, ok: fetching.ok, content: formattedResponse }
}
export default toFetch
