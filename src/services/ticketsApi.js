import api from './api';

export async function getTicketsByTypes(token) {
  const response = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function postPaymentProcess(token) {
  const response = await api.get('/tickets/process', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
