import * as hotelsApi from '../../services/hotelsApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useHotelsWithRoom() {
  const token = useToken();
  const {
    data: hotelsWithRooms,
    error: errorHotelsRooms,
    loading: loaddingHotelsRooms,
    act: getHotelsRooms
  } = useAsync((id) => hotelsApi.getHotelsWithRooms(token, id), false);
  return {
    hotelsWithRooms,
    errorHotelsRooms,
    loaddingHotelsRooms,
    getHotelsRooms
  };
}
