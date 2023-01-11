import { useFetch } from "@hooks";
import { useQuery } from "react-query";
import {
  WidgetStaffQuery,
  WidgetStaff,
  WidgetDateQuery,
  WidgetSchedule,
} from "@jamalsoueidan/booking-shopify-backend.mongo.types";

export const useWidgetStaff = ({ productId }: WidgetStaffQuery) => {
  const { get, mutate } = useFetch();

  const { data } = useQuery<ApiResponse<Array<WidgetStaff>>>({
    queryKey: ["widget", "staff", productId],
    queryFn: async () => {
      mutate(["widget", "availability"]);
      return get(`widget/staff?productId=${productId}`);
    },
    enabled: productId > 0,
  });

  return { data: data?.payload };
};

export const useWidgetDate = ({
  staff,
  productId,
  start,
  end,
}: WidgetDateQuery) => {
  const { get } = useFetch();
  const { data } = useQuery<ApiResponse<Array<WidgetSchedule>>>({
    queryKey: ["widget", "availability", staff, start, end, productId],
    queryFn: () =>
      get(
        `widget/availability?productId=${productId}&start=${start}&end=${end}${
          staff ? `&staff=${staff}` : ""
        }`
      ),
    enabled: !!staff && !!productId && !!start && !!end,
  });

  return { data: data?.payload };
};
