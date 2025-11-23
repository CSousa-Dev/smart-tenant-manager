import axios, { AxiosInstance, AxiosError } from 'axios'
import { ApiResponse, ApiError } from '@/types'

// Configure a URL base da sua API
const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:3020/api'

// Cria uma instância do axios com configurações padrão
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Interceptor para adicionar token de autenticação (se necessário)
apiClient.interceptors.request.use(
  (config) => {
    // Adicione aqui a lógica para incluir token de autenticação
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratamento de erros
apiClient.interceptors.response.use(
  (response) => {
    // Se a resposta tem success: false, tratar como erro
    const data = response.data as ApiResponse<unknown>;
    if (data && 'success' in data && !data.success) {
      const apiError: ApiError = {
        message: data.error?.message || 'Erro na requisição',
        code: data.error?.code || 'API_ERROR',
        details: data.error?.details,
      };
      return Promise.reject(apiError);
    }
    return response;
  },
  (error: AxiosError) => {
    // Tratar erros HTTP (400, 404, 500, etc)
    const responseData = error.response?.data as ApiResponse<unknown> | undefined;
    
    if (responseData && 'error' in responseData) {
      const apiError: ApiError = {
        message: responseData.error?.message || error.message || 'Erro desconhecido',
        code: responseData.error?.code || error.code || 'HTTP_ERROR',
        details: responseData.error?.details,
      };
      return Promise.reject(apiError);
    }
    
    const apiError: ApiError = {
      message: error.message || 'Erro desconhecido',
      code: error.code,
      details: error.response?.data,
    };
    return Promise.reject(apiError);
  }
)

// Funções auxiliares para requisições
export const api = {
  get: <T>(url: string) => 
    apiClient.get<ApiResponse<T>>(url).then((res) => res.data),
  
  post: <T>(url: string, data?: unknown) => 
    apiClient.post<ApiResponse<T>>(url, data).then((res) => res.data),
  
  put: <T>(url: string, data?: unknown) => 
    apiClient.put<ApiResponse<T>>(url, data).then((res) => res.data),
  
  delete: <T>(url: string) => 
    apiClient.delete<ApiResponse<T>>(url).then((res) => res.data),
  
  patch: <T>(url: string, data?: unknown) => 
    apiClient.patch<ApiResponse<T>>(url, data).then((res) => res.data),
}

export default apiClient

