import useAsync from '../useAsync';

import * as ticketServices from '../../services/ticketApi';
import useToken from '../useToken';

export default function useTicket() {
  const token = useToken();
  const {
    data: ticket,
    loading: ticketLoadding,
    error: ticketError,
    act: getTicket
  } = useAsync(() => ticketServices.getTicket(token));

  return {
    ticket,
    ticketLoadding,
    ticketError,
    getTicket
  };
}
