import useAsync from '../useAsync';
import useToken from '../useToken';
import * as bookingApi from '../../services/bookingApi';

export default function useUpdateBooking() {
  const token = useToken();

  const {
    data: bookingData,
    error: errorUpdateBooking,
    loading: loadingUpdateBooking,
    act: updateBooking
  } = useAsync((bookingId, roomId) => bookingApi.updateBooking(token, bookingId, roomId), false);
  return {
    bookingData,
    errorUpdateBooking,
    loadingUpdateBooking,
    updateBooking
  };
};
