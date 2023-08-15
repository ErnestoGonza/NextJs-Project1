import { useRouter } from 'next/router';
import { getEventById } from '../../dummy-data';
import EventContent from '../../components/event-detail/EventContent';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import ErrorAlert from '../../components/events/error-alert';

export default function EventDetailPage() {
  const router = useRouter();
  const { eventid } = router.query;
  const event = getEventById(eventid);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={`Details for ${event.title}`}
      />
      <EventContent>{event.description}</EventContent>
    </>
  );
}
