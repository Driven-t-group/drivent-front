import api from './api';

export async function createBooking(body, token) {
  return await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
