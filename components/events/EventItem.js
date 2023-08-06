import css from './EventItem.module.css';
import Button from '../ui/button';
import AddressIcon from '../icons/address-icon';
import DateIcon from '../icons/date-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

export default function EventItem(props) {
  const { id, title, location, date, image } = props.item;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;

  return (
    <li className={css.item}>
      <img src={image} alt={title + ' cover'} />
      <div className={css.content}>
        <div className={css.summary}>
          <h2>{title}</h2>
          <div className={css.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={css.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={css.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={css.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
