import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useActivityDate() {
  const token = useToken();

  const {
    data: activity,
    loading: activitytLoading,
    error: activityError,
    act: getActivity
  } = useAsync(() => activityApi.getDates(token));

  return {
    activity,
    activitytLoading,
    activityError,
    getActivity
  };
};
