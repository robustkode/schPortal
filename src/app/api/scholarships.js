import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";

export const getLatest = () => {
  //   return apiClient.get('/latest');
  setTimeout(() => {
    return "oops";
  }, 300);
};                                                                                                                                                                                                                                                                                                      

export const useLatest = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["latest-scholar"],
    queryFn: () => getAuthUser(),
  });

  return { data, isLoading };
};
