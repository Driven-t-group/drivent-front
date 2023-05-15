import api from './api';

export async function createBooking(body, token) {
  return await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export async function getBooking(token) {
  return await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export async function updateBooking(token, bookingId, roomId) {
  return await api.put(`/booking/${bookingId}`, { roomId }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
