export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const q = query.q as string

    console.log('[API Route] Query received:', q)

    if (!q) {
      return {
        success: false,
        message: 'Query parameter "q" is required'
      }
    }

    const url = `https://montoit-api.onrender.com/api/autocomplete?q=${encodeURIComponent(q)}`
    console.log('[API Route] Fetching from:', url)

    const response = await fetch(url)
    const data = await response.json()

    console.log('[API Route] Response:', data)
    return data
  } catch (error) {
    console.error('[API Route] Error:', error)
    return {
      success: false,
      message: 'Failed to fetch results',
      error: String(error)
    }
  }
})
