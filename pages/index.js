import EventList from '../components/events/EventList';
import Head from 'next/head';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { useState } from 'react';

export default function HomePage({ events }) {
  const [clearNewsletter, setClearNewsletter] = useState(false);

  return (
    <div>
      <Head>
        <title>Networking Events</title>
        <meta
          name="description"
          content="Find events to network with like minded individuals."
        />
      </Head>
      {!clearNewsletter ? (
        <NewsletterRegistration clearNewsletter={setClearNewsletter} />
      ) : (
        <h2 style={{ display: 'flex', justifyContent: 'center' }}>
          You've signed up!
        </h2>
      )}
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
