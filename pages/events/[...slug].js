import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/events/error-alert';

export default function FilteredEvents() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const events = getFilteredEvents({
    year: +filteredYear,
    month: +filteredMonth,
  });

  if (!events || events.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No Events Found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(+filteredYear, +filteredMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  );
}
