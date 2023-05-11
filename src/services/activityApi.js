import api from './api';

export async function getDates(token) {
  const response = await api.get('/activity/dates', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function getByDate(token, date) {
  const response = await api.get('/activity/dates/' + date, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function subscribe(token, activityId) {
  const response = await api.post('/activity/subscribe/' + activityId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
