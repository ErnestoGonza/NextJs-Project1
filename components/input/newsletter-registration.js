import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration({ clearNewsletter }) {
  const emailInputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const data = {
      email: emailInputRef.current.value,
    };

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    emailInputRef.current.value = '';
    clearNewsletter(true);
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
