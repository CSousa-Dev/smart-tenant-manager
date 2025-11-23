import { useState, useEffect } from 'react'
import { ApiResponse, ApiError } from '@/types'

interface UseApiOptions {
  immediate?: boolean
}

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: () => Promise<void>
  reset: () => void
}

/**
 * Hook customizado para fazer requisições à API
 * 
 * @example
 * const { data, loading, error, execute } = useApi(() => api.get('/endpoint'))
 */
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = { immediate: false }
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    
    try {
      const response = await apiCall()
      setState({
        data: response.data ?? null,
        loading: false,
        error: null,
      })
    } catch (err) {
      setState({
        data: null,
        loading: false,
        error: err as ApiError,
      })
    }
  }

  const reset = () => {
    setState({
      data: null,
      loading: false,
      error: null,
    })
  }

  useEffect(() => {
    if (options.immediate) {
      execute()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    ...state,
    execute,
    reset,
  }
}

