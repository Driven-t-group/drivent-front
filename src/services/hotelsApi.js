import api from './api';

export async function hotelsApi(token) {
  return await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getHotelsWithRooms(token, id) {
  return await api.get(`/hotels/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
