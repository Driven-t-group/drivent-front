import api from './api';

export async function processPayment(token, ticketId, cardData) {
  console.log(ticketId, cardData);
  return await api.post('/payments/process', { ticketId, cardData }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
