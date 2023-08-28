import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { useRouter } from 'next/router';

export default function AllEvents({ events }) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    'https://nextproject-a0863-default-rtdb.firebaseio.com/events.json'
  );
  const data = await res.json();

  const restructuredData = Object.entries(data).map(([id, item]) => ({
    id: id,
    ...item,
  }));

  return { props: { events: restructuredData } };
}
