import EventItem from './EventItem';
import css from './EventList.module.css';

export default function EventList(props) {
  const { items } = props;
  return (
    <ul className={css.list}>
      {items.map((el) => (
        <EventItem key={el.id} item={el} />
      ))}
    </ul>
  );
}
