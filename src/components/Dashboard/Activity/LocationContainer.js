import ActivityCard from './ActivityCard';

export default function LocationContainer(props) {
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
                subscribed={activity.subscribed}
              /> : <div></div>
          ))}
        </div>
      </div>
    </div>
  );
}
