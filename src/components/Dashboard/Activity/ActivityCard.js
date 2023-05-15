import useSubscribeToActivity from '../../../hooks/api/useSubscribeToActivity';
import enter_icon from '../../../assets/images/enter_icon.png';
import check_icon from '../../../assets/images/check_icon.png';
import close_icon from '../../../assets/images/close_icon.png';

export default function ActivityCard(props) {
  // function subscribe(activityId) {
  //   activityApi.subscribe(token, activityId)
  //   .then((response) => {
  //     toast.success('Inscrição realizada com sucesso!');
  //     window.location.reload();
  //   })
  //   .catch((error) => {
  //     toast.error('Erro ao realizar inscrição!');
  //     console.log(error.response);
  //   });
  // }

  const {
    postActivity
  } = useSubscribeToActivity(props.id);
  
  const initTime = props.init.substring(11, 16);
  const endTime = props.end.substring(11, 16);
  const time = initTime+' - '+endTime;
  const initDate = new Date(props.init);
  const endDate = new Date(props.end);
  const duration = Math.abs(initDate - endDate) / 36e5;
  const height = 80 * duration;
  
  return(
    <div Style={`background: ${props.subscribed?'#D0FFDB':'#F1F1F1'}; border-radius:5px; display:flex; justify-content: space-between; height: ${height}px; margin-bottom: 14px; padding: 12px;`}>
      <div Style='font-size: 12px; text-align: left; color: #343434;'>
        <div Style='font-weight: 700;'>{props.title}</div>
        <div Style='margin-top: 6px;'>{time}</div>
      </div>
      <div Style='width: 66px; display: flex;'>
        <div Style='height: 100%; width: 2px; background: #CFCFCF;'/>
        {props.subscribed?
          <div Style='width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-left: 12px;'>
            <img src={check_icon} alt='enter' Style='cursor: pointer; height: 22px;'/>
            <div Style='color: green; font-size: 9px;'>Inscrito</div>
          </div> :
          props.vacancies === 0 ?
            <div Style='width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-left: 12px;'>
              <img src={close_icon} alt='enter' Style='cursor: pointer; height: 22px;'/>
              <div Style='color: red; font-size: 9px;'>Esgotado</div>
            </div> :
            <div Style='width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-left: 12px;'>
              <img src={enter_icon} alt='enter' Style='cursor: pointer; height: 22px;' onClick={postActivity}/>
              <div Style='color: green; font-size: 9px;'>{props.vacancies} vagas</div>
            </div>
        }
      </div>
    </div>
  );
}
