import { useQuery } from "react-query";
import { useFetch } from "../hooks/useFetch";

export const useStaff = () => {
  const { get } = useFetch();
  const { data, isLoading } = useQuery<ApiResponse<Staff>>({
    queryKey: ["user"],
    queryFn: () => get(`current-staff`),
  });

  return {
    data: data?.payload,
    isLoading,
  };
};

export const useUserSetting = () => {
  const { get } = useFetch();
  const { data, isLoading } = useQuery<ApiResponse<SettingsResponse>>({
    queryKey: ["user"],
    queryFn: () => get(`settings`),
  });

  return {
    data: data?.payload,
    isLoading,
  };
};