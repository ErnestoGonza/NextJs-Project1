import EventContent from '../../components/event-detail/EventContent';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import ErrorAlert from '../../components/events/error-alert';
import Head from 'next/head';

export default function EventDetailPage({ events }) {
  if (!events) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <Head>
        <title>{events.title}</title>
        <meta name="description" content={events.description} />
      </Head>
      <EventSummary title={events.title} />
      <EventLogistics
        date={events.date}
        address={events.location}
        image={events.image}
        imageAlt={`Details for ${events.title}`}
      />
      <EventContent>{events.description}</EventContent>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const res = await fetch(
    `https://nextproject-a0863-default-rtdb.firebaseio.com/events/${params.eventid}.json`
  );
  const data = await res.json();

  return { props: { events: data } };
}
