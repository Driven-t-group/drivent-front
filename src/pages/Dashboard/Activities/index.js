import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useToken from '../../../hooks/useToken';
import DateButton from '../../../components/Dashboard/Activity/DateButton';

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
        {(chosenDate === '') ? <div></div> : <ChooseActivity />}
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
            <DateButton selected={props.chosenDate===date} onClick={props.setChosenDate(date)} key={i}> {date} </DateButton>
          ))}
        </div>
      </div>

  );
}

function ChooseActivity(props) {
  return (
    <div Style='margin-top: 25px; display: flex; justify-content: space-around; padding: 35px;'>
      <LocationContainer title='Auditório Principal'/>
      <LocationContainer title='Auditório Lateral'/>
      <LocationContainer title='Sala de Workshop'/>
    </div>
  );
}

function LocationContainer(props) {
  return(
    <div Style='text-align: center;'>
      <a Style='font-size: 20px; color: #8E8E8E; font-weight: 400;'>{props.title}</a>
      <div Style='display:flex; justify-content: center;'>
        <div Style='margin-top: 13px; border: 1px solid #D7D7D7; width: 18rem; min-height: 392px;'>
          <ActivityCard title='soavekkk' init='2023-05-12T01:00:21.697Z' end='2023-05-12T01:00:21.697Z' vacancies='69'/>
        </div>
      </div>
    </div>
  );
}

function ActivityCard(props) {
  const time = '11:00 - 12:00';
  const height = '100px';

  return(
    <div Style={`background: #F1F1F1; border-radius:5px; display:flex; justify-content: space-between; height: ${height};`}>
      <div>
        <div>{props.title}</div>
        <div>{time}</div>
      </div>
      <div Style='width: 66px; display: flex;'>
        <div Style='height: 100%; width: 1px; display: flex;'>
          <div Style='width: 1px; background: #CFCFCF; heigth: 80%;'/>
        </div>
        <div>{props.vacancies}</div>
      </div>
    </div>
  );
}
