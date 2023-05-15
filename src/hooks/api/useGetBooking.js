import useAsync from '../useAsync';
import useToken from '../useToken';
import * as bookingApi from '../../services/bookingApi';

export default function useGetBooking() {
  const token = useToken();

  const {
    data: bookingData,
    error: errorBookingData,
    loading: loadingBookingData,
    act: getBooking
  } = useAsync(() => bookingApi.getBooking(token), false);
  return {
    bookingData,
    errorBookingData,
    loadingBookingData,
    getBooking
  };
};
