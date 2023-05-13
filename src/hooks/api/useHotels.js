import * as hotelsApi from '../../services/hotelsApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useHotels() {
  const token = useToken();
  const {
    data: hotels,
    error: errorHotels,
    loading: loaddingHotels,
    act: getHotels
  } = useAsync(() => hotelsApi.hotelsApi(token));
  return {
    hotels,
    loaddingHotels,
    errorHotels,
    getHotels
  };
}
