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
  const [stage, setStage] = useState(0);
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
        {(stage===0) ? <ChooseDate error={dateError} dates={dates} setStage={setStage}/> : <ChooseActivity />}
      </div>
  );
};

function ChooseDate(props) {
  console.log(props.error);
  return(
    props.error !== 0 ?
      <div Style='width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: #8E8E8E; text-align: center;'>
        {props.error === 402 ? <a>Você precisa ter confirmado pagamento antes <br/> de fazer a escolha de atividades</a>: 
          props.error === 403 ? <a>Sua modalidade de ingresso não necessita escolher <br/> atividade. Você terá acesso a todas as atividades.</a>:
            <a>Ainda não há atividades para esse evento.</a>}
      </div> :
      
      <div Style='margin-top: 36px'>
        <a Style='font-size: 20px; color: #8E8E8E;'>Primeiro, filtre pelo dia do evento</a>

        <div Style='display: flex; margin-top: 23px;'>
          {props.dates.map((date, i) => (
            <DateButton onClick={props.setStage(1)} key={i}> {date} </DateButton>
          ))}
        </div>
      </div>

  );
}

function ChooseActivity(props) {
  return 'stage1';
}
