import useAsync from '../useAsync';
import useToken from '../useToken';
import * as bookingApi from '../../services/bookingApi';

export default function useBooking() {
  const token = useToken();

  const {
    data: booking,
    error: errorBooking,
    loading: loadingBooking,
    act: createBooking
  } = useAsync((body) => bookingApi.createBooking(body, token), false);
  return {
    booking,
    errorBooking,
    loadingBooking,
    createBooking
  };
};
