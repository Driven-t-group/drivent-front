import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useActivityByDate(date) {
  const token = useToken();

  const {
    data: activity,
    loading: activitytLoading,
    error: activityError,
    act: getActivity
  } = useAsync((date) => activityApi.getByDate(token, date), false);

  return {
    activity,
    activitytLoading,
    activityError,
    getActivity
  };
};
