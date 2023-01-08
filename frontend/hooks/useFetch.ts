import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import { useQueryClient } from "react-query";

let shop = "testeriphone.myshopify.com";
if (import.meta.env.PROD) {
  shop = "bysistersdk.myshopify.com";
}

export const useFetch = () => {
  const queryClient = useQueryClient();

  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  const put = useCallback(
    async (url: string, body?: any) => {
      const response = await axios.put(`/api/${url}?shop=${shop}`, body);
      return response.data;
    },
    [axios]
  );

  const destroy = useCallback(
    async (url: string) => {
      const response = await axios.delete(`/api/${url}?shop=${shop}`);
      return response.data;
    },
    [axios]
  );

  const post = useCallback(
    async <T>(url: string, body?: any): Promise<T> => {
      try {
        const response = await axios.post<any, AxiosResponse<T>>(
          `/api/${url}?shop=${shop}`,
          body
        );
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    [axios]
  );

  const get = useCallback(
    async <T>(url: string): Promise<T> => {
      try {
        const response = await axios.get<any, AxiosResponse<T>>(
          `/api/${url}?shop=${shop}`
        );
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    [axios]
  );

  return {
    fetch,
    put,
    post,
    destroy,
    get,
    mutate: (key: any) => queryClient.invalidateQueries(key),
  };
};
