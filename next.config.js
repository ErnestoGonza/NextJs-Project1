const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'egonzalez442',
        mongodb_password: 'QFBYPZivRrviFQTI',
        mongodb_clustername: 'cluster0',
        mongodb_events: 'events-dev',
        mongodb_newsletter: 'newsletter-dev',
      },
    };
  }

  return {
    env: {
      mongodb_username: 'egonzalez442',
      mongodb_password: 'QFBYPZivRrviFQTI',
      mongodb_clustername: 'cluster0',
      mongodb_events: 'events',
      mongodb_newsletter: 'newsletter',
    },
  };
};
