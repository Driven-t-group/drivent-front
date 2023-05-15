import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useToken from '../../../hooks/useToken';
import ChooseDate from '../../../components/Dashboard/Activity/ChooseDate';
import useActivityDate from '../../../hooks/api/useActivityDate';
import LocationContainer from '../../../components/Dashboard/Activity/LocationContainer';
import useActivityByDate from '../../../hooks/api/useActivityByDate';

export default function Activities() {
  const [dateError, setDateError] = useState(0); // 0 = no error, 402 = no payment, 403 = remote ticket
  const [chosenDate, setChosenDate] = useState(''); // 'yyyy-mm-dd'

  const {
    dates,
    datesLoading,
    datesError,
    getDates
  } = useActivityDate();

  const {
    activity,
    activitytLoading,
    activityError,
    getActivity
  } = useActivityByDate();

  return(
    (datesLoading) ? 'Carregando...' :
      <div Style='height: 100%;'>
        <a Style='font-size: 34px;'>Escolha de atividades</a>
        <ChooseDate error={dateError} dates={dates.data} chosenDate={chosenDate} getActivity={getActivity} setChosenDate={setChosenDate}/>
        {(chosenDate === '') ? <div></div> :
          <div Style='margin-top: 25px; display: flex; justify-content: space-around; padding: 35px;'>
            <LocationContainer key={0} title='Auditório Principal' location='Principal' activities={activity}/>
            <LocationContainer key={1} title='Auditório Lateral' location='Lateral' activities={activity}/>
            <LocationContainer key={2} title='Sala de Workshop' location='Workshop' activities={activity}/>
          </div>
        }
      </div>
  );
};
