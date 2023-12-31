import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/events/error-alert';
import Head from 'next/head';

export default function FilteredEvents({ events }) {
  const date = new Date(events[0].date);

  if (!events || events.length === 0) {
    return (
      <>
        <Head>
          <title>No Events Found</title>
          <meta name="description" content={`No events found for ${date}`} />
        </Head>
        <ErrorAlert>
          <p>No Events Found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Events by Date</title>
        <meta name="description" content={`Events from ${date}`} />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const [year, month] = params.slug;

  const res = await fetch(
    `https://nextproject-a0863-default-rtdb.firebaseio.com/events.json`
  );
  const data = await res.json();

  const restructuredData = Object.entries(data).map(([id, item]) => ({
    id: id,
    ...item,
  }));

  const filteredEvents = restructuredData.filter((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getFullYear() === +year && eventDate.getMonth() === +month - 1
    );
  });

  return { props: { events: filteredEvents } };
}
