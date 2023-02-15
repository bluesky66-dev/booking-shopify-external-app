import { useFetch } from "@hooks/useFetch";
import {
  ApiResponse,
  Booking,
  BookingServiceCreateProps,
  BookingServiceGetAllProps,
  BookingServiceUpdateProps,
} from "@jamalsoueidan/bsb.types";
import { useCallback } from "react";
import { useQuery } from "react-query";

export const useBookings = ({ start, end, staff }: BookingServiceGetAllProps) => {
  const { get } = useFetch();

  const { data, isLoading } = useQuery<ApiResponse<Array<Booking>>>({
    enabled: !!start && !!end,
    queryFn: () => get(`bookings?start=${start.toJSON()}&end=${end.toJSON()}${staff ? "&staff=" + staff : ""}`),
    queryKey: ["bookings", { end, staff, start }],
  });

  return {
    data: data?.payload,
    isLoading,
  };
};

interface UseBookingGetProps {
  id: string;
}

export const useBookingGet = ({ id }: UseBookingGetProps) => {
  const { get } = useFetch();

  const { data } = useQuery<ApiResponse<Booking>>({
    queryFn: () => get(`bookings/${id}`),
    queryKey: ["booking", id],
  });

  return {
    data: data?.payload,
  };
};

export const useBookingUpdate = ({ id }: { id: BookingServiceUpdateProps["query"]["_id"] }) => {
  const { put, mutate } = useFetch();

  const update = useCallback(
    async (body: BookingServiceUpdateProps["body"]) => {
      await put("bookings/" + id, body);
      await mutate(["bookings"]);
      await mutate(["booking", id]);
      await mutate(["widget", "availability"]);
    },
    [put, id, mutate],
  );

  return {
    update,
  };
};

export const useBookingCreate = () => {
  const { post, mutate } = useFetch();

  const create = useCallback(
    async (body: BookingServiceCreateProps) => {
      await post("bookings", body);
      await mutate(["bookings"]);
      await mutate(["widget", "availability"]);
    },
    [post, mutate],
  );

  return {
    create,
  };
};
