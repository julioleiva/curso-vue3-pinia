import { ref } from 'vue'

export default async function useFetch(url, options = {}) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  loading.value = true
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
    const json = await response.json()
    data.value = json
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }

  return {
    data,
    error,
    loading
  }
}
