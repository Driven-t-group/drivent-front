import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useActivityDate(activityId) {
  const token = useToken();

  const {
    data: activity,
    loading: activitytLoading,
    error: activityError,
    act: postActivity
  } = useAsync(() => activityApi.subscribe(token, activityId));

  return {
    activity,
    activitytLoading,
    activityError,
    postActivity
  };
};
