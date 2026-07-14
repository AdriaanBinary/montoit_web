export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const q = query.q as string

    if (!q) {
      return {
        success: false,
        message: 'Query parameter "q" is required'
      }
    }

    const url = `https://montoit-api.onrender.com/api/autocomplete?q=${encodeURIComponent(q)}`

    const response = await fetch(url)
    const data = await response.json()

    return data
  } catch (error) {
    console.error('API Error:', error)
    return {
      success: false,
      message: 'Failed to fetch results'
    }
  }
})
