import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketsApi from '../../services/ticketsApi';

export default function useSaveTicket() {
  const token = useToken();

  const {
    data: saveTicket,
    loading: saveTicketLoading,
    error: errorSaveTicket,
    act: createTicket
  } = useAsync((ticketTypeId) => ticketsApi.createTicket(token, ticketTypeId), false);

  return {
    saveTicket,
    saveTicketLoading,
    errorSaveTicket,
    createTicket
  };
}
