import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketsApi from '../../services/ticketsApi';

export default function useTicketsTypes() {
  const token = useToken();

  const {
    data: ticketsTypes,
    loading: ticketsTypesLoading,
    error: ticketsTypesError,
    act: getTicketsTypes
  } = useAsync(() => ticketsApi.getTicketsByTypes(token));

  return {
    ticketsTypes,
    ticketsTypesLoading,
    ticketsTypesError,
    getTicketsTypes
  };
}
