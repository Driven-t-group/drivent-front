import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function useProcessPayment() {
  const token = useToken();

  const {
    loading: loadingPRocessPayment,
    error: processPaymentError,
    act: processPayment
  } = useAsync((ticketId, cardData) => paymentApi.processPayment(token, ticketId, cardData), false);

  return {
    loadingPRocessPayment,
    processPaymentError,
    processPayment,    
  };
}
