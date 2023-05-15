import api from './api';

export async function getTicket(token) {
  return await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
