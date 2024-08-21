import { useQuery, useQueryClient } from "react-query";
import { ApiService } from "services/api";

interface DataFetchOptions {
  endpoint: string;
  queryKey: string;
  method: "get" | "getSilent" | "post" | "delete";
  enabled?: boolean;
}

export const useDataFetch = <T, U = unknown>({
  endpoint,
  queryKey,
  method,
  enabled = true,
}: DataFetchOptions) => {
  const queryClient = useQueryClient();

  const fetchData = async (): Promise<T> => {
    switch (method) {
      case "get":
        return (await ApiService.get<T>(endpoint)).data;
      case "getSilent":
        return (await ApiService.getSilent<T>(endpoint)).data;
      case "post":
        return (await ApiService.post<T, U>(endpoint)).data;
      case "delete":
        return (await ApiService.delete<T>(endpoint)).data;
    }
  };

  const { data, error, isLoading, isFetching } = useQuery<T, Error>(queryKey, fetchData, {
    enabled,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  const revalidateData = () => {
    queryClient.invalidateQueries(queryKey);
  };

  const emptyCache = () => {
    queryClient.removeQueries(queryKey);
  };

  const clear = () => {
    queryClient.clear();
  };

  return { data, error, isLoading, isFetching, revalidateData, emptyCache, clear };
};
