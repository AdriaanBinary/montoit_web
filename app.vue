<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden">
      <!-- Search Header -->
      <div class="p-6 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Search Location</h1>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Type at least 2 characters..."
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
          @input="handleSearch"
        >
      </div>

      <!-- Results Container -->
      <div class="max-h-96 overflow-y-auto">
        <!-- Search Hint -->
        <div v-if="!searchQuery || searchQuery.length < 2" class="p-4 text-center bg-gray-50 text-gray-500 text-sm">
          Type to search...
        </div>

        <!-- Loading State -->
        <div v-else-if="loading" class="p-6 text-center text-purple-600">
          Loading...
        </div>

        <!-- Results -->
        <div v-else-if="results.length > 0">
          <div 
            v-for="result in results" 
            :key="result.id"
            class="px-6 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors flex justify-between items-center"
          >
            <span class="text-gray-900 font-medium">{{ result.name }}</span>
            <span class="ml-3 px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold uppercase whitespace-nowrap">
              {{ result.type }}
            </span>
          </div>
        </div>

        <!-- No Results -->
        <div v-else class="p-6 text-center text-gray-500 text-sm">
          No results found
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

interface SearchResult {
  name: string
  type: string
  id: number
}

const searchQuery = ref('')
const results = ref<SearchResult[]>([])
const loading = ref(false)
let debounceTimer: NodeJS.Timeout | null = null
const DEBOUNCE_TIME = 100
const MIN_CHARS = 2
const API_BASE_URL = 'https://montoit-api.onrender.com/api/autocomplete'

const handleSearch = () => {
  clearTimeout(debounceTimer!)

  if (searchQuery.value.length < MIN_CHARS) {
    results.value = []
    return
  }

  debounceTimer = setTimeout(() => {
    fetchResults()
  }, DEBOUNCE_TIME)
}

const fetchResults = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_BASE_URL}?q=${encodeURIComponent(searchQuery.value)}`)
    
    const data = response.data
    
    if (data.success && data.results) {
      results.value = data.results
    } else {
      results.value = []
    }
  } catch (error) {
    console.error('Error fetching results:', error)
    results.value = []
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Scoped styles handled by Tailwind CSS */
</style>
