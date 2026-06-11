import api from '@/lib/axios';
import { AxiosError } from 'axios';
import { ApiResponse, ApiError } from '@/types/api';

export const handleApiError = (error: any): ApiError => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    return {
      message: data?.message || error.message || 'An error occurred during the request',
      statusCode: error.response?.status,
      errors: data?.errors,
    };
  }
  return {
    message: error.message || 'An unexpected error occurred',
  };
};

export const getRequest = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await api.get<ApiResponse<T>>(url);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const postRequest = async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
  try {
    const response = await api.post<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const putRequest = async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
  try {
    const response = await api.put<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteRequest = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await api.delete<ApiResponse<T>>(url);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
