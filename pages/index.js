import EventList from '../components/events/EventList';

export default function HomePage({ events }) {
  return (
    <div>
      <EventList items={events} />
    </div>
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

  const filteredData = restructuredData.filter((event) => event.isFeatured);

  return { props: { events: filteredData } };
}
