import EventList from '../components/events/EventList';
import Head from 'next/head';
import NewsletterRegistration from '../components/input/newsletter-registration';

export default function HomePage({ events }) {
  return (
    <div>
      <Head>
        <title>Networking Events</title>
        <meta name='description' content='Find events to network with like minded individuals.'/>
      </Head>
      <NewsletterRegistration />
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
