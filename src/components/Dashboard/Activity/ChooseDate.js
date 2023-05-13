import useActivityByDate from '../../../hooks/api/useActivityByDate';
import DateButton from '../../../components/Dashboard/Activity/DateButton';

export default function ChooseDate(props) {
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
