import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useToken from '../../../hooks/useToken';
import DateButton from '../../../components/Dashboard/Activity/DateButton';
import enter_icon from '../../../assets/images/enter_icon.png';
import check_icon from '../../../assets/images/check_icon.png';
import close_icon from '../../../assets/images/close_icon.png';

// import useActivityDate from '../../../hooks/api/useActivityDate';
// import useActivityByDate from '../../../hooks/api/useActivityDate';
// import useSubscribeToActivity from '../../../hooks/api/useSubscribeToActivity';
import * as activityApi from '../../../services/activityApi';
import { set } from 'date-fns';

export default function Activities() {
  const [loading, setLoading] = useState(true);
  const [dateError, setDateError] = useState(0); // 0 = no error, 402 = no payment, 403 = remote ticket
  const [dates, setDates] = useState([]);
  const [chosenDate, setChosenDate] = useState(''); // 'yyyy-mm-dd'
  const token = useToken();

  useEffect(() => {
    activityApi.getDates(token)
      .then((response) => {
        setLoading(false);
        setDates(response.data);
      })
      .catch((error) => {
        setDateError(error.response.status);
        setLoading(false);
      });
  }, []);

  return(
    (loading) ? 'Carregando...' :
      <div Style='height: 100%;'>
        <a Style='font-size: 34px;'>Escolha de atividades</a>
        <ChooseDate error={dateError} dates={dates} chosenDate={chosenDate} setChosenDate={setChosenDate}/>
        {(chosenDate === '') ? <div></div> : <ChooseActivity date={chosenDate}/>}
      </div>
  );
};

function ChooseDate(props) {
  return(
    props.error !== 0 ?
      <div Style='width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: #8E8E8E; text-align: center;'>
        {props.error === 402 ? <a>Você precisa ter confirmado pagamento antes <br/> de fazer a escolha de atividades</a>: 
          props.error === 403 ? <a>Sua modalidade de ingresso não necessita escolher <br/> atividade. Você terá acesso a todas as atividades.</a>:
            <a>Ainda não há atividades para esse evento.</a>}
      </div> :
      
      <div Style='margin-top: 36px'>
        {props.chosenDate? <div></div> : <a Style='font-size: 20px; color: #8E8E8E;'>Primeiro, filtre pelo dia do evento</a>}

        <div Style='display: flex; margin-top: 23px;'>
          {props.dates.map((date, i) => (
            <DateButton selected={props.chosenDate===date} onClick={() => props.setChosenDate(date)} key={i}> {date} </DateButton>
          ))}
        </div>
      </div>

  );
}

function ChooseActivity(props) {
  const token = useToken();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    activityApi.getByDate(token, props.date)
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, props.date);

  return (
    <div Style='margin-top: 25px; display: flex; justify-content: space-around; padding: 35px;'>
      <LocationContainer key={0} title='Auditório Principal' location='Principal' activities={activities}/>
      <LocationContainer key={1} title='Auditório Lateral' location='Lateral' activities={activities}/>
      <LocationContainer key={2} title='Sala de Workshop' location='Workshop' activities={activities}/>
    </div>
  );
}

function LocationContainer(props) {
  return(
    <div Style='text-align: center;'>
      <a Style='font-size: 20px; color: #8E8E8E; font-weight: 400;'>{props.title}</a>
      <div Style='display:flex; justify-content: center;'>
        <div Style='margin-top: 13px; border: 1px solid #D7D7D7; width: 18rem; min-height: 392px; padding: 14px;'>
          {props.activities.map((activity, i) => (
            activity.location === props.location ?
              <ActivityCard
                key={i}
                title={activity.title}
                init={activity.startsAt}
                end={activity.endsAt}
                id={activity.id}
                vacancies={activity.capacity - activity._count.Subscription}
              /> : <div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActivityCard(props) {
  const initTime = props.init.substring(11, 16);
  const endTime = props.end.substring(11, 16);

  const time = initTime+' - '+endTime;

  const initDate = new Date(props.init);
  const endDate = new Date(props.end);

  const duration = Math.abs(initDate - endDate) / 36e5;
  const height = 80 * duration;

  return(
    <div Style={`background: #F1F1F1; border-radius:5px; display:flex; justify-content: space-between; height: ${height}px; margin-bottom: 14px; padding: 12px;`}>
      <div Style='font-size: 12px; text-align: left; color: #343434;'>
        <div Style='font-weight: 700;'>{props.title}</div>
        <div Style='margin-top: 6px;'>{time}</div>
      </div>
      <div Style='width: 66px; display: flex;'>
        <div Style='height: 100%; width: 2px; background: #CFCFCF;'/>
        {props.vacancies === 0 ?
          <div Style='width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-left: 12px;'>
            <img src={close_icon} alt='enter' Style='cursor: pointer; height: 22px;'/>
            <div Style='color: red; font-size: 9px;'>Esgotado</div>
          </div> :
          <div Style='width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-left: 12px;'>
            <img src={enter_icon} alt='enter' Style='cursor: pointer; height: 22px;'/>
            <div Style='color: green; font-size: 9px;'>{props.vacancies} vagas</div>
          </div>
        }
      </div>
    </div>
  );
}
